import { DEFAULT_COLORS } from './default-colors'
import { CTheme } from './theme.types'

export const DEFAULT_THEME: CTheme = {
  scale: 1,
  focusRing: 'auto',
  white: '#fff',
  black: '#000',
  colors: DEFAULT_COLORS,
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em'
  }
}
