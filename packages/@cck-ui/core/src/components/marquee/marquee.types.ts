import { BoxProps, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'

export type MarqueeStylesNames = 'root' | 'content' | 'group'
export type MarqueeCssVariables = {
  root:
    | '--marquee-duration'
    | '--marquee-gap'
    | '--marquee-repeat'
    | '--marquee-fade-color'
    | '--marquee-fade-size'
}

export interface MarqueeProps
  extends BoxProps, StylesApiProps<MarqueeFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Reverses animation direction
   * @default false
   */
  reverse?: boolean

  /**
   * Pauses animation on hover
   * @default false
   */
  pauseOnHover?: boolean

  /**
   * Scroll orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Number of times children are repeated inline for seamless scrolling
   * @default 4
   */
  repeat?: number

  /**
   * Animation duration in ms
   * @default 40000
   */
  duration?: number

  /**
   * Gap between repeated children, key of `theme.spacing` or any valid CSS value
   * @default 'md'
   */
  gap?: CSpacing

  /** Whether to show gradient fade on edges
   * @default true
   */
  fadeEdges?: boolean

  /**
   * Color of the fade gradient
   * @default 'var(--c-color-body)'
   */
  fadeEdgeColor?: string

  /**
   * Size of the fade gradient
   * @default '5%'
   */
  fadeEdgeSize?: string
}

export type MarqueeFactory = Factory<{
  props: MarqueeProps
  ref: HTMLDivElement
  stylesNames: MarqueeStylesNames
  vars: MarqueeCssVariables
}>
