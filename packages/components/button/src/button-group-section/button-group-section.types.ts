import { CGradient, CRadius } from '@cck-ui/constants'
import { ButtonSize, ButtonVariant } from '../button.types'

export interface ButtonGroupSectionProps {
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
  /**
   * @description variants of button-group-section
   * @default 'default'
   */
  variant?: ButtonVariant
}
