import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './color-swatch.module.css'
import { varsResolver } from './color-swatch.utils'
import ColorSwatch from './color-swatch.vue'

const ColorSwatchWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ColorSwatch, classes), varsResolver))
)

export const CColorSwatch: SFCWithInstallAndClasses<typeof ColorSwatch, typeof classes> =
  withInstall(ColorSwatchWithStatic)

export default CColorSwatch

export * from './color-swatch.types'
