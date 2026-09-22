import { BoxProps, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'
import AccordionChevron from './accordion-chevron/accordion-chevron.vue'
import { AccordionItemStylesNames } from './accordion-item/accordion-item.types'
import { AccordionPanelStylesNames } from './accordion-panel/accordion-panel.types'
import { AccordionControlStylesNames } from './accordion-control/accordion-control.types'
import AccordionItem from './accordion-item/accordion-item.vue'
import AccordionPanel from './accordion-panel/accordion-panel.vue'
import AccordionControl from './accordion-control/accordion-control.vue'

export type AccordionHeadingOrder = 2 | 3 | 4 | 5 | 6
export type AccordionChevronPosition = 'left' | 'right'

export type AccordionStylesNames =
  | 'root'
  | AccordionItemStylesNames
  | AccordionPanelStylesNames
  | AccordionControlStylesNames

export type AccordionVariant = 'default' | 'contained' | 'filled' | 'separated'
export type AccordionCssVariables = {
  root: '--accordion-transition-duration' | '--accordion-chevron-size' | '--accordion-radius'
}

export interface AccordionProps
  extends
    BoxProps,
    StylesApiProps<AccordionFactory>,
    /* @vue-ignore */ ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
  /**
   * If set, multiple items can be opened at the same time
   * @default false
   */
  multiple?: boolean

  /** Controlled component value */
  value?: string | string[] | null

  /** Uncontrolled component default value */
  defaultValue?: string | string[] | null

  /**
   * If set, arrow keys loop through items (first to last and last to first)
   * @default true
   */
  loop?: boolean

  /**
   * Transition duration in ms
   * @default 200
   */
  transitionDuration?: number

  /**
   * If set, chevron rotation is disabled
   * @default false
   */
  disableChevronRotation?: boolean

  /**
   * If set, the open item cannot be collapsed by clicking it again, so one item always stays open. Only applies when `multiple` if `false`.
   * @default false
   */
  disableCollapse?: boolean

  /**
   * @Position of the chevron relative to the item label
   * @default 'right'
   */
  chevronPosition?: AccordionChevronPosition

  /**
   * Size of the default chevron icon. Ignored when `chevron` prop is set. Use `chevronSize` instead when using custom chevron.
   * @default 16
   */
  chevronSize?: number | string

  /**
   * Size of the default chevron icon. Ignored when `chevron` slot is provided. Use `chevronSize` instead when using custom chevron.
   * @default 16
   */
  chevronIconSize?: number | string

  /** Sets heading level (h2-h6) for `AccordionControl` elements. Wraps each control in the corresponding heading tag, recommended to meet WAI_ARIA accessibility requirements. Has no visual effect. */
  order?: AccordionHeadingOrder

  /** Determines whether chevron icon is presented */
  noChevron?: boolean

  /**
   * Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem.
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * If set to `false`, panels are unmounted when collapsed. By default, panels stay mounted when collapsed.
   * @default true
   */
  keepMounted?: boolean

  /**
   * Controls how inactive panels content is hidden when `keepMounted` is true
   * @default 'activity'
   */
  keepMountedMode?: 'activity' | 'display-none'
}

export type AccordionFactory = Factory<{
  props: AccordionProps
  ref: HTMLDivElement
  stylesNames: AccordionStylesNames
  vars: AccordionCssVariables
  variant: AccordionVariant
  staticComponents: {
    Item: typeof AccordionItem
    Control: typeof AccordionControl
    Chevron: typeof AccordionChevron
    Panel: typeof AccordionPanel
  }
}>
