import type { Property } from 'csstype'
import {
  BoxProps,
  CSize,
  CSpacing,
  ElementProps,
  Factory,
  StyleProp,
  StylesApiProps
} from '@cck-ui/core'
import Col from './col/col.vue'

export type GridBreakpoints = Record<CSize, string>

export type GridStylesNames = 'root' | 'col' | 'inner' | 'container'
export type GridCssVariables = {
  root: '--grid-justify' | '--grid-align' | '--grid-overflow'
}

export type GridFactory = Factory<{
  props: GridProps
  ref: HTMLDivElement
  stylesNames: GridStylesNames
  vars: GridCssVariables
  staticComponents: {
    Col: typeof Col
  }
}>

export interface GridProps
  extends
    BoxProps,
    StylesApiProps<GridFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Gap between columns and rows, key of `theme.spacing` or any valid CSS
   * @default 'md'
   */
  gap?: StyleProp<CSpacing>

  /**
   * @description Row gap, overrides `gap` for vertical spacing
   */
  rowGap?: StyleProp<CSpacing>

  /**
   * @description Column gap, overrides `gap` for horizontal spacing
   */
  columnGap?: StyleProp<CSpacing>

  /**
   * @description If set, columns in the last row expand to fill all available space
   * @default false
   */
  grow?: boolean

  /**
   * @description Sets `justify-content`
   * @default 'flex-start'
   */
  justify?: Property.JustifyContent

  /**
   * @description Sets `align-items`
   * @default 'stretch'
   */
  align?: Property.JustifyContent

  /**
   * @description
   * Number of columns in each row
   * @default 12
   */
  columns?: number | string

  /**
   * @description Sets `overflow` CSS property on the root element
   * @default 'visible'
   */
  overflow?: Property.JustifyContent

  /**
   * @description Type of queries used for responsive styles
   * @default 'media'
   */
  type?: 'media' | 'container'

  /**
   * @description Breakpoints values, only used with `type="container"`
   */
  breakpoints?: GridBreakpoints
}
