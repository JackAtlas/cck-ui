import { computed } from 'vue'
import { ColProps, ColSpan } from './col.types'
import {
  CTheme,
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  keys,
  StyleProp,
  stylesToString
} from '../../../../core'
import { GridContextValue } from '../grid.context'
import type { GridBreakpoints } from '../grid.types'

interface ColVariablesProps {
  selector: string
  align?: ColProps['align'] | undefined
  offset?: StyleProp<number> | undefined
  order?: ColProps['order'] | undefined
  span: ColProps['span'] | undefined
}

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
  return `calc(${percentage}% + ${gapFactor} * var(--grid-column-gap))`
}

export function useColCustomStyle(
  { align, offset, order, selector, span }: ColVariablesProps,
  gridContext: GridContextValue,
  theme: CTheme
) {
  return computed(() => {
    const _breakpoints = gridContext.breakpoints || theme.breakpoints
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

    const queries = keys(_breakpoints).reduce<
      Record<string, Record<string, any>>
    >((acc, breakpoint) => {
      if (!acc[breakpoint]) acc[breakpoint] = {}

      if (typeof order === 'object' && order[breakpoint] !== undefined) {
        acc[breakpoint]['--col-order'] = order[breakpoint]?.toString()
      }

      if (typeof span === 'object' && span[breakpoint] !== undefined) {
        acc[breakpoint]['--col-flex-grow'] = getColumnFlexGrow(
          span[breakpoint],
          gridContext.grow
        )
        acc[breakpoint]['--col-flex-basis'] = getColumnFlexBasis(
          span[breakpoint],
          gridContext.columns
        )
        acc[breakpoint]['--col-width'] =
          span[breakpoint] === 'content' ? 'auto' : undefined
        acc[breakpoint]['--col-max-width'] = getColumnMaxWidth(
          span[breakpoint],
          gridContext.columns,
          gridContext.grow
        )
      }

      if (typeof offset === 'object' && offset[breakpoint] !== undefined) {
        acc[breakpoint]['--col-offset'] = getColumnOffset(
          offset[breakpoint],
          gridContext.columns
        )
      }

      if (typeof align === 'object' && align[breakpoint] !== undefined) {
        acc[breakpoint]['--col-align-self'] = align[breakpoint]
      }

      return acc
    }, {})

    const sortedBreakpoints = getSortedBreakpoints(
      keys(queries),
      _breakpoints
    ).filter((breakpoint) => keys(queries[breakpoint.value]).length > 0)

    const values = sortedBreakpoints.map((breakpoint) => ({
      query:
        gridContext.type === 'container'
          ? `c-grid (min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`
          : `(min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`,
      styles: queries[breakpoint.value]
    }))

    const queryStyles = {
      styles,
      media: gridContext.type === 'container' ? undefined : values,
      container: gridContext.type === 'container' ? values : undefined,
      selector
    }

    const queryStylesString = stylesToString(queryStyles)

    return { queryStylesString }
  })
}
