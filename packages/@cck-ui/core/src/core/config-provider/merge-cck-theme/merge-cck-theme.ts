import { merge } from 'es-toolkit'
import type { CTheme, CThemeOverride } from '../theme.types'

export const INVALID_PRIMARY_COLOR_ERROR =
  '[@cck-ui/core] ConfigProvider: Invalid theme.primaryColor, it accepts only key of theme.colors'

export const INVALID_PRIMARY_SHADE_ERROR =
  '[@cck-ui/core] ConfigProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }'

function isValidPrimaryShade(shade: number) {
  if (shade < 0 || shade > 9) {
    return false
  }

  return parseInt(shade.toString(), 10) === shade
}

export function validateCckTheme(theme: CTheme): asserts theme is CTheme {
  if (!(theme.primaryColor in theme.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR)
  }

  if (typeof theme.primaryShade === 'object') {
    if (
      !isValidPrimaryShade(theme.primaryShade.dark) ||
      !isValidPrimaryShade(theme.primaryShade.light)
    ) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR)
    }
  }

  if (typeof theme.primaryShade === 'number' && !isValidPrimaryShade(theme.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR)
  }
}

export function mergeCckTheme(currentTheme: CTheme, themeOverride?: CThemeOverride) {
  if (!themeOverride) {
    validateCckTheme(currentTheme)
    return currentTheme
  }

  const result = merge(currentTheme, themeOverride)

  if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
    result.headings = { ...result.headings, fontFamily: themeOverride.fontFamily }
  }

  validateCckTheme(result)
  return result
}
