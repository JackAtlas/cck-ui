import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './scroll-area.module.css'
import { varsResolver } from './scroll-area.utils'
import ScrollArea from './scroll-area.vue'

const ScrollAreaWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ScrollArea, classes), varsResolver))
)

export const CScrollArea: SFCWithInstallAndClasses<typeof ScrollArea, typeof classes> =
  withInstall(ScrollAreaWithStatic)

export default CScrollArea

export * from './scroll-area.types'
