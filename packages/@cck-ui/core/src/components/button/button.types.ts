import type { Component } from 'vue'
import { BoxProps, CGradient, CRadius, CSize, PolymorphicFactory, StylesApiProps } from '../../core'
import { Properties } from 'csstype'

export type ButtonSize = CSize | `compact-${CSize}` | (string & {})

export type ButtonStylesNames = 'root' | 'inner' | 'loader' | 'section' | 'label'
export type ButtonVariant =
  | 'default'
  | 'filled'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'transparent'
  | 'white'
  | 'subtle'
  | 'gradient'

export type ButtonCssVariables = {
  root:
    | '--button-justify'
    | '--button-height'
    | '--button-padding-x'
    | '--button-fz'
    | '--button-radius'
    | '--button-bg'
    | '--button-hover'
    | '--button-hover-color'
    | '--button-color'
    | '--button-bd'
}

export type ButtonFactory = PolymorphicFactory<{
  props: ButtonProps
  defaultRef: HTMLButtonElement
  defaultComponent: 'button'
  stylesNames: ButtonStylesNames
  vars: ButtonCssVariables
  variant: ButtonVariant
  staticComponents: {}
}>

export interface ButtonProps extends BoxProps, StylesApiProps<ButtonFactory> {
  'data-disabled'?: boolean

  /**
   * @description If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean
  /**
   * @description Key of `theme.colors` or any valid CSS color
   * @default theme.primaryColor
   */
  color?: string
  /**
   * @description Sets `disabled` attribute, applies disabled styles
   */
  disabled?: boolean
  /**
   * @description Sets `width: 100%`
   * @default false
   */
  fullWidth?: boolean
  /**
   * @description Gradient configuration used for `variant="gradient"`
   * @default { from: 'blue', to: 'cyan', deg: 45 }
   */
  gradient?: CGradient
  /**
   * @description Sets `justify-content` of `inner` element, can be used to change distribution of sections and label
   * @default 'center'
   */
  justify?: Properties['justifyContent']
  /**
   * @description Content on the left side of the button label
   */
  leftSection?: Component
  /**
   * @description Props add to the `Loader` component (only visible when `loading` props is set)
   */
  loaderProps?: Record<string, string>
  /**
   * @description If set, the `Loader` component is displayed over the button
   */
  loading?: boolean
  /**
   * @description Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default theme.defaultRadius
   */
  radius?: CRadius
  /**
   * @description Content on the right side of the button label
   */
  rightSection?: Component
  /**
   * @description Controls button `height`, `font-size` and horizontal `padding`
   * @default 'sm'
   */
  size?: ButtonSize
  /**
   * @description custom element tag
   * @default 'button'
   */
  tag?: string | Component
  /**
   * @description variants of button
   * @default 'default'
   */
  variant?: ButtonVariant
}
