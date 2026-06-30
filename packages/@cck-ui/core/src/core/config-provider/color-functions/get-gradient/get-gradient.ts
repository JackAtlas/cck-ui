import { CGradient, CTheme } from '../../'
import { getThemeColor } from '../get-theme-color/get-theme-color'

export function getGradient(gradient: CGradient | undefined, theme: CTheme) {
  const merged = {
    from: gradient?.from || theme.defaultGradient.from,
    to: gradient?.to || theme.defaultGradient.to,
    deg: gradient?.deg || theme.defaultGradient.deg,
  }

  const fromColor = getThemeColor(merged.from, theme)
  const toColor = getThemeColor(merged.to, theme)

  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`
}
