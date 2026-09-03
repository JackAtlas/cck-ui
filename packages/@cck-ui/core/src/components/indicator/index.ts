import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './indicator.module.css'
import { varsResolver } from './indicator.utils'
import Indicator from './indicator.vue'

const IndicatorWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Indicator, classes), varsResolver))
)

export const CIndicator: SFCWithInstallAndClasses<typeof Indicator, typeof classes> =
  withInstall(IndicatorWithStatic)

export default CIndicator

export * from './indicator.types'
