import {
  createVarsResolver,
  getRadius,
  getThemeColor,
  parseThemeColor,
  rem,
  rgba,
} from '../../core'
import { BlockquoteFactory } from './blockquote.types'

export const varsResolver = createVarsResolver<BlockquoteFactory>(
  (theme, { color, iconSize, radius, textWrap }) => {
    const darkParsed = parseThemeColor({
      color: color || theme.primaryColor,
      theme,
      colorScheme: 'dark',
    })

    const lightParsed = parseThemeColor({
      color: color || theme.primaryColor,
      theme,
      colorScheme: 'light',
    })

    return {
      root: {
        '--bq-bd': getThemeColor(color, theme),
        '--bq-bg-dark': rgba(darkParsed.value, 0.06),
        '--bq-bg-light': rgba(lightParsed.value, 0.07),
        '--bq-icon-size': rem(iconSize),
        '--bq-radius': getRadius(radius),
        '--bq-text-wrap': textWrap,
      },
    }
  }
)
