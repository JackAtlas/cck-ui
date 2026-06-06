import path from 'node:path'
import { PKG_BRAND_NAME, PKG_CAMELCASE_NAME } from '@cck-ui/build-constants'
import {
  cuOutput,
  cuPackage,
  cuRoot,
  execCommand,
  getPackageManifest
} from '@cck-ui/build-utils'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Plugin, rolldown } from 'rolldown'
import { replacePlugin } from 'rolldown/plugins'
import { SupplyValidator } from '../plugins/supply-validator'
import { formatBundleFilename, generateExternal, writeBundles } from '../utils'

const { version } = getPackageManifest(cuPackage)
const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    vue() as Plugin,
    vueJsx() as Plugin,
    replacePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    SupplyValidator()
  ]

  const bundle = await rolldown({
    input: path.resolve(cuRoot, 'index.ts'),
    plugins,
    external: generateExternal({ full: true }),
    treeshake: true
  })

  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        cuOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue'
      },
      sourcemap: minify,
      banner,
      minify,
      comments: {
        jsdoc: false
      }
    },
    {
      format: 'esm',
      file: path.resolve(
        cuOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner,
      minify,
      comments: {
        jsdoc: false
      }
    }
  ])
}

async function buildFullLocale() {}

export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(minify), buildFullLocale()])

export const buildFullBundle = () => {
  return Promise.all([
    execCommand(buildFull(true), 'buildFullMinified'),
    execCommand(buildFull(false), 'buildFull')
  ])
}
