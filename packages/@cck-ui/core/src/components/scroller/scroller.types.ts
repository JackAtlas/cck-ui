import { ComponentProps } from 'vue-component-type-helpers'
import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type ScrollerStylesNames = 'root' | 'container' | 'content' | 'control' | 'chevron'
export type ScrollerCssVariables = {
  root: '--scroller-control-size' | '--scroller-background-color'
}

export interface ScrollerProps
  extends BoxProps, StylesApiProps<ScrollerFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Amount of pixels to scroll when clicking the control buttons
   * @default 200
   */
  scrollAmount?: number

  /**
   * Size of the control buttons
   * @default 50px
   */
  controlSize?: string | number

  /**
   * Size of the chevron icon, number will be converted to rem
   * @default 16
   */
  chevronSize?: string | number

  /**
   * Background color for the gradient fade on controls
   * @default var(--c-color-body)
   */
  edgeGradientColor?: string

  /** Props passed to the start control button */
  startControlProps?: ComponentProps<'button'>

  /** Props passed to the end control button */
  endControlProps?: ComponentProps<'button'>

  /**
   * Determines whether start control should always be visible regardless of scroll position
   * @default false
   */
  showStartControl?: boolean

  /**
   * Determines whether end control should always be visible regardless of scroll position
   * @default false
   */
  showEndControl?: boolean

  /**
   * Determines whether content can be scrolled by dragging with mouse
   * @default true
   */
  draggable?: boolean
}

export type ScrollerFactory = Factory<{
  props: ScrollerProps
  ref: HTMLDivElement
  stylesNames: ScrollerStylesNames
  vars: ScrollerCssVariables
}>
