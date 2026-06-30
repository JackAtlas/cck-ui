import { BoxProps, Factory, StylesApiProps } from '../../../core'

export type ButtonGroupStylesNames = 'group'
export type ButtonGroupCssVariables = {
  group: '--button-border-width'
}

export type ButtonGroupFactory = Factory<{
  props: ButtonGroupProps
  ref: HTMLDivElement
  stylesNames: ButtonGroupStylesNames
  vars: ButtonGroupCssVariables
}>

export interface ButtonGroupProps extends BoxProps, StylesApiProps<ButtonGroupFactory> {
  /**
   * @description Orientation of the group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * @description `border-width` of the child `Button` components. Numbers are converted to rem.
   * @default 1
   */
  borderWidth?: number | string
}
