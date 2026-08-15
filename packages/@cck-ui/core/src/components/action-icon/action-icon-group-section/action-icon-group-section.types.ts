import {
  BoxProps,
  CGradient,
  CRadius,
  CSize,
  ElementProps,
  Factory,
  StylesApiProps,
} from '../../../core'
import { ActionIconVariant } from '../action-icon.types'

export type ActionIconGroupSectionStylesNames = 'groupSection'
export type ActionIconGroupSectionCssVariables = {
  groupSection:
    | '--section-radius'
    | '--section-bg'
    | '--section-color'
    | '--section-bd'
    | '--section-height'
    | '--section-padding-x'
    | '--section-fz'
}

export interface ActionIconGroupSectionProps
  extends
    BoxProps,
    StylesApiProps<ActionIconGroupSectionFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Gradient values used with `variant="gradient"`.
   * @default theme.defaultGradient
   */
  gradient?: CGradient

  /**
   * @description If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean

  /**
   * @description Controls section `height`, `font-size` and horizontal `padding`
   * @default 'sm'
   */
  size?: CSize | (string & {}) | number
}

export type ActionIconGroupSectionFactory = Factory<{
  props: ActionIconGroupSectionProps
  ref: HTMLDivElement
  stylesNames: ActionIconGroupSectionStylesNames
  vars: ActionIconGroupSectionCssVariables
  variant: ActionIconVariant
}>
