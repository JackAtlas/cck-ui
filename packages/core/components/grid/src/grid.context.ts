import { InjectionKey } from 'vue'
// import { GridBreakpoints } from './grid.types'

export interface GridContextValue {
  grow: boolean | undefined
  columns: number
  // breakpoints: GridBreakpoints // TODO
  type: 'container' | 'media' | undefined
}

export const GRID_CONTEXT_KEY: InjectionKey<GridContextValue> =
  Symbol('GridContext')
