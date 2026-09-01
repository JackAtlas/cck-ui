import { BoxProps, CompoundStylesApiProps, PolymorphicFactory } from '../../../core'

export type CardSectionStylesNames = 'section'

export interface CardSectionProps extends BoxProps, CompoundStylesApiProps<CardSectionFactory> {
  /** Adds border to the root element */
  withBorder?: boolean

  /** If set, the section inherits padding from the parent `Card` */
  inheritPadding?: boolean
}

export type CardSectionFactory = PolymorphicFactory<{
  props: CardSectionProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: CardSectionStylesNames
  compound: true
}>
