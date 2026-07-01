import type { CColor, CColorScheme, CTheme } from '../../theme.types'
import { isVirtualColor } from '../../cck-css-variables/virtual-color/virtual-color'
import { getPrimaryShade } from '../get-primary-shade/get-primary-shade'
import { parseThemeColor } from '../parse-theme-color/parse-theme-color'

interface GetContrastColorInput {
  color: string | null | undefined
  theme: CTheme
  autoContrast?: boolean | undefined | null
  colorScheme?: CColorScheme
}

export function getContrastColor({
  color,
  theme,
  autoContrast,
  colorScheme,
}: GetContrastColorInput) {
  const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

  if (!_autoContrast) {
    return `var(--c-color-white)`
  }

  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme, colorScheme })
  return parsed.isLight ? 'var(--c-color-black)' : `var(--c-color-white)`
}

export function getVirtualColorContrast(
  value: { light: CColor; dark: CColor },
  theme: CTheme,
  colorScheme: 'light' | 'dark'
) {
  return getContrastColor({
    color: colorScheme === 'dark' ? value.dark : value.light,
    theme,
    colorScheme,
    autoContrast: true,
  })
}

export function getPrimaryContrastColor(theme: CTheme, colorScheme: 'light' | 'dark') {
  const primaryColor = theme.colors[theme.primaryColor]

  if (isVirtualColor(primaryColor)) {
    if (!theme.autoContrast) {
      return 'var(--c-color-white)'
    }

    return getVirtualColorContrast(primaryColor, theme, colorScheme)
  }

  return getContrastColor({
    color: primaryColor[getPrimaryShade(theme, colorScheme)],
    theme,
    autoContrast: null,
  })
}
