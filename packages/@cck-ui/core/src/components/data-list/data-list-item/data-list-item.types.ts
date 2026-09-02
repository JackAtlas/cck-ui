import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type DataListItemStylesNames = 'item'

export interface DataListItemProps
  extends
    BoxProps,
    CompoundStylesApiProps<DataListItemFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type DataListItemFactory = Factory<{
  props: DataListItemProps
  ref: HTMLDivElement
  stylesNames: DataListItemStylesNames
  compound: true
}>
