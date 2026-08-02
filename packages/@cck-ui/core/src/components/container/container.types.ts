import { BoxProps, CSize, ElementProps, Factory, StylesApiProps } from '../../core'

export type ContainerStylesNames = 'root'
export type ContainerCssVariables = {
  root: '--container-size'
}

export interface ContainerProps
  extends BoxProps, StylesApiProps<ContainerFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description `max-width` of the container, value is not responsive - it is the same for all screen sizes. Numbers are converted to rem. Ignored when `fluid` prop is set.
   * @default 'md'
   */
  size?: CSize | (string & {}) | number

  /**
   * @description If set, the container takes 100% width of its parent and `size` prop is ignored.
   * @default false
   */
  fluid?: boolean

  /**
   * @description Centering strategy
   * @default 'block'
   */
  strategy?: 'block' | 'grid'
}

export type ContainerFactory = Factory<{
  props: ContainerProps
  ref: HTMLDivElement
  stylesNames: ContainerStylesNames
  vars: ContainerCssVariables
}>
