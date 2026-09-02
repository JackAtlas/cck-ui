import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import DataList from './data-list.vue'
import classes from './data-list.module.css'
import { varsResolver } from './data-list.utils'
import DataListItem from './data-list-item/data-list-item.vue'
import DataListItemLabel from './data-list-item-label/data-list-item-label.vue'
import DataListItemValue from './data-list-item-value/data-list-item-value.vue'

const DataListWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(DataList, classes), varsResolver))
)
const DataListItemWithStatic = withPropsFactory(withExtend(withClasses(DataListItem, classes)))
const DataListItemLabelWithStatic = withPropsFactory(
  withExtend(withClasses(DataListItemLabel, classes))
)
const DataListItemValueWithStatic = withPropsFactory(
  withExtend(withClasses(DataListItemValue, classes))
)

export const CDataListItem: SFCWithInstallAndClasses<typeof DataListItem> =
  withInstall(DataListItemWithStatic)
export const CDataListItemLabel: SFCWithInstallAndClasses<typeof DataListItemLabel> = withInstall(
  DataListItemLabelWithStatic
)
export const CDataListItemValue: SFCWithInstallAndClasses<typeof DataListItemValue> = withInstall(
  DataListItemValueWithStatic
)
export const CDataList: SFCWithInstallAndClasses<typeof DataList> & {
  Item: typeof DataListItem
  Label: typeof DataListItemLabel
  Value: typeof DataListItemValue
} = withInstall(DataListWithStatic, {
  Item: CDataListItem,
  Label: CDataListItemLabel,
  Value: CDataListItemValue,
})

export default CDataList

export * from './data-list-item/data-list-item.types'
export * from './data-list-item-label/data-list-item-label.types'
export * from './data-list-item-value/data-list-item-value.types'
export * from './data-list.types'
