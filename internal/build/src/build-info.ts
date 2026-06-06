import { PKG_NAME } from '@cck-ui/build-constants'
import { cuOutput } from '@cck-ui/build-utils'
import path from 'node:path'
import type { ModuleFormat } from 'rolldown'

export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    name: string
    path: string
  }
  bundle: {
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(cuOutput, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(cuOutput, 'lib')
    },
    bundle: {
      path: `${PKG_NAME}/lib`
    }
  }
}
export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries

export type BuildConfig = typeof buildConfig
export type BuildConfigEntries = [Module, BuildInfo][]

export const target = 'es2024'
