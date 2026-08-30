import { BoxProps, CSpacing, ElementProps, Factory, StylesApiProps } from '../../../core'

export type AvatarGroupStylesNames = 'group'
export type AvatarGroupCssVariables = {
  group: '--ag-spacing'
}

export interface AvatarGroupProps
  extends BoxProps, StylesApiProps<AvatarGroupFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Negative space between Avatar components
   * @default 'sm'
   */
  spacing?: CSpacing
}

export type AvatarGroupFactory = Factory<{
  props: AvatarGroupProps
  ref: HTMLDivElement
  stylesNames: AvatarGroupStylesNames
  vars: AvatarGroupCssVariables
}>
