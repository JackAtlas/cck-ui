import path from 'node:path'
import { copyFile, cp, mkdir, rm } from 'node:fs/promises'
import {
  buildOutput,
  cuOutput,
  cuPackage,
  execCommand,
  projRoot
} from '@cck-ui/build-utils'
import {
  type Module,
  buildConfig,
  buildFullBundle,
  buildHelper,
  buildModules,
  generateTypesDefinitions,
  run
} from './src'

const copyFiles = () => {
  Promise.all([
    copyFile(cuPackage, path.join(cuOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(cuOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'typings', 'global.d.ts'),
      path.resolve(cuOutput, 'global.d.ts')
    ),
    copyFile(
      path.resolve(projRoot, 'LICENSE'),
      path.resolve(cuOutput, 'LICENSE')
    )
  ])
}

const copyTypesDefinitions = () => {
  const src = path.resolve(buildOutput, 'types')
  const copyTypes = (module: Module) => {
    return execCommand(
      () => cp(src, buildConfig[module].output.path, { recursive: true }),
      `copyTypes:${module}`
    )
  }

  return Promise.all([copyTypes('esm'), copyTypes('cjs')])
}

const copyFullStyle = async () => {
  await mkdir(path.resolve(cuOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(cuOutput, 'theme-slate/index.css'),
    path.resolve(cuOutput, 'dist/index.css')
  )
}

const buildStyle = async () => {
  await run('pnpm run -C packages/theme-slate build')
  await copyFullStyle()
}

const makeOutput = async () => {
  await execCommand(() => run('pnpm run clean'), 'clean output')
  await execCommand(() => mkdir(cuOutput, { recursive: true }), 'create output')
}

const cleanupTypesDefinitions = () => {
  return rm(path.resolve(buildOutput, 'types'), { recursive: true })
}

async function build() {
  await makeOutput()
  buildHelper()
  await Promise.all([
    execCommand(generateTypesDefinitions),
    execCommand(buildModules),
    execCommand(buildFullBundle),
    execCommand(buildStyle),
    execCommand(copyFiles)
  ])
  await execCommand(copyTypesDefinitions)
  await execCommand(cleanupTypesDefinitions)
}

function main() {
  return execCommand(build)
}

main()
