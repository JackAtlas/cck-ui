import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type EmptyStateActionsStylesNames = 'actions'

export interface EmptyStateActionsProps
  extends
    BoxProps,
    CompoundStylesApiProps<EmptyStateActionsFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type EmptyStateActionsFactory = Factory<{
  props: EmptyStateActionsProps
  ref: HTMLDivElement
  stylesNames: EmptyStateActionsStylesNames
  compound: true
}>
