import { VNode } from 'vue'
import {
  BoxProps,
  CColor,
  CGradient,
  CRadius,
  CSize,
  PolymorphicFactory,
  StylesApiProps,
} from '../../core'

export type BadgeStylesNames = 'root' | 'section' | 'label'
export type BadgeVariant =
  | 'default'
  | 'filled'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'dot'
  | 'transparent'
  | 'white'
  | 'gradient'

export type BadgeCssVariables = {
  root:
    | '--badge-height'
    | '--badge-padding-x'
    | '--badge-fz'
    | '--badge-radius'
    | '--badge-bg'
    | '--badge-color'
    | '--badge-bd'
    | '--badge-dot-color'
}

export interface BadgeProps extends BoxProps, StylesApiProps<BadgeFactory> {
  /**
   * Controls `font-size`, `height` and horizontal `padding`
   * @default 'md'
   */
  size?: CSize | (string & {})

  /**
   * If set, badge `min-width` becomes equal to its `height` and horizontal padding is removed
   */
  circle?: boolean

  /**
   * Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default 'xl'
   */
  radius?: CRadius

  /**
   * Key of `theme.colors` or any valid CSS color
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * Gradient configuration used when `variant="gradient"`
   * @default theme.defaultGradient
   */
  gradient?: CGradient

  /** Content displayed on the left side of the badge label */
  leftSection?: string | VNode

  /** Content displayed on the right side of the badge label */
  rightSection?: string | VNode

  /**
   * Determines whether Badge should take 100% of its parent width
   * @default false
   */
  fullWidth?: boolean

  /** If set, adjusts text color based on background color for `filled` variant */
  autoContrast?: boolean
}

export type BadgeFactory = PolymorphicFactory<{
  props: BadgeProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: BadgeStylesNames
  vars: BadgeCssVariables
  variant: BadgeVariant
}>
