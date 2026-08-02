import { BoxProps, PolymorphicFactory, StylesApiProps } from '../../core'

export type CenterStylesNames = 'root'

export interface CenterProps extends BoxProps, StylesApiProps<CenterFactory> {
  /**
   * @description If set, `inline-flex` is used instead of `flex`
   */
  inline?: boolean
}

export type CenterFactory = PolymorphicFactory<{
  props: CenterProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: CenterStylesNames
}>
