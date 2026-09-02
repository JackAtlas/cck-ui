import { InjectionKey } from 'vue'
import { DataListContextValue } from './data-list.context'

export const DATA_LIST_CONTEXT_KEY: InjectionKey<DataListContextValue> = Symbol('DataListContext')
