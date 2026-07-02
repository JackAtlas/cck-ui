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

async function release() {
  const status = await git.status()

  if (status.files.length !== 0) {
    logger.error('Working tree is not clean')
    process.exit(1)
  }

  logger.log('Releasing all packages')

  const increasedVersion = getNextVersion(packageJson.version, {
    type: argv._[0],
    stage: argv.stage,
  })

  logger.log(`New version: ${chalk.cyan(increasedVersion)}`)
  await setPackagesVersion(increasedVersion)

  await buildAllPackages()
  logger.success('All packages have been built successfully')

  logger.log('Publishing packages to npm')

  if (argv.stage && argv.tag === 'latest') {
    argv.tag = 'next'
  }

  const cckPackages = await getCckPackagesList()

  await Promise.all(
    cckPackages.map((p) =>
      publishPackage({ packagePath: p!.path, name: p!.packageJson.name!, tag: argv.tag })
    )
  )

  logger.success('All packages have been published successfully')

  await $`pnpm install`
  await git.add([getPath('packages'), getPath('package.json'), getPath('pnpm-lock.yaml')])
  await git.commit(`[release] Version: ${increasedVersion}`)
  await git.addTag(`v${increasedVersion}`)
  await git.push()

  openGithubRelease(increasedVersion)
}

release()
