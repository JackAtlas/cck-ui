import { InjectionKey } from 'vue'
import { GridContextValue } from './grid.context'

export const GRID_CONTEXT_KEY: InjectionKey<GridContextValue> = Symbol('GridContext')

export const DEFAULT_COLUMNS = 12
