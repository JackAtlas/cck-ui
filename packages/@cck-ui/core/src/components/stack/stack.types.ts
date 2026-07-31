import { Properties } from 'csstype'
import { BoxProps, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'

export type StackStylesNames = 'root'
export type StackCssVariables = {
  root: '--stack-gap' | '--stack-align' | '--stack-justify'
}

export interface StackProps
  extends BoxProps, StylesApiProps<StackFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Key of `theme.spacing` or any valid CSS value to set `gap` property, numbers are converted to rem
   * @default 'md'
   */
  gap?: CSpacing

  /**
   * @description Controls `align-items` CSS property
   * @default 'stretch'
   */
  align?: Properties['alignItems']

  /**
   * @description Controls `justify-content` CSS property
   * @default 'flex-start'
   */
  justify?: Properties['justifyContent']
}

export type StackFactory = Factory<{
  props: StackProps
  ref: HTMLDivElement
  stylesNames: StackStylesNames
  vars: StackCssVariables
}>
