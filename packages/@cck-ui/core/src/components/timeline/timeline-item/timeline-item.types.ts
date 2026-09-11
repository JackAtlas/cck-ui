import {
  BoxProps,
  CColor,
  CompoundStylesApiProps,
  CRadius,
  ElementProps,
  Factory,
} from '../../../core'

export type TimeLineItemStylesNames =
  | 'itemBody'
  | 'itemContent'
  | 'itemBullet'
  | 'item'
  | 'itemTitle'
  | 'itemOpposite'

export interface TimelineItemProps
  extends
    BoxProps,
    CompoundStylesApiProps<TimelineItemFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  __index?: number

  /**
   * If set, switches the position of content and opposite
   * @default false
   */
  alternate?: boolean

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem
   * @default 'xl'
   */
  radius?: CRadius

  /**
   * Key of `theme.colors` or any valid CSS color to control active item colors
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * Controls line border style
   * @default 'solid'
   */
  lineVariant?: 'solid' | 'dashed' | 'dotted'
}

export type TimelineItemFactory = Factory<{
  props: TimelineItemProps
  ref: HTMLDivElement
  stylesNames: TimeLineItemStylesNames
  compound: true
}>
