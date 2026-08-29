import { BoxProps, CColor, CSize, ElementProps, Factory, StylesApiProps } from '../../core'

export type BurgerStylesNames = 'root' | 'burger'
export type BurgerCssVariables = {
  root:
    | '--burger-color'
    | '--burger-size'
    | '--burger-line-size'
    | '--burger-transition-duration'
    | '--burger-transition-timing-function'
}

export interface BurgerProps
  extends BoxProps, StylesApiProps<BurgerFactory>, /* @vue-ignore */ ElementProps<'button'> {
  /**
   * Controls burger `width` and `height`, numbers are converted to rem
   * @default 'md'
   */
  size?: CSize | (string & {}) | number

  /**
   * Controls height of lines, by default calculated based on `size` prop
   */
  lineSize?: string | number

  /**
   * Key of `theme.colors` of any valid CSS value, by default `theme.white` in dark color scheme and `theme.black` in light
   */
  color?: CColor

  /**
   * State of the burger, when `true` burger is transformed into x
   * @default false
   */
  opened?: boolean

  /**
   * `transition-duration` property value in ms
   * @default 300
   */
  transitionDuration?: number

  /** `transition-timing-function` property value
   * @default 'ease'
   */
  transitionTimingFunction?: string
}

export type BurgerFactory = Factory<{
  props: BurgerProps
  ref: HTMLButtonElement
  stylesNames: BurgerStylesNames
  vars: BurgerCssVariables
}>
