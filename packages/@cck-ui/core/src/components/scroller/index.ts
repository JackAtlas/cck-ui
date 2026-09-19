import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './scroller.module.css'
import { varsResolver } from './scroller.utils'
import Scroller from './scroller.vue'

const ScrollerWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Scroller, classes), varsResolver))
)

export const CScroller: SFCWithInstallAndClasses<typeof Scroller, typeof classes> =
  withInstall(ScrollerWithStatic)

export default CScroller

export * from './scroller.types'
