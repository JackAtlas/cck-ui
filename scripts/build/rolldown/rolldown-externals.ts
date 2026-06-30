import { builtinModules } from 'node:module'
import packageJson from '../../../package.json'
import { getPackagesList } from '../../packages/get-packages-list'

export const ROLLDOWN_EXTERNALS = [
  ...builtinModules,
  ...builtinModules.map((m) => `node: ${m}`),
  'es-toolkit',
  'es-toolkit/*',
  ...getPackagesList().map((pkg) => pkg.packageJson.name!),
  ...Object.keys({
    ...packageJson.devDependencies,
    ...packageJson.dependencies,
  }),
]
