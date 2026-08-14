import { BoxProps, CRadius, CShadow, PolymorphicFactory, StylesApiProps } from '../../core'

export type PaperStylesNames = 'root'
export type PaperCssVariables = {
  root: '--paper-radius' | '--paper-shadow'
}

export interface PaperBaseProps {
  /**
   * @description Key of `theme.shadows` or any valid CSS value to set `box-shadow`
   */
  shadow?: CShadow

  /**
   * @description Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Adds border to the root element
   */
  withBorder?: boolean
}

export interface PaperProps extends BoxProps, PaperBaseProps, StylesApiProps<PaperFactory> {}

export type PaperFactory = PolymorphicFactory<{
  props: PaperProps
  defaultComponent: 'div'
  defaultRef: HTMLDivElement
  stylesNames: PaperStylesNames
  vars: PaperCssVariables
}>
