export interface ButtonGroupProps {
  /**
   * @description Orientation of the group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * @description `border-width` of the child `Button` components. Numbers are converted to rem.
   * @default 1
   */
  borderWidth?: number | string
}
