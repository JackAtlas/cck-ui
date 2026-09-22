import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'

export type AccordionControlStylesNames = 'control' | 'chevron' | 'label' | 'itemTitle' | 'icon'

export interface AccordionControlProps
  extends
    BoxProps,
    CompoundStylesApiProps<AccordionControlFactory>,
    /* @vue-ignore */ ElementProps<'button'> {
  /** Sets `disabled` attribute, prevents interactions */
  disabled?: boolean

  /** Determines whether chevron icon is presented */
  noChevron?: boolean
}

export type AccordionControlFactory = Factory<{
  props: AccordionControlProps
  ref: HTMLButtonElement
  stylesNames: AccordionControlStylesNames
  compound: true
}>
