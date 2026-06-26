import {
  BoxProps,
  CSpacing,
  ElementProps,
  Factory,
  NumberLikeString,
  StyleProp,
  StylesApiProps
} from '@cck-ui/core'

export type SimpleGridStylesNames = 'root' | 'container'

export interface SimpleGridProps
  extends
    BoxProps,
    StylesApiProps<SimpleGridFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Number of columns
   * @default 1
   */
  cols?: StyleProp<NumberLikeString>

  /**
   * @description Spacing between columns
   * @default 'md'
   */
  spacing?: StyleProp<CSpacing>

  /**
   * @description Spacing between rows. When not set, falls back to spacing value
   * @default undefined
   */
  verticalSpacing?: StyleProp<CSpacing>

  /**
   * @description Determines type of queries that are used for responsive styles
   * @default 'media'
   */
  type?: 'media' | 'container'

  /**
   * @description Minimum column width when using auto-fit/auto-fill. When set, cols prop is ignored
   */
  minColWidth?: string | NumberLikeString

  /**
   * @description Grid repeat type when minColWidth is set
   * @default 'auto-fill'
   */
  autoFlow?: 'auto-fit' | 'auto-fill'

  /**
   * @description Sets the size of implicitly created grid rows
   */
  autoRows?: string
}

export type SimpleGridFactory = Factory<{
  props: SimpleGridProps
  ref: HTMLDivElement
  stylesNames: SimpleGridStylesNames
}>
