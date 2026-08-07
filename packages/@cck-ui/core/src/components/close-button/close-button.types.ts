import { BoxProps, CRadius, CSize, PolymorphicFactory, StylesApiProps } from '../../core'

export type CloseButtonVariant = 'subtle' | 'transparent'
export type CloseButtonStylesNames = 'root'
export type CloseButtonCssVariables = {
  root: '--cb-icon-size' | '--cb-size' | '--cb-radius'
}

export interface __CloseButtonProps {
  dataDisabled?: boolean

  /**
   * @description Controls width and height of the button. Numbers are converted to rem.
   * @default 'md'
   */
  size?: CSize | (string & {}) | number

  /**
   * @description Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem.
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Sets `disabled` attribute, assigns disabled styles
   */
  disabled?: boolean

  /**
   * @description `X` icon `width` and `height`
   * @default 70%
   */
  iconSize?: number | string
}

export interface CloseButtonProps
  extends __CloseButtonProps, BoxProps, StylesApiProps<CloseButtonFactory> {
  __staticSelector?: string
}

export type CloseButtonFactory = PolymorphicFactory<{
  props: CloseButtonProps
  defaultComponent: 'button'
  defaultRef: HTMLButtonElement
  stylesNames: CloseButtonStylesNames
  variant: CloseButtonVariant
  vars: CloseButtonCssVariables
}>
