import { alpha, darken, getPrimaryShade } from '../color-functions'
import { CColor, CTheme } from '../theme.types'

interface GetColorVariablesInput {
  theme: CTheme
  color: CColor
  colorScheme: 'light' | 'dark'
  name?: string
  withColorValues?: boolean
}

export function getCSSColorVariables({
  theme,
  color,
  colorScheme,
  name = color,
  withColorValues = true,
}: GetColorVariablesInput) {
  if (!theme.colors[color]) {
    return {}
  }

  if (colorScheme === 'light') {
    const primaryShade = getPrimaryShade(theme, 'light')

    const dynamicVariables = {
      [`--c-color-${name}-text`]: `var(--c-color-${name}-filled)`,
      [`--c-color-${name}-filled`]: `var(--c-color-${name}-${primaryShade})`,
      [`--c-color-${name}-filled-hover`]: `var(--c-color-${name}-${primaryShade === 9 ? 8 : primaryShade + 1})`,
      [`--c-color-${name}-light`]: `var(--c-color-${name}-${1})`,
      [`--c-color-${name}-light-hover`]: `var(--c-color-${name}-${2})`,
      [`--c-color-${name}-light-color`]: `var(--c-color-${name}-${9})`,
      [`--c-color-${name}-outline`]: `var(--c-color-${name}-${primaryShade})`,
      [`--c-color-${name}-outline-hover`]: alpha(theme.colors[color][primaryShade], 0.05),
    }

    if (!withColorValues) {
      return dynamicVariables
    }

    return {
      [`--c-color-${name}-0`]: theme.colors[color][0],
      [`--c-color-${name}-1`]: theme.colors[color][1],
      [`--c-color-${name}-2`]: theme.colors[color][2],
      [`--c-color-${name}-3`]: theme.colors[color][3],
      [`--c-color-${name}-4`]: theme.colors[color][4],
      [`--c-color-${name}-5`]: theme.colors[color][5],
      [`--c-color-${name}-6`]: theme.colors[color][6],
      [`--c-color-${name}-7`]: theme.colors[color][7],
      [`--c-color-${name}-8`]: theme.colors[color][8],
      [`--c-color-${name}-9`]: theme.colors[color][9],
      ...dynamicVariables,
    }
  }

  const primaryShade = getPrimaryShade(theme, 'dark')
  const dynamicVariables = {
    [`--c-color-${name}-text`]: `var(--c-color-${name}-4)`,
    [`--c-color-${name}-filled`]: `var(--c-color-${name}-${primaryShade})`,
    [`--c-color-${name}-filled-hover`]: `var(--c-color-${name}-${primaryShade === 9 ? 8 : primaryShade + 1})`,
    [`--c-color-${name}-light`]: darken(theme.colors[color][9], 0.5),
    [`--c-color-${name}-light-hover`]: darken(theme.colors[color][9], 0.3),
    [`--c-color-${name}-light-color`]: `var(--c-color-${name}-0)`,
    [`--c-color-${name}-outline`]: `var(--c-color-${name}-${(Math.max(primaryShade - 4), 0)})`,
    [`--c-color-${name}-outline-hover`]: alpha(
      theme.colors[color][Math.max(primaryShade - 4, 0)],
      0.05
    ),
  }

  if (!withColorValues) {
    return dynamicVariables
  }

  return {
    [`--c-color-${name}-0`]: theme.colors[color][0],
    [`--c-color-${name}-1`]: theme.colors[color][1],
    [`--c-color-${name}-2`]: theme.colors[color][2],
    [`--c-color-${name}-3`]: theme.colors[color][3],
    [`--c-color-${name}-4`]: theme.colors[color][4],
    [`--c-color-${name}-5`]: theme.colors[color][5],
    [`--c-color-${name}-6`]: theme.colors[color][6],
    [`--c-color-${name}-7`]: theme.colors[color][7],
    [`--c-color-${name}-8`]: theme.colors[color][8],
    [`--c-color-${name}-9`]: theme.colors[color][9],
    ...dynamicVariables,
  }
}
