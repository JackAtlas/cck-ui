import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'

export type BlockquoteStylesNames = 'root' | 'icon' | 'cite'
export type BlockquoteCssVariables = {
  root:
    | '--bq-bg-light'
    | '--bq-bg-dark'
    | '--bq-bd'
    | '--bq-icon-size'
    | '--bq-radius'
    | '--bq-text-wrap'
}

export interface BlockquoteProps
  extends
    BoxProps,
    StylesApiProps<BlockquoteFactory>,
    /* @vue-ignore */ ElementProps<'blockquote', 'div'> {
  /**
   * Controls icon-wrapper span `width` and `height`, numbers are converted to rem
   * @default 40
   */
  iconSize?: number | string

  /**
   * Key of `theme.colors` or any valid CSS color
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /** Controls `text-wrap` CSS property */
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
}

export type BlockquoteFactory = Factory<{
  props: BlockquoteProps
  ref: HTMLQuoteElement
  stylesNames: BlockquoteStylesNames
  vars: BlockquoteCssVariables
}>
