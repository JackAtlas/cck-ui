import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './kbd.module.css'
import { varsResolver } from './kbd.utils'
import Kbd from './kbd.vue'

const KbdWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Kbd, classes), varsResolver))
)

export const CKbd: SFCWithInstallAndClasses<typeof Kbd, typeof classes> = withInstall(KbdWithStatic)

export default CKbd

export * from './kbd.types'
