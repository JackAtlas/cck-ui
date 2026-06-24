import { Properties } from 'csstype'
import { CTheme } from '../../../config-provider'
import { keys } from '../../../utils'
import { SystemPropData } from '../style-props-data'
import { StyleProp } from '../style-props.types'
import { SortMediaQueriesResult, sortMediaQueries } from './sort-media-queries'
import { resolvers } from '../resolvers'

function hasResponsiveStyles(styleProp: StyleProp<unknown>) {
  if (typeof styleProp !== 'object' || styleProp === null) return false

  const breakpoints = Object.keys(styleProp)

  if (breakpoints.length === 1 && breakpoints[0] === 'base') return false

  return true
}

function getBaseValue(value: StyleProp<unknown>) {
  if (typeof value === 'object' && value !== null) {
    if ('base' in value) return value.base

    return undefined
  }

  return value
}

function getBreakpointKeys(value: StyleProp<unknown>) {
  if (typeof value === 'object' && value !== null) {
    return keys(value).filter((key) => key !== 'base')
  }

  return []
}

function getBreakpointValue(value: StyleProp<unknown>, breakpoint: string) {
  if (typeof value === 'object' && value !== null && breakpoint in value) {
    return value[breakpoint as keyof typeof value]
  }

  return value
}

export interface ParseStylePropsOptions {
  data: Record<string, SystemPropData>
  styleProps: Record<string, StyleProp<any>>
  theme: CTheme
}

export interface ParseStylePropsResult {
  hasResponsiveStyles: boolean
  inlineStyles: Properties
  styles: Properties
  media: Record<string, Properties>
}

export function parseStyleProps({
  data,
  styleProps,
  theme
}: ParseStylePropsOptions): SortMediaQueriesResult {
  return sortMediaQueries(
    keys(styleProps).reduce<{
      hasResponsiveStyles: boolean
      inlineStyles: Record<string, unknown>
      styles: Record<string, unknown>
      media: Record<string, Record<string, unknown>>
    }>(
      (acc, styleProp) => {
        if (
          (styleProp as string) === 'hiddenFrom' ||
          (styleProp as string) === 'visibleFrom' ||
          (styleProp as string) === 'sx'
        ) {
          return acc
        }

        const propertyData = data[styleProp]
        const properties = Array.isArray(propertyData.property)
          ? propertyData.property
          : [propertyData.property]
        const baseValue = getBaseValue(styleProps[styleProp])

        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](
              baseValue,
              theme
            )
          })

          return acc
        }

        acc.hasResponsiveStyles = true

        const breakpoints = getBreakpointKeys(styleProps[styleProp])

        properties.forEach((property) => {
          if (baseValue !== null) {
            acc.styles[property] = resolvers[propertyData.type](
              baseValue,
              theme
            )
          }

          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme.breakpoints[breakpoint]})`
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue(styleProps[styleProp], breakpoint),
                theme
              )
            }
          })
        })

        return acc
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  )
}
