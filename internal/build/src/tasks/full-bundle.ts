import path from 'node:path'
import { PKG_BRAND_NAME } from '@cck-ui/build-constants'
import { cuPackage, getPackageManifest } from '@cck-ui/build-utils'

import {} from 'rolldown'
import { execCommand } from '../../../build-utils/src'

const { version } = getPackageManifest(cuPackage)
const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry() {}

async function buildFullLocale() {}

export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(), buildFullLocale()])

export const buildFullBundle = () => {
  return Promise.all([
    execCommand(buildFull(true), 'buildFullMinified'),
    execCommand(buildFull(false), 'buildFull')
  ])
}
