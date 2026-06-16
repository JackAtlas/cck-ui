import {
  CTheme,
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  getSpacing,
  keys,
  stylesToString
} from '../../../core'
import { GridBreakpoints, GridProps } from './grid.types'
import { computed } from 'vue'

interface GridVariablesProps extends GridProps {
  selector: string
}

export function useGridCustomStyle(
  { breakpoints, columnGap, gap, rowGap, selector, type }: GridVariablesProps,
  theme: CTheme
) {
  return computed(() => {
    const _breakpoints = breakpoints || theme.breakpoints

    const styles: Record<string, string | undefined> = filterProps({
      '--grid-gap': getSpacing(getBaseValue(gap)),
      '--grid-row-gap': getSpacing(getBaseValue(rowGap)),
      '--grid-column-gap': getSpacing(getBaseValue(columnGap))
    })

    const queries = keys(_breakpoints).reduce<
      Record<string, Record<string, any>>
    >((acc, breakpoint) => {
      if (!acc[breakpoint]) acc[breakpoint] = {}

      if (typeof gap === 'object' && gap[breakpoint] !== undefined) {
        acc[breakpoint]['--grid-gap'] = getSpacing(gap[breakpoint])
      }

      return acc
    }, {})

    const sortedBreakpoints = getSortedBreakpoints(
      keys(queries),
      _breakpoints
    ).filter((breakpoint) => keys(queries[breakpoint.value]).length > 0)

    const values = sortedBreakpoints.map((breakpoint) => ({
      query:
        type === 'container'
          ? `c-grid (min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`
          : `(min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`,
      styles: queries[breakpoint.value]
    }))

    const queryStyles = {
      styles,
      media: type === 'container' ? undefined : values,
      container: type === 'container' ? values : undefined,
      selector
    }

    const queryStylesString = stylesToString(queryStyles)

    return { queryStylesString }
  })
}
