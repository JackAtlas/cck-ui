import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-slate')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const cuRoot = resolve(pkgRoot, 'cck-ui')
export const utilRoot = resolve(pkgRoot, 'utils')
export const buildRoot = resolve(pkgRoot, 'internal', 'build')

export const buildOutput = resolve(projRoot, 'dist')
export const cuOutput = resolve(buildOutput, 'cck-ui')

export const cuPackage = resolve(cuRoot, 'package.json')

const windowsSlashRE = /\\/g

export function normalizePath(p: string): string {
  if (typeof process !== 'undefined' && process.platform === 'win32') {
    return p.replace(windowsSlashRE, '/')
  }
  return p
}
