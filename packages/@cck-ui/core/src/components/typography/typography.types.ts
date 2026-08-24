import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type TypographyStylesNames = 'root'

export interface TypographyProps
  extends BoxProps, StylesApiProps<TypographyFactory>, /* @vue-ignore */ ElementProps<'div'> {}

export type TypographyFactory = Factory<{
  props: TypographyProps
  ref: HTMLDivElement
  stylesNames: TypographyStylesNames
}>
