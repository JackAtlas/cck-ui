import { BoxProps, CColor, CSize, ElementProps, Factory, StylesApiProps } from '../../core'
import { EmptyStateActionsStylesNames } from './empty-state-actions/empty-state-actions.types'
import { EmptyStateDescriptionStylesNames } from './empty-state-description/empty-state-description.types'
import { EmptyStateIndicatorStylesNames } from './empty-state-indicator/empty-state-indicator.types'
import { EmptyStateTitleStylesNames } from './empty-state-title/empty-state-title.types'

export type EmptyStateStylesNames =
  | 'root'
  | 'body'
  | EmptyStateActionsStylesNames
  | EmptyStateDescriptionStylesNames
  | EmptyStateIndicatorStylesNames
  | EmptyStateTitleStylesNames

export type EmptyStateVariant = 'filled' | 'light'

export type EmptyStateCssVariables = {
  root:
    | '--empty-state-indicator-size'
    | '--empty-state-gap'
    | '--empty-state-title-fz'
    | '--empty-state-description-fz'
    | '--empty-state-indicator-bg'
    | '--empty-state-indicator-color'
}

export interface EmptyStateProps
  extends
    BoxProps,
    StylesApiProps<EmptyStateFactory>,
    /* @vue-ignore */ ElementProps<'div', 'title'> {
  /**
   * @description Controls indicator size, gap between elements and font sizes of title and description
   * @default 'md'
   */
  size?: CSize

  /**
   * @description Content alignment, `center` stacks the content in a centered column, `left`/`right` place the indicator on the side with the content next to it
   * @default 'center'
   */
  align?: 'left' | 'center' | 'right'

  /**
   * @description Controls the indicator appearance. `filled` and `light` display a colored circular background behind the icon. If not set, the icon is displayed with dimmed color
   */
  variant?: EmptyStateVariant

  /**
   * @description Key of `theme.colors` or any valid CSS color, used by `filled` and `light` variants
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * @description If set, a neutral circular background is displayed behind the indicator. Setting `variant` always displays a colored background regardless of this prop
   * @default false
   */
  withIndicatorBackground?: boolean
}

export type EmptyStateFactory = Factory<{
  props: EmptyStateProps
  ref: HTMLDivElement
  stylesNames: EmptyStateStylesNames
  vars: EmptyStateCssVariables
  variant: EmptyStateVariant
  staticComponents: {}
}>
