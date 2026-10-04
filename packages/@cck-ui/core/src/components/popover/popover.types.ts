import { FlipOptions, InlineOptions, ShiftOptions, SizeOptions } from '@floating-ui/vue'
import { CSSProperties } from 'vue'
import {
  ArrowPosition,
  FloatingAxisOffsets,
  FloatingPosition,
  FloatingStrategy,
} from '../../utils/Floating'
import { CRadius, CShadow, ElementProps, Factory, StylesApiProps } from '../../core'
import { TransitionOverride } from '../transition'
import { OverlayProps } from '../overlay'
import { PortalProps } from '../portal'

export type PopoverWidth = 'target' | CSSProperties['width'] | null

export interface PopoverMiddlewares {
  shift?: boolean | ShiftOptions
  flip?: boolean | FlipOptions
  inline?: boolean | InlineOptions
  size?: boolean | SizeOptions
}

export type PopoverStylesNames = 'dropdown' | 'arrow' | 'overlay'
export type PopoverCssVariables = {
  dropdown: '--popover-radius' | '--popover-shadow'
}

export interface __PopverProps {
  position?: FloatingPosition

  /**
   * Offset of the dropdown element
   * @default 8
   */
  offset?: number | FloatingAxisOffsets

  /**
   * If set, the dropdown is not unmounted from the DOM when hidden. `display: none` styles are added instead
   */
  keepMounted?: boolean

  keepMountedMode?: 'activity' | 'display-none'

  /**
   * Props passed down to the `Transition` component. Use to configure duration and animation type.
   * @default
   * { duration: 150, transition: 'fade' }
   */
  transitionProps?: TransitionOverride

  /**
   * Dropdown width, or `'target'` to make dropdown width the same as target element
   * @default 'max-content'
   */
  width?: PopoverWidth

  /**
   * Floating ui middlewares to configure position handling
   * @default
   * { flip: true, shift: true, inline: false }
   */
  middlewares?: PopoverMiddlewares

  /**
   * Determines whether component should have an arrow
   * @default false
   */
  withArrow?: boolean

  /**
   * Determines whether the overlay should be displayed when the dropdown is opened
   * @default false
   */
  withOverlay?: boolean

  /** Props passed down to `Overlay` component */
  overlayProps?: OverlayProps & ElementProps<'div'>

  /**
   * Arrow size in px
   * @default 7
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

  /** Arrow position */
  arrowPosition?: ArrowPosition

  /**
   * Determines whether dropdown should be rendered within the `Portal`
   * @default true
   */
  withinPortal?: boolean

  /** Props to pass down to the `Portal` when `withinPortal` is true */
  portalProps?: PortalProps

  /**
   * Dropdown `z-index`
   * @default 300
   */
  zIndex?: string | number

  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /** Key of `theme.shadows` or any other valid CSS `box-shadow` value */
  shadow?: CShadow

  /** If set, popover dropdown will not be rendered */
  disabled?: boolean

  /**
   * Determines whether focus should be automatically returned to control when dropdown closes
   * @default false
   */
  returnFocus?: boolean

  /**
   * Changes floating ui position strategy
   * @default 'absolute'
   */
  floatingStrategy?: FloatingStrategy

  /**
   * If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen
   * @default true
   */
  hideDetached?: boolean

  /**
   * If `true`, the dropdown picks its side on open (flip runs once, preferring the `position` prop) and then never changes side - scrolling, resizing, and content size changes will not flip the dropdown. The side is recalculated fresh on the next open. Does not affect the `shift` middleware. Set to `false` to keep flip active and allow the dropdown to re-flip on every change.
   * @default true
   */
  preventPositionChangeWhenVisible?: boolean
}

export interface PopoverProps extends __PopverProps, StylesApiProps<PopoverFactory> {
  __staticSelector?: string

  /** Initial opened state for uncontrolled component */
  defaultOpened?: boolean

  /** Controlled dropdown opened state */
  opened?: boolean

  /**
   * Determines whether dropdown should be closed on outside clicks
   * @default true
   */
  closeOnClickOutside?: boolean

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[]

  /**
   * Determines whether focus should be trapped within dropdown
   * @default false
   */
  trapFocus?: boolean

  /**
   * Determines whether dropdown should be closed when `Escape` key is pressed
   * @default true
   */
  closeOnEscape?: boolean

  /** Id base to create accessibility connections */
  id?: string

  /**
   * Determines whether dropdown and target elements should have accessible roles
   * @default true
   */
  withRoles?: boolean
}

export type PopoverFactory = Factory<{
  props: PopoverProps
  stylesNames: PopoverStylesNames
  vars: PopoverCssVariables
}>
