import chalk from 'chalk'
import { $ } from 'zx'
import { createLogger } from '../utils/consola'

const logger = createLogger('publish-package')

interface PublishPackage {
  packagePath: string
  name: string
  tag: string
  provenance?: boolean
}

export async function publishPackage({
  packagePath,
  name,
  tag,
  provenance = false,
}: PublishPackage) {
  try {
    const cmd = provenance
      ? `npm publish --access public --tag ${tag} --provenance`
      : `npm publish --access public --tag ${tag}`
    await $({ cwd: packagePath })`${cmd}`
    logger.success(`Package ${chalk.cyan(name)} has been published`)
  } catch (error: any) {
    logger.error(`Failed to publish package ${chalk.red(name)}`)
    process.stdout.write(chalk.red`${error.message}\n`)
    process.exit(1)
  }
}
