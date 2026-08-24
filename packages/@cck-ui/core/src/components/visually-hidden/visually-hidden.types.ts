import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type VisuallyHiddenStylesNames = 'root'

export interface VisuallyHiddenProps
  extends BoxProps, StylesApiProps<VisuallyHiddenFactory>, /* @vue-ignore */ ElementProps<'span'> {}

export type VisuallyHiddenFactory = Factory<{
  props: VisuallyHiddenProps
  ref: HTMLSpanElement
  stylesNames: VisuallyHiddenStylesNames
}>
