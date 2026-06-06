import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { OutputOptions, rolldown } from 'rolldown'
import { CckUiAlias } from '../plugins/cck-ui-alias'
import { SupplyValidator } from '../plugins/supply-validator'
import { cuRoot, excludeFiles, execCommand, pkgRoot } from '@cck-ui/build-utils'
import { glob } from 'tinyglobby'
import { generateExternal, writeBundles } from '../utils'
import { buildConfigEntries } from '../build-info'

const plugins = [CckUiAlias(), vue(), vueJsx(), SupplyValidator()]

async function buildModulesComponents() {
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rolldown({
    input,
    plugins,
    external: generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false }
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: cuRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

async function buildModulesStyles() {
  const input = excludeFiles(
    await glob('**/style/(index|css).{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rolldown({
    input,
    plugins,
    treeshake: true
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: path.resolve(config.output.path, 'components'),
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: cuRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

export const buildModules = () => {
  Promise.all([
    execCommand(buildModulesComponents),
    execCommand(buildModulesStyles)
  ])
}
