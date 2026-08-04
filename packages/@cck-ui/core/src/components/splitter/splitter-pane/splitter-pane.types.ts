import { SplitterPaneSize } from '@cck-ui/hooks'
import { BoxProps, CompoundStylesApiProps, ElementProps, Factory } from '../../../core'
import { VNode } from 'vue'

export type SplitterPaneStylesNames = 'pane'

export interface SplitterPaneConfig {
  uid: number
  getVNode: () => VNode
  setIndex: (index: number) => void
  defaultSize: SplitterPaneSize
  min?: SplitterPaneSize
  max?: SplitterPaneSize
  collapsible?: boolean
  collapseThreshold?: SplitterPaneSize
  size?: SplitterPaneSize
}

export interface SplitterPaneProps
  extends
    BoxProps,
    CompoundStylesApiProps<SplitterPaneFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Initial size, a `number`/`%` is a flexible size (shares leftover space), `px`/`rem` is a fixed size. A bare number is treated as a percentage.
   */
  defaultSize: SplitterPaneSize

  /**
   * @description Minimum size in the same units as `defaultSize`
   * @default 0
   */
  min?: SplitterPaneSize

  /**
   * @description Maximum size in the same units as `defaultSize`, no limit by default
   */
  max?: SplitterPaneSize

  /**
   * @description Whether this pane can be collapsed
   * @default false
   */
  collapsible?: boolean

  /**
   * @description Size below which the pane snaps to collapsed, defaults to `min`
   */
  collapseThreshold?: SplitterPaneSize

  /** @internal Index set by parent */
  __index?: number
}

export type SplitterPaneFactory = Factory<{
  props: SplitterPaneProps
  ref: HTMLDivElement
  stylesNames: SplitterPaneStylesNames
  compound: true
}>
