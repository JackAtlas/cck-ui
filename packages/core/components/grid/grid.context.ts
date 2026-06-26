import { GetStylesApi } from '@cck-ui/core'
import { GridBreakpoints, GridFactory } from './grid.types'

export interface GridContextValue {
  getStyles: GetStylesApi<GridFactory>
  grow: boolean | undefined
  columns: number
  breakpoints: GridBreakpoints | undefined
  type: 'container' | 'media' | undefined
}
