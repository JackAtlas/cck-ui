import { SimpleGridProps } from 'cck-ui'
import { computed } from 'vue'
import {
  CBreakpoint,
  CTheme,
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  getSpacing,
  isNumberLike,
  keys,
  px,
  rem,
  stylesToString
} from '../../../core'

interface SimpleGridVariablesProps extends SimpleGridProps {
  selector: string
}

function getMinColWidthValue(
  value: string | number | undefined
): string | undefined {
  if (value === undefined) return undefined

  if (isNumberLike(value)) return rem(value)

  return value as string
}

function getBreakpoints(values: unknown) {
  if (typeof values === 'object' && values !== null) {
    return keys(values)
  }

  return []
}

function sortBreakpoints(breakpoints: string[]) {
  return breakpoints.sort((a, b) => (px(a) as number) - (px(b) as number))
}

function getUniqueBreakpoints({
  cols,
  minColWidth,
  spacing,
  verticalSpacing
}: SimpleGridProps) {
  const breakpoints = Array.from(
    new Set([
      ...getBreakpoints(spacing),
      ...getBreakpoints(verticalSpacing),
      ...(minColWidth !== undefined ? [] : getBreakpoints(cols))
    ])
  )

  return sortBreakpoints(breakpoints)
}

function getMediaStyle(
  { cols, minColWidth, spacing, verticalSpacing }: SimpleGridVariablesProps,
  theme: CTheme
) {
  const _verticalSpacing =
    verticalSpacing === undefined ? spacing : verticalSpacing
  const useAutoColumns = minColWidth !== undefined

  const queries = keys(theme.breakpoints).reduce<
    Record<string, Record<string, any>>
  >((acc, breakpoint) => {
    if (!acc[breakpoint]) {
      acc[breakpoint] = {}
    }

    if (typeof spacing === 'object' && spacing[breakpoint] !== undefined) {
      acc[breakpoint]['--sg-spacing-x'] = getSpacing(spacing[breakpoint])
    }

    if (
      typeof _verticalSpacing === 'object' &&
      _verticalSpacing[breakpoint] !== undefined
    ) {
      acc[breakpoint]['--sg-spacing-y'] = getSpacing(
        _verticalSpacing[breakpoint]
      )
    }

    if (
      !useAutoColumns &&
      typeof cols === 'object' &&
      cols[breakpoint] !== undefined
    ) {
      acc[breakpoint]['--sg-cols'] = cols[breakpoint]
    }

    return acc
  }, {})

  const sortedBreakpoints = getSortedBreakpoints(
    keys(queries),
    theme.breakpoints
  ).filter((breakpoint) => keys(queries[breakpoint.value]).length > 0)

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as CBreakpoint]})`,
    styles: queries[breakpoint.value]
  }))

  return media
}

function getContainerStyle({
  cols,
  minColWidth,
  spacing,
  verticalSpacing
}: SimpleGridProps) {
  const _verticalSpacing =
    verticalSpacing === undefined ? spacing : verticalSpacing
  const useAutoColumns = minColWidth !== undefined

  const uniqueBreakpoints = getUniqueBreakpoints({
    cols,
    minColWidth,
    spacing,
    verticalSpacing
  })

  const queries = uniqueBreakpoints.reduce<Record<string, Record<string, any>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {}
      }

      if (typeof spacing === 'object' && spacing[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-spacing-x'] = getSpacing(spacing[breakpoint])
      }

      if (
        typeof _verticalSpacing === 'object' &&
        _verticalSpacing[breakpoint] !== undefined
      ) {
        acc[breakpoint]['--sg-spacing-y'] = getSpacing(
          _verticalSpacing[breakpoint]
        )
      }

      if (
        !useAutoColumns &&
        typeof cols === 'object' &&
        cols[breakpoint] !== undefined
      ) {
        acc[breakpoint]['--sg-cols'] = cols[breakpoint]
      }

      return acc
    },
    {}
  )

  const container = uniqueBreakpoints.map((breakpoint) => ({
    query: `c-simple-grid (min-width: ${breakpoint})`,
    styles: queries[breakpoint]
  }))

  return container
}

export function useSimpleGridStyle(
  props: SimpleGridVariablesProps,
  theme: CTheme
) {
  return computed(() => {
    const {
      autoFlow,
      autoRows,
      cols,
      minColWidth,
      selector,
      spacing,
      verticalSpacing
    } = props
    const _verticalSpacing =
      verticalSpacing === undefined ? spacing : verticalSpacing
    const useAutoColumns = minColWidth !== undefined

    const autoColsAttr = useAutoColumns ? autoFlow || 'auto-fill' : undefined
    const attrs: Record<string, string | undefined> = {
      'data-auto-cols': autoColsAttr
    }

    const baseStyles: Record<string, string | undefined> = filterProps({
      '--sg-spacing-x': getSpacing(getBaseValue(spacing)),
      '--sg-spacing-y': getSpacing(getBaseValue(_verticalSpacing)),
      '--sg-auto-rows': autoRows,
      ...(useAutoColumns
        ? { '--sg-min-col-width': getMinColWidthValue(minColWidth) }
        : { '--sg-cols': getBaseValue(cols)?.toString() })
    })

    const media = getMediaStyle(props, theme)
    const container = getContainerStyle(props)

    const queryStylesString = stylesToString({
      styles: baseStyles,
      media,
      container,
      selector
    })

    return { attrs, queryStylesString }
  })
}
