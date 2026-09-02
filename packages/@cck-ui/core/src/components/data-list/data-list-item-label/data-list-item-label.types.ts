import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type DataListItemLabelStylesNames = 'itemLabel'

export interface DataListItemLabelProps
  extends
    BoxProps,
    CompoundStylesApiProps<DataListItemLabelFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type DataListItemLabelFactory = Factory<{
  props: DataListItemLabelProps
  ref: HTMLDivElement
  stylesNames: DataListItemLabelStylesNames
  compound: true
}>
