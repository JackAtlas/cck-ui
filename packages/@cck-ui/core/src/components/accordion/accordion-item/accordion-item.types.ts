import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type AccordionItemStylesNames = 'item'

export interface AccordionItemProps
  extends
    BoxProps,
    CompoundStylesApiProps<AccordionItemFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  value: string
}

export type AccordionItemFactory = Factory<{
  props: AccordionItemProps
  ref: HTMLDivElement
  stylesNames: AccordionItemStylesNames
  compound: true
}>
