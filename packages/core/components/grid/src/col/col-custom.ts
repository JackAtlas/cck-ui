import { computed } from 'vue'
import { ColProps, ColSpan } from './col.types'
import { filterProps, getBaseValue } from '../../../../core'
import { GridContextValue } from '../grid.context'

const getColumnFlexBasis = (colSpan: ColSpan | undefined, columns: number) => {
  if (colSpan === 'content') return 'auto'

  if (colSpan === 'auto') return '0rem'

  if (!colSpan) return undefined

  if (colSpan === columns) return '100%'

  const percentage = (100 * colSpan) / columns
  const gapFactor = (columns - colSpan) / columns
  return `calc(${percentage}% - ${gapFactor} * var(--grid-column-gap))`
}

const getColumnMaxWidth = (
  colSpan: ColSpan | undefined,
  columns: number,
  grow: boolean | undefined
) => {
  if (grow || colSpan === 'auto') return '100%'

  if (colSpan === 'content') return 'unset'

  return getColumnFlexBasis(colSpan, columns)
}

const getColumnFlexGrow = (
  colSpan: ColSpan | undefined,
  grow: boolean | undefined
) => {
  if (!colSpan) return undefined
  return colSpan === 'auto' || grow ? '1' : 'auto'
}

const getColumnOffset = (offset: number | undefined, columns: number) => {
  if (offset === 0) return '0'

  if (!offset) return undefined

  const percentage = (100 * offset) / columns
  const gapFactor = offset / columns
  return `clac(${percentage}% + ${gapFactor} * var(--grid-column-gap))`
}

export function useColCustomStyle(
  { align, offset, order, span }: ColProps,
  gridContext: GridContextValue
) {
  return computed(() => {
    const baseValue = getBaseValue(span)
    const baseSpan = baseValue === undefined ? 12 : baseValue

    const styles: Record<string, string | undefined> = filterProps({
      '--col-order': getBaseValue(order)?.toString(),
      '--col-flex-grow': getColumnFlexGrow(baseSpan, gridContext.grow),
      '--col-flex-basis': getColumnFlexBasis(baseSpan, gridContext.columns),
      '--col-width': baseSpan === 'content' ? 'auto' : undefined,
      '--col-max-width': getColumnMaxWidth(
        baseSpan,
        gridContext.columns,
        gridContext.grow
      ),
      '--col-offset': getColumnOffset(
        getBaseValue(offset),
        gridContext.columns
      ),
      '--col-align-self': getBaseValue(align)
    })

    return styles
  })
}
