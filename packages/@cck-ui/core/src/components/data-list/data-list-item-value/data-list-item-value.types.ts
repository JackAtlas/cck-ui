import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type DataListItemValueStylesNames = 'itemValue'

export interface DataListItemValueProps
  extends
    BoxProps,
    CompoundStylesApiProps<DataListItemValueFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type DataListItemValueFactory = Factory<{
  props: DataListItemValueProps
  ref: HTMLDivElement
  stylesNames: DataListItemValueStylesNames
  compound: true
}>
