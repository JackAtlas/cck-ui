import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Image from './image.vue'
import classes from './image.module.css'
import { varsResolver } from './image.utils'

const ImageWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Image, classes), varsResolver))
)

export const CImage: SFCWithInstallAndClasses<typeof Image, typeof classes> =
  withInstall(ImageWithStatic)

export default CImage

export * from './image.types'
