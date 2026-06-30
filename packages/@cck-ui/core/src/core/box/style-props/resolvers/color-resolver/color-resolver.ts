import { CTheme, parseThemeColor } from '../../../../config-provider'

export function colorResolver(color: unknown, theme: CTheme) {
  const parsedColor = parseThemeColor({ color, theme })

  if (parsedColor.color === 'dimmed') {
    return 'var(--c-color-dimmed)'
  }

  if (parsedColor.color === 'bright') {
    return 'var(--c-color-bright)'
  }

  return parsedColor.variable
    ? `var(${parsedColor.variable})`
    : parsedColor.color
}

export function textColorResolver(color: unknown, theme: CTheme) {
  const parsedColor = parseThemeColor({ color, theme })

  if (parsedColor.isThemeColor && parsedColor.shade === undefined) {
    return `var(--c-color-${parsedColor.color}-text)`
  }

  return colorResolver(color, theme)
}
