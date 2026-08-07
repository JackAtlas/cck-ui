import { BoxProps, CColor, CRadius, ElementProps, Factory, StylesApiProps } from '../../core'

export type AlertStylesNames =
  | 'root'
  | 'body'
  | 'label'
  | 'title'
  | 'icon'
  | 'wrapper'
  | 'message'
  | 'close-button'

export type AlertVariant =
  | 'default'
  | 'filled'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'transparent'
  | 'white'

export type AlertCssVariables = {
  root: '--alert-radius' | '--alert-bg' | '--alert-color' | '--alert-bd'
}

export interface AlertProps
  extends BoxProps, StylesApiProps<AlertFactory>, /* @vue-ignore */ ElementProps<'div', 'title'> {
  /**
   * @description Key of `theme.radius` or any valid CSS value to set border-radius
   * @default theme.defaultRadius
   */
  radius?: CRadius

  /**
   * @description Key of `theme.colors` or any valid CSS color
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * @description Determines whether close button should be displayed
   * @default false
   */
  withCloseButton?: boolean

  /**
   * @description Called when the close button is clicked
   */
  onClose?: () => void

  /**
   * @description Close button `aria-label`
   */
  closeButtonLabel?: string

  /**
   * @description If set, adjusts text color based on background color for `filled` variant
   */
  autoContrast?: boolean
}

export type AlertFactory = Factory<{
  props: AlertProps
  ref: HTMLDivElement
  stylesNames: AlertStylesNames
  vars: AlertCssVariables
  variant: AlertVariant
}>
