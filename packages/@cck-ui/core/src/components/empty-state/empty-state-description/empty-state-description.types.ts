import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type EmptyStateDescriptionStylesNames = 'description'

export interface EmptyStateDescriptionProps
  extends
    BoxProps,
    CompoundStylesApiProps<EmptyStateDescriptionFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type EmptyStateDescriptionFactory = Factory<{
  props: EmptyStateDescriptionProps
  ref: HTMLDivElement
  stylesNames: EmptyStateDescriptionStylesNames
  compound: true
}>
