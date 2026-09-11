import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'
import { TimeLineItemStylesNames } from './timeline-item/timeline-item.types'
import TimelineItem from './timeline-item/timeline-item.vue'

export type TimelineStylesNames = 'root' | TimeLineItemStylesNames
export type TimelineCssVariables = {
  root: '--tl-line-width' | '--tl-bullet-size' | '--tl-color' | '--tl-icon-color' | '--tl-radius'
}

export interface TimelineProps
  extends BoxProps, StylesApiProps<TimelineFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /** Index of the active element */
  active?: number

  /**
   * Key of `theme.colors` or any valid CSS color to control active item colors
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem
   * @default 'xl'
   */
  radius?: CRadius

  /**
   * Size of the bullet
   * @default 20
   */
  bulletSize?: number | string

  /**
   * Position of content relative to the bullet
   * @default 'left'
   */
  align?: 'right' | 'left'

  /** Control width of the line */
  lineWidth?: number | string

  /**
   * If set, the active items direction is reversed without reversing items order
   * @default false
   */
  reverseActive?: boolean

  /**
   * If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean
}

export type TimelineFactory = Factory<{
  props: TimelineProps
  ref: HTMLDivElement
  stylesNames: TimelineStylesNames
  vars: TimelineCssVariables
  staticComponents: {
    Item: typeof TimelineItem
  }
}>
