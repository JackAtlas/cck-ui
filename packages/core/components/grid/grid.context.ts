import { GridBreakpoints } from './grid.types'

export interface GridContextValue {
  grow: boolean | undefined
  columns: number
  breakpoints: GridBreakpoints | undefined
  type: 'container' | 'media' | undefined
}
