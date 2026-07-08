import chalk from 'chalk'
import simpleGit from 'simple-git'
import { getNextVersion } from 'version-next'
import yargs from 'yargs'
import { $ } from 'zx'
import packageJson from '../../package.json'
import { hideBin } from 'yargs/helpers'
import { buildAllPackages } from '../build/build-all-packages'
import { getCckPackagesList } from '../packages/get-packages-list'
import { publishPackage } from '../publish/publish-package'
import { getPath } from '../utils/get-path'
import { createLogger } from '../utils/consola'
import { openGithubRelease } from './open-github-release'
import { setPackagesVersion } from './set-packages-version'

const logger = createLogger('release')
const git = simpleGit()

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option('stage', {
    type: 'string',
    choices: ['alpha', 'beta'],
    description: "Prerelease stage: 'alpha', 'beta'",
  })
  .option('tag', {
    type: 'string',
    default: 'latest',
    description: 'Tag',
  })
  .option('ci', {
    type: 'boolean',
    default: false,
    description: 'Run in CI mode (no git operations, no version bump)',
  })
  .option('no-publish', {
    type: 'boolean',
    default: false,
    description: 'Skip publishing to npm (useful for local testing)',
  })
  .option('publish', {
    type: 'boolean',
    default: true,
    description: 'Publish to npm (use --no-publish to skip)',
  })

async function release() {
  const status = await git.status()

  if (status.files.length !== 0) {
    logger.error('Working tree is not clean')
    process.exit(1)
  }

  logger.log('Releasing all packages')

  let increasedVersion: string

  if (argv.ci) {
    increasedVersion = packageJson.version
    logger.log(`CI mode: using current version ${chalk.cyan(increasedVersion)}`)
  } else {
    if (!['patch', 'minor', 'major'].includes(argv._[0])) {
      logger.error('Version type (patch/minor/major) is required when not in CI mode')
      process.exit(1)
    }

    increasedVersion = getNextVersion(packageJson.version, {
      type: argv._[0],
      stage: argv.stage,
    })

    logger.log(`New version: ${chalk.cyan(increasedVersion)}`)
    await setPackagesVersion(increasedVersion)
  }

  await buildAllPackages()
  logger.success('All packages have been built successfully')

  logger.log('Publishing packages to npm')

  if (argv.stage && argv.tag === 'latest') {
    argv.tag = 'next'
  }

  const shouldPublish = argv.publish

  if (shouldPublish) {
    const cckPackages = await getCckPackagesList()

    await Promise.all(
      cckPackages.map((p) =>
        publishPackage({
          packagePath: p!.path,
          name: p!.packageJson.name!,
          tag: argv.tag,
          provenance: argv.ci,
        })
      )
    )

    logger.success('All packages have been published successfully')
  } else {
    logger.log('Skipping npm publish (--no-publish)')
  }

  if (!argv.ci) {
    await $`pnpm install`
    await git.add([getPath('packages'), getPath('package.json'), getPath('pnpm-lock.yaml')])
    await git.commit(`[release] Version: ${increasedVersion}`)
    await git.addTag(`v${increasedVersion}`)
    await git.push()

    openGithubRelease(increasedVersion)
  } else {
    logger.log('CI mode: skipping git commit/tag and release page.')
  }
}

release()
