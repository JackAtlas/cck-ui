import {
  buildOutput,
  cuPackage,
  cuRoot,
  excludeFiles,
  getPackageDependencies,
  pkgRoot,
  projRoot
} from '@cck-ui/build-utils'
import path from 'node:path'
import { type BuildOptions, build } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'
import { glob } from 'tinyglobby'
import { target } from '../build-info'

const tsconfig = path.resolve(projRoot, 'tsconfig.web.json')
const cuDeps = getPackageDependencies(cuPackage)
const pkgExternal = Object.values(cuDeps).flat()
const external = [/^@floating-ui/, /^@vue/, /^vue/, /^csstype/, ...pkgExternal]

export async function generateTypesDefinitions() {
  const input = excludeFiles(
    await glob(['**/*.{ts,tsx,vue}', '!**/style/*.ts'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const options: BuildOptions = {
    input,
    external,
    tsconfig,
    transform: { target },
    plugins: dts({
      parallel: true,
      tsconfig,
      eager: true,
      vue: true,
      emitDtsOnly: true,
      compilerOptions: {
        emitDeclarationOnly: true,
        declaration: true
      }
    }),
    output: {
      preserveModules: true,
      preserveModulesRoot: cuRoot,
      dir: path.resolve(buildOutput, 'types')
    }
  }

  return build(options)
}
