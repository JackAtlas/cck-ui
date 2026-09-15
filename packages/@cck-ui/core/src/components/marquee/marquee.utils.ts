import { createVarsResolver, getSpacing } from '../../core'
import { MarqueeFactory } from './marquee.types'

export const varsResolver = createVarsResolver<MarqueeFactory>(
  (_, { duration, gap, repeat, fadeEdgeColor, fadeEdgeSize }) => ({
    root: {
      '--marquee-duration': `${duration}ms`,
      '--marquee-fade-color': fadeEdgeColor,
      '--marquee-fade-size': fadeEdgeSize,
      '--marquee-gap': getSpacing(gap),
      '--marquee-repeat': (repeat ?? 4).toString(),
    },
  })
)
