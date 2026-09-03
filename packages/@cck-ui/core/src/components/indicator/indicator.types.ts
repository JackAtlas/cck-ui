import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'

type Position = 'top' | 'middle' | 'bottom'
type Placement = 'start' | 'center' | 'end'

export type IndicatorPosition = `${Position}-${Placement}`

export type IndicatorPositionVariables =
  | '--indicator-top'
  | '--indicator-bottom'
  | '--indicator-left'
  | '--indicator-right'
  | '--indicator-translate-x'
  | '--indicator-translate-y'

export type IndicatorStylesNames = 'root' | 'indicator'
export type IndicatorCssVariables = {
  root:
    | '--indicator-color'
    | '--indicator-text-color'
    | '--indicator-size'
    | '--indicator-radius'
    | '--indicator-z-index'
    | IndicatorPositionVariables
}

export interface IndicatorProps
  extends BoxProps, StylesApiProps<IndicatorFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Indicator position relative to the target element
   * @default 'top-end'
   */
  position?: IndicatorPosition

  /**
   * Distance in pixels to offset the indicator from its default position, useful for elements with border-radius.
   * Can be a number for uniform offset or an object with `x` and `y` properties for separate horizontal and vertical offsets
   * @default 0
   */
  offset?: number | { x: number; y: number }

  /**
   * Changes container display from block to inline-block, use when wrapping elements with fixed width
   * @default false
   */
  inline?: boolean

  /**
   * Indicator width and height
   * @default 10
   */
  size?: number | string

  /** Label displayed inside the indicator, for example, notification count */
  label?: string | number

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default 100
   */
  radius?: CRadius

  /**
   * Key of `theme.colors` or any valid CSS color value
   * @default theme.primaryColor
   */
  color?: CColor

  /** Adds border to the root element */
  withBorder?: boolean

  /** Hides the indicator when set */
  disabled?: boolean

  /**
   * If set, the indicator has processing animation
   * @default false
   */
  processing?: boolean

  /**
   * Indicator z-index
   * @default 200
   */
  zIndex?: string

  /** If set, adjusts text color based on background color */
  autoContrast?: boolean

  /**
   * Maximum value to display.
   * If label is a number greater than this value, it will be displayed as `${maxValue}+`.
   * Only works when `label` prop is set as a valid number
   */
  maxValue?: number

  /**
   * Determines whether indicator with label `0` should be displayed
   * Only works when `label` prop is set as a valid number
   * @default true
   */
  showZero?: boolean
}

export type IndicatorFactory = Factory<{
  props: IndicatorProps
  ref: HTMLDivElement
  stylesNames: IndicatorStylesNames
  vars: IndicatorCssVariables
}>
