import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Alert from './alert.vue'
import classes from './alert.module.css'
import { varsResolver } from './alert.utils'

const AlertWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Alert, classes), varsResolver))
)

export const CAlert: SFCWithInstallAndClasses<typeof Alert, typeof classes> =
  withInstall(AlertWithStatic)

export default CAlert

export * from './alert.types'
