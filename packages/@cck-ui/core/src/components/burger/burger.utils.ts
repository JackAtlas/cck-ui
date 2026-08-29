import { createVarsResolver, getSize, getThemeColor, rem } from '../../core'
import { BurgerFactory } from './burger.types'

export const varsResolver = createVarsResolver<BurgerFactory>(
  (theme, { color, size, lineSize, transitionDuration, transitionTimingFunction }) => ({
    root: {
      '--burger-color': color ? getThemeColor(color, theme) : undefined,
      '--burger-line-size': lineSize ? rem(lineSize) : undefined,
      '--burger-size': getSize(size, 'burger-size'),
      '--burger-transition-duration':
        transitionDuration === undefined ? undefined : `${transitionDuration}ms`,
      '--burger-transition-timing-function': transitionTimingFunction,
    },
  })
)
