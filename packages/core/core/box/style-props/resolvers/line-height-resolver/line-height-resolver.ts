import { CTheme } from '../../../../config-provider'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export function lineHeightResolver(value: unknown, theme: CTheme) {
  if (typeof value === 'string' && value in theme.lineHeights) {
    return `var(--c-line-height-${value})`
  }

  if (typeof value === 'string' && headings.includes(value)) {
    return `var(--c-${value}-line-height)`
  }

  return value
}
