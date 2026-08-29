import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Affix from './affix.vue'
import { varsResolver } from './affix.utils'
import classes from './affix.module.css'

const AffixWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Affix, classes), varsResolver))
)

export const CAffix: SFCWithInstallAndClasses<typeof Affix, typeof classes> =
  withInstall(AffixWithStatic)

export default CAffix

export * from './affix.types'
