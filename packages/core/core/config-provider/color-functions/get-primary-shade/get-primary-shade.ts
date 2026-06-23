import { CColorScheme, CTheme } from '../../theme.types'

export function getPrimaryShade(theme: CTheme, colorScheme: CColorScheme) {
  if (typeof theme.primaryShade === 'number') {
    return theme.primaryShade
  }

  if (colorScheme === 'dark') {
    return theme.primaryShade.dark
  }

  return theme.primaryShade.light
}
