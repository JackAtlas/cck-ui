import { FlipOptions, InlineOptions, ShiftOptions, SizeOptions } from '@floating-ui/vue'
import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'
import {
  ArrowPosition,
  FloatingAxisOffsets,
  FloatingPosition,
  FloatingStrategy,
} from '../../utils/Floating'
import { PortalProps } from '../portal'
import { TransitionOverride } from '../transition'
import { Ref } from 'vue'

export type TooltipStylesNames = 'tooltip' | 'arrow'
export type TooltipCssVariables = {
  tooltip: '--tooltip-radius' | '--tooltip-bg' | '--tooltip-color'
}

export interface TooltipMiddlewares {
  shift?: boolean | ShiftOptions
  flip?: boolean | FlipOptions
  inline?: boolean | InlineOptions
  size?: boolean | SizeOptions
}

export interface TooltipBaseProps
  extends BoxProps, StylesApiProps<TooltipFactory>, ElementProps<'div'> {
  /** Tooltip position relative to target element (`Tooltip` component) or mouse (`TooltipFloating` component) */
  position?: FloatingPosition

  /** Tooltip position relative to target element (`Tooltip` component) or mouse (`TooltipFloating` component) */
  refProp?: string

  /**
   * Determines whether tooltip should be rendered within `Portal`
   * @default true
   */
  withinPortal?: boolean

  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * Key of `theme.colors` or any valid CSS color, controls tooltip background, by default set based on current color scheme
   */
  color?: CColor

  /**
   * Determines whether content should be wrapped on to the next line
   * @default false
   */
  multiline?: boolean

  /**
   * Tooltip z-index
   * @default 300
   */
  zIndex?: string | number

  /** If set, tooltip element will not be rendered */
  disabled?: boolean

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, 'withinPortal'>

  /**
   * Floating ui middlewares to configure position handling
   * @default {flip:true,shift:true,inline:false}
   */
  middlewares?: TooltipMiddlewares
}

export interface TooltipProps extends TooltipBaseProps {
  /** Called when tooltip position changes */
  onPositionChange?: (position: FloatingPosition) => void

  /** Open delay in ms */
  openDelay?: number

  /**
   * Close delay in ms
   * @default 0
   */
  closeDelay?: number

  /** Controlled open state */
  opened?: boolean

  /** Uncontrolled tooltip initial opened state */
  defaultOpened?: boolean

  /**
   * Space between target element and tooltip in px
   * @default 5
   */
  offset?: number | FloatingAxisOffsets

  /**
   * If set, the tooltip has an arrow
   * @default false
   */
  withArrow?: boolean

  /**
   * Arrow size in px
   * @default 4
   */
  arrowSize?: number

  /**
   * Arrow offset in px
   * @default 5
   */
  arrowOffset?: number

  /**
   * Arrow `border-radius` in px
   * @default 0
   */
  arrowRadius?: number

  /**
   * Arrow position relative to the tooltip
   * @default side
   */
  arrowPosition?: ArrowPosition

  /**
   * Props passed down to the `Transition` component that used to animate tooltip presence, use to configure duration and animation type
   * @default {duration:100,transition:'fade'}
   */
  transitionProps?: TransitionOverride

  /**
   * Determines which events will be used to show tooltip
   * @default {hover:true,focus:false,touch:false}
   */
  events?: { hover: boolean; focus: boolean; touch: boolean }

  /**
   * If set, the tooltip stays open while the pointer moves from the target to the tooltip and remains over it. Required by [WCAG 1.4.13](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html) if the tooltip contains interactive content. Note that an interactive tooltip intercepts pointer events of the content it overlaps
   */
  interactive?: boolean

  /** Must be set if the tooltip target is an inline element */
  inline?: boolean

  /** If set, the tooltip is not unmounted from the DOM when hidden, `display: none` styles are applied instead */
  keepMounted?: boolean

  /**
   * Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy)
   * @default 'absolute'
   */
  floatingStrategy?: FloatingStrategy

  /** If set, adjusts text color based on background color for `filled` variant */
  autoContrast?: boolean

  /** Selector, ref of an element or element itself that should be used for positioning */
  target?: Ref<HTMLElement | null> | HTMLElement | null | string
}

export type TooltipFactory = Factory<{
  props: TooltipProps
  ref: HTMLDivElement
  stylesNames: TooltipStylesNames
  vars: TooltipCssVariables
  staticComponents: {}
}>
