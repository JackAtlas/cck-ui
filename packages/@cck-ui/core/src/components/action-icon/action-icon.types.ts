import {
  BoxProps,
  CColor,
  CGradient,
  CRadius,
  CSize,
  PolymorphicFactory,
  StylesApiProps,
} from '../../core'
import { LoaderProps } from '../loader'

export type ActionIconVariant =
  | 'default'
  | 'filled'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'transparent'
  | 'white'
  | 'subtle'
  | 'gradient'

export type ActionIconStylesNames = 'root' | 'loader' | 'icon'
export type ActionIconCssVariables = {
  root:
    | '--ai-radius'
    | '--ai-size'
    | '--ai-bg'
    | '--ai-hover'
    | '--ai-hover-color'
    | '--ai-color'
    | '--ai-bd'
}

export interface ActionIconProps extends BoxProps, StylesApiProps<ActionIconFactory> {
  dataDisabled?: boolean
  __staticSelector?: string

  /**
   * @description If set, `Loader` component is displayed instead of the `children`
   */
  loading?: boolean

  /**
   * @description Props passed down to the `Loader` component. Ignored when `loading` prop is not set.
   */
  loaderProps?: LoaderProps

  /**
   * @description Controls width and height of the button. Numbers are converted to rem.
   * @default 'md'
   */
  size?: CSize | `input-${CSize}` | (string & {}) | number

  /**
   * @description Key of `theme.colors` or any valid CSS color.
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * @description Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem.
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Gradient values used with `variant="gradient"`.
   * @default theme.defaultGradient
   */
  gradient?: CGradient

  /**
   * @description Sets `disabled` attributes, prevents interactions
   */
  disabled?: boolean

  /**
   * @description If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean
}

export type ActionIconFactory = PolymorphicFactory<{
  props: ActionIconProps
  defaultComponent: 'button'
  defaultRef: HTMLButtonElement
  stylesNames: ActionIconStylesNames
  variant: ActionIconVariant
  vars: ActionIconCssVariables
  staticComponents: {}
}>
