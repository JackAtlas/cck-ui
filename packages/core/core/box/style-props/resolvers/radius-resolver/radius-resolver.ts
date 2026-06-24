import { CTheme } from '../../../../config-provider'
import { rem } from '../../../../utils'

export function radiusResolver(value: unknown, theme: CTheme) {
  if (typeof value === 'string' && value in theme.radius) {
    return `var(--c-radius-${value})`
  }

  if (typeof value === 'number') {
    return rem(value)
  }

  if (typeof value === 'string') {
    return rem(value)
  }

  return value
}
