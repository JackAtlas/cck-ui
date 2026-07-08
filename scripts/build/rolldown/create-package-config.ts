import fs from 'node:fs'
import path from 'node:path'
import type { RolldownOptions } from 'rolldown'
import vue from 'unplugin-vue/rolldown'
import banner from 'rollup-plugin-banner2'
import { cssModulesPlugin } from './css-modules-plugin'
import { getPackagesList } from '../../packages/get-packages-list'
import { ROLLDOWN_EXCLUDE_USE_CLIENT } from './rolldown-exclude-use-client'
import { getPath } from '../../utils/get-path'
import { ROLLDOWN_EXTERNALS } from './rolldown-externals'

export function createPackageConfig(packagePath: string): RolldownOptions {
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(packagePath, 'package.json'), 'utf-8'))
  const pkgDeps = [
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.peerDependencies || {}),
  ]
  const packagesList = getPackagesList()

  const aliasEntries: Record<string, string> = {}
  for (const pkg of packagesList) {
    aliasEntries[pkg.packageJson.name!] = path.resolve(pkg.path, 'src')
  }

  const plugins = [
    vue(),
    cssModulesPlugin(),
    banner((chunk: any) => {
      if (!ROLLDOWN_EXCLUDE_USE_CLIENT.includes(chunk.fileName)) {
        return "'use client';\n"
      }

      return undefined
    }),
  ]

  return {
    checks: {
      pluginTimings: false,
    },
    onLog(level, log, defaultHandler) {
      if (level === 'warn') {
        if (log.code === 'CIRCULAR_DEPENDENCY') {
          return
        }
        defaultHandler('warn', log)
      }
    },
    input: path.resolve(packagePath, 'src/index.ts'),
    resolve: {
      alias: aliasEntries,
    },
    tsconfig: getPath('tsconfig.json'),
    output: [
      {
        format: 'es',
        entryFileNames: '[name].mjs',
        dir: path.resolve(packagePath, 'esm'),
        preserveModules: true,
        sourcemap: true,
      },
      {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        dir: path.resolve(packagePath, 'cjs'),
        preserveModules: true,
        sourcemap: true,
      },
    ],
    moduleTypes: {
      '.module.css': 'js',
      '.css': 'js',
    },
    external: [...ROLLDOWN_EXTERNALS, ...pkgDeps],
    plugins,
  }
}
