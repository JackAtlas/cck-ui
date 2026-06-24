import { CTheme, rem } from '@cck-ui/core'

export function spacingResolver(value: unknown, theme: CTheme) {
  if (typeof value === 'number') {
    return rem(value)
  }

  if (typeof value === 'string') {
    const mod = value.replace('-', '')

    if (!(mod in theme.spacing)) {
      return rem(value)
    }

    const variable = `--c-spacing-${mod}`
    return value.startsWith('-')
      ? `calc(var(${variable}) * -1)`
      : `var(${variable})`
  }

  return value
}
