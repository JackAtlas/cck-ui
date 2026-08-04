import { SplitterPaneSize, SplitterStep, UseSplitterRedistributeFn } from '@cck-ui/hooks'
import { BoxProps, CColor, ElementProps, Factory, StylesApiProps } from '../../core'
import { SplitterPaneStylesNames } from './splitter-pane/splitter-pane.types'

export type SplitterStylesNames = 'root' | 'handle' | 'thumb' | SplitterPaneStylesNames

export type SplitterCssVariables = {
  root: '--splitter-line-size' | '--splitter-handle-color'
}

export interface SplitterProps
  extends BoxProps, StylesApiProps<SplitterFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Layout direction
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * @description Controlled sizes, each value keeps the unit it was declared in (number/`%` flexible, `px`/`rem` fixed)
   */
  sizes?: SplitterPaneSize[]

  /**
   * @description Called during resize with updated sizes, each value keeps its declared unit
   */
  onSizeChange?: (sizes: SplitterPaneSize[]) => void

  /**
   * @description Called when drag starts
   */
  onResizeStart?: (handleIndex: number) => void

  /**
   * @description Called when drag ends
   */
  onResizeEnd?: (handleIndex: number, sizes: SplitterPaneSize[]) => void

  /**
   * @description Called when a panel collapses or expands
   */
  onCollapseChange?: (panelIndex: number, collapsed: boolean) => void

  /**
   * @description How to redistribute space when immediate neighbor is at its min/max
   */
  redistribute?: 'nearest' | 'equal' | UseSplitterRedistributeFn

  /**
   * @description Keyboard step size, a `number`/`%` is a percentage, `px`/`rem` is resolved to pixels
   * @default 1
   */
  step?: SplitterStep

  /**
   * @description Shift + arrow step size, a `number`/`%` is a percentage, `px`/`rem` is resolved to pixels
   * @default 10
   */
  shiftStep?: SplitterStep

  /**
   * @description CSS value for separator line thickness between panes
   * @default 2
   */
  lineSize?: number | string

  /**
   * @description Key of `theme.colors` or any valid CSS color for the separator line
   */
  handleColor?: CColor

  /**
   * @description Custom icon displayed in the handle thumb, by default uses grip icon based on orientation
   */
  handleIcon?: any

  /**
   * @description Determines whether the thumb with grip icon is displayed on the handle
   * @default true
   */
  withHandle?: boolean

  /**
   * @description Restore the two panes adjacent to a handle to their default ratio (preserving their combined size) when the handle is double-clicked
   * @default true
   */
  resetOnDoubleClick?: boolean
}

export type SplitterFactory = Factory<{
  props: SplitterProps
  ref: HTMLDivElement
  stylesNames: SplitterStylesNames
  vars: SplitterCssVariables
}>
