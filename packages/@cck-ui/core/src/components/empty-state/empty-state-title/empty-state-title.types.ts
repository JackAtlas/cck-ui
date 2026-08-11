import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type EmptyStateTitleStylesNames = 'title'

export interface EmptyStateTitleProps
  extends
    BoxProps,
    CompoundStylesApiProps<EmptyStateTitleFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Heading order, renders the title as `h1`-`h6` element. By default, the title is rendered as a `div` without semantic heading level
   */
  order?: 1 | 2 | 3 | 4 | 5 | 6
}

export type EmptyStateTitleFactory = Factory<{
  props: EmptyStateTitleProps
  ref: HTMLDivElement
  stylesNames: EmptyStateTitleStylesNames
  compound: true
}>
