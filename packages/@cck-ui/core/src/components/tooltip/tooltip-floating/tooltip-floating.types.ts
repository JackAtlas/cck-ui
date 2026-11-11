import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../../core'
import { FloatingPosition } from '../../../utils/Floating'
import { PortalProps } from '../../portal'
import { TooltipCssVariables, TooltipStylesNames } from '../tooltip.types'

export interface TooltipFloatingProps
  extends BoxProps, StylesApiProps<TooltipFloatingFactory>, /* vue-ignore */ ElementProps<'div'> {
  position?: FloatingPosition
  withinPortal?: boolean
  radius?: CRadius
  color?: CColor
  multiline?: boolean
  zIndex?: string | number
  disabled?: boolean
  portalProps?: Omit<PortalProps, 'withinPortal'>
  offset?: number
  defaultOpened?: boolean
}

export type TooltipFloatingFactory = Factory<{
  props: TooltipFloatingProps
  ref: HTMLDivElement
  stylesNames: TooltipStylesNames
  vars: TooltipCssVariables
}>
