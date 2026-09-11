import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './theme-icon.module.css'
import { varsResolver } from './theme-icon.utils'
import ThemeIcon from './theme-icon.vue'

const ThemeIconWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ThemeIcon, classes), varsResolver))
)

export const CThemeIcon: SFCWithInstallAndClasses<typeof ThemeIcon, typeof classes> =
  withInstall(ThemeIconWithStatic)

export default CThemeIcon

export * from './theme-icon.types'
