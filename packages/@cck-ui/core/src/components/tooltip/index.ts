import Tooltip from './tooltip.vue'
import classes from './tooltip.module.css'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import { varsResolver } from './tooltip.utils'
import TooltipFloating from './tooltip-floating/tooltip-floating.vue'
import TooltipGroup from './tooltip-group/tooltip-group.vue'

const TooltipGroupWithStatic = withPropsFactory(withExtend(withClasses(TooltipGroup, classes)))
const TooltipFloatingWithStatic = withPropsFactory(
  withExtend(withClasses(TooltipFloating, classes))
)
const TooltipWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Tooltip, classes), varsResolver))
)

export const CTooltipGroup: SFCWithInstallAndClasses<typeof TooltipGroup, typeof classes> =
  withInstall(TooltipGroupWithStatic)
export const CTooltipFloating: SFCWithInstallAndClasses<typeof TooltipFloating, typeof classes> =
  withInstall(TooltipFloatingWithStatic)
export const CTooltip: SFCWithInstallAndClasses<typeof Tooltip, typeof classes> & {
  Floating: typeof CTooltipFloating
  Group: typeof CTooltipGroup
} = withInstall(TooltipWithStatic, { Floating: CTooltipFloating, Group: CTooltipGroup })

export default CTooltip

export * from './tooltip.types'
