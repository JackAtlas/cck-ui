import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type SpaceStylesNames = 'root'

export interface SpaceProps
  extends BoxProps, StylesApiProps<SpaceFactory>, /* @vue-ignore */ ElementProps<'div'> {}

export type SpaceFactory = Factory<{
  props: SpaceProps
  ref: HTMLDivElement
  stylesNames: SpaceStylesNames
}>
