import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type EmptyStateIndicatorStylesNames = 'indicator'

export interface EmptyStateIndicatorProps
  extends
    BoxProps,
    CompoundStylesApiProps<EmptyStateIndicatorFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type EmptyStateIndicatorFactory = Factory<{
  props: EmptyStateIndicatorProps
  ref: HTMLDivElement
  stylesNames: EmptyStateIndicatorStylesNames
  compound: true
}>
