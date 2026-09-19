import { createVarsResolver, getThemeColor, rem } from '../../core'
import { ScrollerFactory } from './scroller.types'

export const varsResolver = createVarsResolver<ScrollerFactory>(
  (theme, { controlSize, edgeGradientColor }) => ({
    root: {
      '--scroller-background-color': edgeGradientColor
        ? getThemeColor(edgeGradientColor, theme)
        : undefined,
      '--scroller-control-size': rem(controlSize),
    },
  })
)
