import type { CColorScheme } from '../theme.types'

export function isCckColorScheme(value: unknown): value is CColorScheme {
  return value === 'auto' || value === 'dark' || value === 'light'
}
