import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import ListItem from './list-item/list-item.vue'
import classes from './list.module.css'
import { varsResolver } from './list.utils'
import List from './list.vue'

const ListWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(List, classes), varsResolver))
)
const ListItemWithStatic = withPropsFactory(withExtend(withClasses(ListItem, classes)))

export const CListItem: SFCWithInstallAndClasses<typeof ListItem> = withInstall(ListItemWithStatic)

export const CList: SFCWithInstallAndClasses<typeof List> & { Item: typeof ListItem } = withInstall(
  ListWithStatic,
  { Item: ListItem }
)

export default CList

export * from './list-item/list-item.types'
export * from './list.types'
