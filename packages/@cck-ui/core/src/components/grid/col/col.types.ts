import { Property } from 'csstype'
import { BoxProps, CompoundStylesApiProps, ElementProps, Factory, StyleProp } from '../../../core'

export type GridColStylesNames = 'col'
export type ColSpan = number | 'auto' | 'content'

export type GridColFactory = Factory<{
  props: GridColFactory
  ref: HTMLDivElement
  stylesNames: GridColStylesNames
  compound: true
}>

export interface ColProps
  extends BoxProps, CompoundStylesApiProps<GridColFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Column span
   * @default 12
   */
  span?: StyleProp<ColSpan>

  /**
   * @description Column order, use to reorder columns at different viewport sizes
   */
  order?: StyleProp<number | `${number}`>

  /**
   * @description Column start offset - number of empty columns before this column
   */
  offset?: StyleProp<number | `${number}`>

  /**
   * @description Vertical alignment of the column, controls `align-self` CSS property
   */
  align?: Property.AlignSelf
}
