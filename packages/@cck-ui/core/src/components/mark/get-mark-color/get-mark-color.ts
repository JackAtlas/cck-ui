import { CColor, CTheme, parseThemeColor } from '../../../core'

interface GetMarkColorInput {
  color: CColor | string | undefined
  theme: CTheme
  defaultShade: number
}

export function getMarkColor({ color, theme, defaultShade }: GetMarkColorInput) {
  const parsed = parseThemeColor({ color, theme })

  if (!parsed.isThemeColor) {
    return color
  }

  if (parsed.shade === undefined) {
    return `var(--c-color-${parsed.color}-${defaultShade})`
  }

  return `var(${parsed.variable})`
}
