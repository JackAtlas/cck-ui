import { BoxProps, CGradient, CRadius, ElementProps, Factory, StylesApiProps } from '../../../core'
import { ButtonSize, ButtonVariant } from '../button.types'

export type ButtonGroupSectionStylesNames = 'groupSection'
export type ButtonGroupSectionCssVariables = {
  groupSection:
    | '--section-radius'
    | '--section-bg'
    | '--section-color'
    | '--section-bd'
    | '--section-height'
    | '--section-padding-x'
    | '--section-fz'
}

export type ButtonGroupSectionFactory = Factory<{
  props: ButtonGroupSectionProps
  ref: HTMLDivElement
  stylesNames: ButtonGroupSectionStylesNames
  vars: ButtonGroupSectionCssVariables
  variant: ButtonVariant
}>

export interface ButtonGroupSectionProps
  extends
    BoxProps,
    StylesApiProps<ButtonGroupSectionFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean

  /**
   * @description Gradient configuration used for `variant="gradient"`
   * @default { from: 'blue', to: 'cyan', deg: 45 }
   */
  gradient?: CGradient

  /**
   * @description Key of `theme.radius` or any valid CSS value to set `border-radius`
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Controls section `height`, `font-size` and horizontal `padding`
   * @default 'sm'
   */
  size?: ButtonSize
}
