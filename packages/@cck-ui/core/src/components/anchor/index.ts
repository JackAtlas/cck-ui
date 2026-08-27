import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'

import classes from './anchor.module.css'
import Anchor from './anchor.vue'

const AnchorWithStatic = withPropsFactory(withExtend(withClasses(Anchor, classes)))

export const CAnchor: SFCWithInstallAndClasses<typeof Anchor, typeof classes> =
  withInstall(AnchorWithStatic)

export default CAnchor

export * from './anchor.types'
