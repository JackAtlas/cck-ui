import { BoxProps, CRadius, PolymorphicFactory, StylesApiProps } from '../../core'

export type BackgroundImageStylesNames = 'root'
export type BackgroundImageCssVariables = {
  root: '--bi-radius'
}

export interface BackgroundImageProps extends BoxProps, StylesApiProps<BackgroundImageFactory> {
  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem
   * @default 0
   */
  radius?: CRadius

  /** Image url */
  src: string
}

export type BackgroundImageFactory = PolymorphicFactory<{
  props: BackgroundImageProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: BackgroundImageStylesNames
  vars: BackgroundImageCssVariables
}>
