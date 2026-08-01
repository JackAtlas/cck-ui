import AspectRatio from './aspect-ratio.vue'
import classes from './aspect-ratio.module.css'
import { varsResolver } from './aspect-ratio.utils'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

const AspectRatioWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(AspectRatio, classes), varsResolver))
)

export const CAspectRatio: SFCWithInstallAndClasses<typeof AspectRatio, typeof classes> =
  withInstall(AspectRatioWithStatic)

export default CAspectRatio

export * from './aspect-ratio.types'
