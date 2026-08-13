import { Properties } from 'csstype'
import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type SkeletonStylesNames = 'root'
export type SkeletonCssVariables = {
  root: '--skeleton-width' | '--skeleton-height' | '--skeleton-radius'
}

export interface SkeletonProps
  extends BoxProps, StylesApiProps<SkeletonFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Determines whether Skeleton overlay should be displayed
   * @default true
   */
  visible?: boolean

  /**
   * @description Skeleton `height`, numbers are converted to rem
   * @default auto
   */
  height?: Properties['height']

  /**
   * @description Skeleton `width`, numbers are converted to rem, ignored when `circle` prop is set.
   * @default 100%
   */
  width?: Properties['width']

  /**
   * @description If set, Skeleton `width` and `border-radius` are equal to its `height`
   * @default false
   */
  circle?: boolean

  /**
   * @description Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem.
   * @default theme.defaultRadius
   */
  radius?: Properties['borderRadius']

  /**
   * @description Enables animation
   * @default true
   */
  animate?: boolean
}

export type SkeletonFactory = Factory<{
  props: SkeletonProps
  ref: HTMLDivElement
  stylesNames: SkeletonStylesNames
  vars: SkeletonCssVariables
}>
