import { BoxProps, CColor, ElementProps, Factory, StylesApiProps } from '../../core'

export type MarkStylesNames = 'root'
export type MarkCssVariables = {
  root: '--mark-bg-dark' | '--mark-bg-light'
}

export interface MarkProps
  extends BoxProps, StylesApiProps<MarkFactory>, /* @vue-ignore */ ElementProps<'mark'> {
  color?: CColor
}

export type MarkFactory = Factory<{
  props: MarkProps
  ref: HTMLElement
  stylesNames: MarkStylesNames
  vars: MarkCssVariables
}>
