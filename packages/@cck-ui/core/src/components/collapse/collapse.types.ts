import { ComponentProps } from 'vue-component-type-helpers'
import { BoxProps, Factory } from '../../core'

export interface CollapseProps
  extends BoxProps, /* @vue-ignore */ Omit<ComponentProps<'div'>, keyof BoxProps> {
  /**
   * Collapse orientation
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal'

  /** Expanded state */
  expanded: boolean

  /** Called when transition ends */
  onTransitionEnd?: () => void

  /** Called when transition starts */
  onTransitionStart?: () => void

  /**
   * Transition duration in ms
   * @default 200
   */
  transitionDuration?: number

  /**
   * Transition timing function
   * @default ease
   */
  transitionTimingFunction?: string

  /**
   * Determines whether the opacity is animated
   * @default true
   */
  animateOpacity?: boolean

  /**
   * If set, the element is kept in the DOM when collapsed.
   * @default true
   */
  keepMounted?: boolean

  keepMountedMode?: 'activity' | 'display-none'
}

export type CollapseFactory = Factory<{
  props: CollapseProps
  ref: HTMLDivElement
}>
