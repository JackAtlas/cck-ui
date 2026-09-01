import {
  BoxProps,
  CRadius,
  CShadow,
  CSpacing,
  PolymorphicFactory,
  StylesApiProps,
} from '../../core'

export type CardStylesNames = 'root' | 'section'
export type CardCssVariables = {
  root: '--card-padding'
}

export interface CardProps extends BoxProps, StylesApiProps<CardFactory> {
  /** Key of `theme.shadows` or any valid CSS value to set `box-shadow` */
  shadow?: CShadow

  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /** Adds border to the card */
  withBorder?: boolean

  /**
   * Key of `theme.spacing` or any valid CSS value to set padding
   * @default 'md'
   */
  padding?: CSpacing

  /**
   * Card orientation
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'
}

export type CardFactory = PolymorphicFactory<{
  props: CardProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: CardStylesNames
  vars: CardCssVariables
  staticComponents: {}
}>
