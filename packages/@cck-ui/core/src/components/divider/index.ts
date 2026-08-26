import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './divider.module.css'
import { varsResolver } from './divider.utils'
import Divider from './divider.vue'

const DividerWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Divider, classes), varsResolver))
)

export const CDivider: SFCWithInstallAndClasses<typeof Divider, typeof classes> =
  withInstall(DividerWithStatic)

export default CDivider

export * from './divider.types'
