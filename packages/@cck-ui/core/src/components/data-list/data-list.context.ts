import { GetStylesApi } from '../../core'
import { DataListFactory } from './data-list.types'

export interface DataListContextValue {
  getStyles: GetStylesApi<DataListFactory>
}
