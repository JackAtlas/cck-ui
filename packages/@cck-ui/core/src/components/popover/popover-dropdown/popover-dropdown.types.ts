import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'
import { PopoverStylesNames } from '../popover.types'

export interface PopoverDropdownProps
  extends
    BoxProps,
    CompoundStylesApiProps<PopoverDropdownFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type PopoverDropdownFactory = Factory<{
  props: PopoverDropdownProps
  ref: HTMLDivElement
  stylesNames: PopoverStylesNames
  compound: true
}>
