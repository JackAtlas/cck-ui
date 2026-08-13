import { BoxProps, CColor, ElementProps, Factory, StylesApiProps } from '../../core'

export type SemiCircleProgressStylesNames =
  | 'root'
  | 'svg'
  | 'emptySegment'
  | 'filledSegment'
  | 'label'

export type SemiCircleProgressCssVariables = {
  root:
    | '--scp-filled-segment-color'
    | '--scp-empty-segment-color'
    | '--scp-rotation'
    | '--scp-transition-duration'
    | '--scp-thickness'
}

export interface SemiCircleProgressProps
  extends
    BoxProps,
    StylesApiProps<SemiCircleProgressFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Progress value from `0` to `100`
   */
  value: number

  /**
   * @description Width of the component and diameter of the full circle in px. The visible SVG height will be size / 2
   * @default 200
   */
  size?: number

  /**
   * @description Stroke width of the circle segments in px
   * @default 12
   */
  thickness?: number

  /**
   * @description Orientation of the circle
   * @default 'up'
   */
  orientation?: 'up' | 'down'

  /**
   * @description Direction from which the circle is filled
   * @default 'left-to-right'
   */
  fillDirection?: 'right-to-left' | 'left-to-right'

  /**
   * @description Key of `theme.colors` or any valid CSS color value
   * @default theme.primaryColor
   */
  filledSegmentColor?: CColor

  /**
   * @description Key of `theme.colors` or any valid CSS color value
   * @default 'gray.2' in light mode, 'dark.4' in dark mode
   */
  emptySegmentColor?: CColor

  /**
   * @description Transition duration for the filled segment progress changes in ms. Does not affect color transitions
   * @default 0
   */
  transitionDuration?: number

  /**
   * @description Label position relative to the circle center
   * @default 'bottom'
   */
  labelPosition?: 'center' | 'bottom'
}

export type SemiCircleProgressFactory = Factory<{
  props: SemiCircleProgressProps
  ref: HTMLDivElement
  stylesNames: SemiCircleProgressStylesNames
  vars: SemiCircleProgressCssVariables
}>
