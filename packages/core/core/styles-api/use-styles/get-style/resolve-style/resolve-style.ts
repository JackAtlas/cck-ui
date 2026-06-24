import { CStyleProp, CTheme } from '@cck-ui/core'
import { Properties } from 'csstype'

interface ResolveStyleInput {
  style: CStyleProp | undefined
  theme: CTheme
}

export function resolveStyle({ style, theme }: ResolveStyleInput): Properties {
  if (Array.isArray(style)) {
    return style.reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    )
  }

  if (typeof style === 'function') {
    return style(theme)
  }

  if (style === undefined) {
    return {}
  }

  return style
}
