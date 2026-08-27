import { PolymorphicFactory } from '../../core'
import { TextCssVariables, TextProps, TextStylesNames, TextVariant } from '../text'

export type AnchorStylesNames = TextStylesNames
export type AnchorVariant = TextVariant
export type AnchorCssVariables = TextCssVariables

export interface AnchorProps extends Omit<TextProps, 'span'> {
  underline?: 'always' | 'hover' | 'not-hover' | 'never'
}

export type AnchorFactory = PolymorphicFactory<{
  props: AnchorProps
  defaultComponent: 'a'
  defaultRef: HTMLAnchorElement
  stylesNames: AnchorStylesNames
  vars: AnchorCssVariables
  variant: AnchorVariant
}>
