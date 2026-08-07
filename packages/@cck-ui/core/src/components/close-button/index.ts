import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import CloseButton from './close-button.vue'
import classes from './close-button.module.css'
import { varsResolver } from './close-button.utils'

const CloseButtonWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(CloseButton, classes), varsResolver))
)

export const CCloseButton: SFCWithInstallAndClasses<typeof CloseButton, typeof classes> =
  withInstall(CloseButtonWithStatic)

export default CCloseButton

export * from './close-button.types'
