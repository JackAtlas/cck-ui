import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './rolling-number.module.css'
import { varsResolver } from './rolling-number.utils'
import RollingNumber from './rolling-number.vue'

const RollingNumberWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(RollingNumber, classes), varsResolver))
)

export const CRollingNumber: SFCWithInstallAndClasses<typeof RollingNumber, typeof classes> =
  withInstall(RollingNumberWithStatic)

export default CRollingNumber

export * from './rolling-number.types'
