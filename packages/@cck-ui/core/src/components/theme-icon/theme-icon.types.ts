import {
  BoxProps,
  CColor,
  CGradient,
  CRadius,
  CSize,
  ElementProps,
  Factory,
  StylesApiProps,
} from '../../core'

export type ThemeIconStylesNames = 'root'

export type ThemeIconVariant =
  | 'default'
  | 'filled'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'transparent'
  | 'white'
  | 'gradient'

export type ThemeIconCssVariables = {
  root: '--ti-radius' | '--ti-size' | '--ti-bg' | '--ti-color' | '--ti-bd'
}

export interface ThemeIconProps
  extends BoxProps, StylesApiProps<ThemeIconFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Controls width and height of the button. Numbers are converted to rem.
   * @default 'md'
   */
  size?: CSize | (string & {}) | number

  /**
   * Key of `theme.colors` or any valid CSS color.
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem.
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * Gradient data used when `variant="gradient"`
   * @default theme.defaultGradient
   */
  gradient?: CGradient

  /** If set, adjusts text color based on background color for `filled` variant */
  autoContrast?: boolean
}

export type ThemeIconFactory = Factory<{
  props: ThemeIconProps
  ref: HTMLDivElement
  stylesNames: ThemeIconStylesNames
  vars: ThemeIconCssVariables
  variant: ThemeIconVariant
}>
