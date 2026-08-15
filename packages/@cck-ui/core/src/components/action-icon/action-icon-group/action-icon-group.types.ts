import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../../core'

export type ActionIconGroupStylesNames = 'group'
export type ActionIconGroupCssVariables = {
  group: '--ai-border-width'
}

export interface ActionIconGroupProps
  extends BoxProps, StylesApiProps<ActionIconGroupFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Group orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * @description `border-width` of the child components.
   * @default 1
   */
  borderWidth?: number | string
}

export type ActionIconGroupFactory = Factory<{
  props: ActionIconGroupProps
  ref: HTMLDivElement
  stylesNames: ActionIconGroupStylesNames
  vars: ActionIconGroupCssVariables
}>
