import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './overlay.module.css'
import Overlay from './overlay.vue'
import { varsResolver } from './overlay.utils'

const OverlayWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Overlay, classes), varsResolver))
)

export const COverlay: SFCWithInstallAndClasses<typeof Overlay, typeof classes> =
  withInstall(OverlayWithStatic)

export default COverlay

export * from './overlay.types'
