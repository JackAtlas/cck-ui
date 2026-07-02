import path from 'node:path'
import chalk from 'chalk'
import fs from 'fs-extra'
import simpleGit from 'simple-git'
import { PackageJson } from 'type-fest'
import { getNextVersion } from 'version-next'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { buildPackage } from '../build/build-package'
import { getPackageName } from '../packages/get-package-name'
import { locatePackage } from '../packages/locate-package'
import { createLogger } from '../utils/consola'
import { publishPackage } from './publish-package'

const git = simpleGit()
const logger = createLogger('publish')

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option('stage', {
    type: 'string',
    choices: ['alpha', 'beta'],
    description: 'Prerelease stage: "alpha", "beta"',
  })
  .option('tag', {
    type: 'string',
    default: 'latest',
    description: 'Tag',
  })

if (!['patch', 'minor', 'major'].includes(argv._[0])) {
  logger.error('Stage is missing, must be patch, minor or major')
  process.exit(1)
}

if (!argv._[1]) {
  logger.error('Package name is missing')
  process.exit(1)
}

async function publish() {
  const status = await git.status()

  if (status.files.length !== 0) {
    logger.error('Working tree is not clean')
    process.exit(1)
  }

  const packageName = getPackageName(argv._[1])
  const packagePath = await locatePackage(packageName)

  if (packageName.includes('@cck-ui/')) {
    logger.error('Cannot publish @cck-ui/* packages seperately')
    process.exit(1)
  }

  if (!packagePath) {
    logger.error(`Package ${chalk.cyan(packageName)} does not exist`)
    process.exit(1)
  }

  const packageJson: PackageJson = fs.readJsonSync(path.join(packagePath, 'package.json'))

  const increasedVersion = getNextVersion(packageJson.version!, {
    type: argv._[0],
    stage: argv.stage,
  })

  logger.log(`Publish package: ${chalk.cyan(packageName)}`)
  logger.log(
    `Previous version: ${chalk.cyan(packageJson.version)}. New version: ${chalk.cyan(increasedVersion)}`
  )

  packageJson.version = increasedVersion

  await fs.writeJson(path.join(packagePath, 'package.json'), packageJson, { spaces: 2 })
  await buildPackage(packageName)
  await publishPackage({ packagePath, name: packageName, tag: argv.stage ? 'next' : 'latest' })

  await git.add([path.join(packagePath, 'package.json')])
  await git.commit(`[release] Publish ${packageName}@${increasedVersion}`)
  await git.push()
}

publish()
