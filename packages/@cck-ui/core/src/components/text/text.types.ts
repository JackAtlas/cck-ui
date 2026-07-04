import {
  BoxProps,
  CFontSize,
  CGradient,
  CLineHeight,
  PolymorphicFactory,
  StylesApiProps,
} from '../../core'

export type TextTruncate = 'end' | 'start' | boolean

export type TextStylesNames = 'root'
export type TextVariant = 'text' | 'gradient'
export type TextCssVariables = {
  root: '--text-gradient' | '--text-line-clamp' | '--text-fz' | '--text-lh' | '--text-text-wrap'
}

export type TextFactory = PolymorphicFactory<{
  props: TextProps
  defaultComponent: 'p'
  defaultRef: HTMLParagraphElement
  stylesNames: TextStylesNames
  vars: TextCssVariables
  variant: TextVariant
}>

export interface TextProps extends BoxProps, StylesApiProps<TextFactory> {
  __staticSelector?: string

  /**
   * @description Controls `font-size` and `line-height`
   * @default 'md'
   */
  size?: CFontSize | CLineHeight

  /**
   * @description Number of lines after which Text will be truncated
   */
  lineClamp?: number

  /**
   * @description Side on which Text must be truncated, if `true`, text is truncated from the end
   */
  truncate?: TextTruncate

  /**
   * @description Sets `line-height` to 1 for centering
   * @default false
   */
  inline?: boolean

  /**
   * @description Determines whether font properties should be inherited from the parent
   * @default false
   */
  inherit?: boolean

  /**
   * @description Gradient configuration, ignored when `variant` is not `gradient`
   * @default theme.defaultGradient
   */
  gradient?: CGradient

  /**
   * Shorthand for `tag="span"`
   */
  span?: boolean

  /**
   * Controls `text-wrap` CSS property
   */
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
}
