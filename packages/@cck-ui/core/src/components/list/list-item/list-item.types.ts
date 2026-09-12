import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type ListItemStylesNames = 'item' | 'itemWrapper' | 'itemIcon' | 'itemLabel'

export interface ListItemProps
  extends BoxProps, CompoundStylesApiProps<ListItemFactory>, /* @vue-ignore */ ElementProps<'li'> {}

export type ListItemFactory = Factory<{
  props: ListItemProps
  ref: HTMLLIElement
  stylesNames: ListItemStylesNames
  compound: true
}>
