import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './marquee.module.css'
import { varsResolver } from './marquee.utils'
import Marquee from './marquee.vue'

const MarqueeWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Marquee, classes), varsResolver))
)

export const CMarquee: SFCWithInstallAndClasses<typeof Marquee, typeof classes> =
  withInstall(MarqueeWithStatic)

export default CMarquee

export * from './marquee.types'
