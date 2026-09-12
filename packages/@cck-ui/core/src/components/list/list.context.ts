import { VNode } from 'vue'
import { GetStylesApi } from '../../core'
import { ListFactory } from './list.types'

export interface ListContextValue {
  getStyles: GetStylesApi<ListFactory>
  center: boolean | undefined
  icon: VNode | VNode[] | undefined
}
