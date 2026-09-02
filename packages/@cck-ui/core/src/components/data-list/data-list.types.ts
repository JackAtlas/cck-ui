import { Properties } from 'csstype'
import { BoxProps, CSize, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'
import { DataListItemLabelStylesNames } from './data-list-item-label/data-list-item-label.types'
import { DataListItemValueStylesNames } from './data-list-item-value/data-list-item-value.types'
import { DataListItemStylesNames } from './data-list-item/data-list-item.types'
import DataListItem from './data-list-item/data-list-item.vue'
import DataListItemLabel from './data-list-item-label/data-list-item-label.vue'
import DataListItemValue from './data-list-item-value/data-list-item-value.vue'

export type DataListStylesNames =
  | 'root'
  | DataListItemStylesNames
  | DataListItemLabelStylesNames
  | DataListItemValueStylesNames

export type DataListCssVariables = {
  root: '--data-list-fz' | '--data-list-lh' | '--data-list-gap' | '--data-list-label-width'
}

export interface DataListProps
  extends BoxProps, StylesApiProps<DataListFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Controls `font-size` and `line-height`
   * @default 'sm'
   */
  size?: CSize

  /**
   * Key of `theme.spacing` or any valid CSS value to set gap between items
   * @default 'sm'
   */
  gap?: CSpacing

  /**
   * Controls arrangement of label and value within each item. `horizontal` renders label and value side by side, `vertical` stacks label on top of value
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Adds border between items
   * @default false
   */
  withDivider?: boolean

  /**
   * Controls min-width of the label (dt) element, any valid CSS value
   * @default '120px'
   */
  labelWidth?: Properties['minWidth']
}

export type DataListFactory = Factory<{
  props: DataListProps
  ref: HTMLDivElement
  stylesNames: DataListStylesNames
  vars: DataListCssVariables
  staticComponents: {
    Item: typeof DataListItem
    ItemLabel: typeof DataListItemLabel
    ItemValue: typeof DataListItemValue
  }
}>
