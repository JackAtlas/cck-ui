import { InjectionKey } from 'vue'
import { ListContextValue } from './list.context'

export const LIST_CONTEXT_KEY: InjectionKey<ListContextValue> = Symbol('ListContext')
