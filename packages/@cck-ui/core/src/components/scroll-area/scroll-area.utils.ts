import { createVarsResolver, rem } from '../../core'
import { ScrollAreaFactory } from './scroll-area.types'

export const varsResolver = createVarsResolver<ScrollAreaFactory>(
  (_, { scrollbarSize, overscrollBehavior, scrollbars }) => {
    let overrideOverscrollBehavior = overscrollBehavior

    if (overscrollBehavior && scrollbars) {
      if (scrollbars === 'x') {
        overrideOverscrollBehavior = `${overscrollBehavior} auto`
      } else if (scrollbars === 'y') {
        overrideOverscrollBehavior = `auto ${overscrollBehavior}`
      }
    }

    return {
      root: {
        '--scrollarea-scrollbar-size': rem(scrollbarSize),
        '--scrollarea-over-scroll-behavior': overrideOverscrollBehavior,
      },
    }
  }
)
