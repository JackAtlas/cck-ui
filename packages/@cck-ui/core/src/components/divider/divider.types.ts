import { BoxProps, CColor, CSize, ElementProps, Factory, StylesApiProps } from '../../core'

export type DividerStylesNames = 'root' | 'label'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'
export type DividerCssVariables = {
  root: '--divider-color' | '--divider-border-style' | '--divider-size'
}

export interface DividerProps
  extends BoxProps, StylesApiProps<DividerFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /** Key of `theme.colors` or any valid CSS color value */
  color?: CColor

  /**
   * Controls width/height (depends on orientation)
   * @default 'xs'
   */
  size?: CSize | number | (string & {})

  /**
   * label position
   * @default 'center'
   */
  labelPosition?: 'left' | 'center' | 'right'

  orientation?: 'horizontal' | 'vertical'
}

export type DividerFactory = Factory<{
  props: DividerProps
  ref: HTMLDivElement
  stylesNames: DividerStylesNames
  vars: DividerCssVariables
  variant: DividerVariant
}>
