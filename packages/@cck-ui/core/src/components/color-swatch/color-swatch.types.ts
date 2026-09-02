import { Properties } from 'csstype'
import { BoxProps, CRadius, PolymorphicFactory, StylesApiProps } from '../../core'

export type ColorSwatchStylesNames =
  | 'root'
  | 'alphaOverlay'
  | 'shadowOverlay'
  | 'colorOverlay'
  | 'childrenOverlay'

export type ColorSwatchCssVariables = {
  root: '--cs-radius' | '--cs-size'
}

export interface ColorSwatchProps extends BoxProps, StylesApiProps<ColorSwatchFactory> {
  /** Valid CSS color to display */
  color: string

  /** Swatch `width` and `height`, any valid CSS value */
  size?: Properties['width']

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem.
   * @default 1000
   */
  radius?: CRadius

  /**
   * If set, the swatch has inner `box-shadow`
   * @default true
   */
  withShadow?: boolean
}

export type ColorSwatchFactory = PolymorphicFactory<{
  props: ColorSwatchProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: ColorSwatchStylesNames
  vars: ColorSwatchCssVariables
}>
