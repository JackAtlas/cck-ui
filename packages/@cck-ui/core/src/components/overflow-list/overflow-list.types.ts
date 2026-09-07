import { BoxProps, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'

export type OverflowListStylesNames = 'root'
export type OverflowListCssVariables = {
  root: '--ol-gap'
}

export interface OverflowListProps<T = any>
  extends BoxProps, StylesApiProps<OverflowListFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /** Array of items to display */
  data: T[]

  /**
   * Number of rows to display
   * @default 1
   */
  maxRows?: number

  /**
   * Maximum number of visible items
   * @default Infinity
   */
  maxVisibleItems?: number

  /**
   * Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem
   * @default 'xs'
   */
  gap?: CSpacing

  /**
   * Direction from which items are collapsed when they overflow, `'end'` collapses last items, `'start'` collapses first items
   * @default 'end'
   */
  collapseFrom?: 'start' | 'end'

  /**
   * A function to resolve a unique key for each item. Used to detect when the contents of `data`
   * change (for example when items are reordered while the length stays the same) so the
   * visible/overflow split can be recomputed. Required to detect reordering when `data` contains
   * objects; for permitive items (strings, numbers) the item value is used by default.
   */
  getItemKey?: (item: T, index: number) => string | number
}

export type OverflowListFactory = Factory<{
  props: OverflowListProps<any>
  ref: HTMLDivElement
  stylesNames: OverflowListStylesNames
  vars: OverflowListCssVariables
}>
