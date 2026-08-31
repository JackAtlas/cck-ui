import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './background-image.module.css'
import { varsResolver } from './background-image.utils'
import BackgroundImage from './background-image.vue'

const BackgroundImageWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(BackgroundImage, classes), varsResolver))
)

export const CBackgroundImage: SFCWithInstallAndClasses<typeof BackgroundImage, typeof classes> =
  withInstall(BackgroundImageWithStatic)

export default CBackgroundImage

export * from './background-image.types'
