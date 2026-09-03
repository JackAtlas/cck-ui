import { BoxProps, CSize, ElementProps, Factory, StylesApiProps } from '../../core'

export type KbdStylesNames = 'root'
export type KbdCssVariables = {
  root: '--kbd-fz'
}

export interface KbdProps
  extends BoxProps, StylesApiProps<KbdFactory>, /* @vue-ignore */ ElementProps<'kbd'> {
  /**
   * Controls `font-size` and `padding`
   * @default 'sm'
   */
  size?: CSize | number | (string & {})
}

export type KbdFactory = Factory<{
  props: KbdProps
  ref: HTMLElement
  stylesNames: KbdStylesNames
  vars: KbdCssVariables
}>
