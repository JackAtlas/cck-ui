import { deepMerge } from '../../utils'
import { CThemeOverride } from '../theme.types'

export function mergeThemeOverrides(...overrides: CThemeOverride[]): CThemeOverride {
  return overrides.reduce((acc, override) => deepMerge(acc, override), {})
}
