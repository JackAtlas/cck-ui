import { Properties } from 'csstype'
import { BoxProps, CSize, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'
import { ListItemStylesNames } from './list-item/list-item.types'
import ListItem from './list-item/list-item.vue'

export type ListStylesNames = 'root' | ListItemStylesNames
export type ListCssVariables = {
  root: '--list-fz' | '--list-lh' | '--list-spacing'
}

export interface ListProps
  extends BoxProps, StylesApiProps<ListFactory>, /* @vue-ignore */ ElementProps<'ol', 'type'> {
  /**
   * List type
   * @default 'unordered'
   */
  type?: 'ordered' | 'unordered'

  /**
   * Adds extra horizontal padding to the list, useful for nested lists
   * @default false
   */
  withPadding?: boolean

  /**
   * Controls `font-size` and `line-height`
   * @default 'md'
   */
  size?: CSize

  /**
   * Key of `theme.spacing` or any valid CSS value to set spacing between items
   * @default 0
   */
  spacing?: CSpacing

  /**
   * Vertically centers list items with their icons
   * @default false
   */
  center?: boolean

  /** Controls CSS `list-style-type` property. Overrides the default list marker style based on list type */
  listStyleType?: Properties['listStyleType']

  /** Starting value for ordered list numbering (only works with type="ordered") */
  start?: number

  /** Reverses the order of list items (only works with type="ordered") */
  reversed?: boolean
}

export type ListFactory = Factory<{
  props: ListProps
  ref: HTMLUListElement
  stylesNames: ListStylesNames
  vars: ListCssVariables
  staticComponents: {
    Item: typeof ListItem
  }
}>
