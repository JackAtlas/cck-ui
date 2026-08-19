import { Properties } from 'csstype'
import { BoxProps, CRadius, PolymorphicFactory, StylesApiProps } from '../../core'

export type ImageStylesNames = 'root'
export type ImageCssVariables = {
  root: '--image-radius' | '--image-object-fit'
}

export interface ImageProps extends BoxProps, StylesApiProps<ImageFactory> {
  /**
   * @description Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default 0
   */
  radius?: CRadius

  /**
   * @description Controls `object-fit` style
   * @default 'cover'
   */
  fit?: Properties['objectFit']

  /**
   * @description Image url used as a fallback if the image cannot be loaded
   */
  fallbackSrc?: string

  /**
   * @description Image url
   */
  src?: any
}

export type ImageFactory = PolymorphicFactory<{
  props: ImageProps
  defaultRef: HTMLImageElement
  defaultComponent: 'img'
  stylesNames: ImageStylesNames
  vars: ImageCssVariables
}>
