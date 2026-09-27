import { createVarsResolver, getRadius, rem, rgba } from '../../core'
import { OverlayFactory } from './overlay.types'

export const varsResolver = createVarsResolver<OverlayFactory>(
  (_, { gradient, color, backgroundOpacity, blur, radius, zIndex }) => ({
    root: {
      '--overlay-bg':
        gradient ||
        ((color !== undefined || backgroundOpacity !== undefined) &&
          rgba(color || '#000', backgroundOpacity ?? 0.6)) ||
        undefined,
      '--overlay-filter': blur ? `blur(${rem(blur)})` : undefined,
      '--overlay-radius': radius === undefined ? undefined : getRadius(radius),
      '--overlay-z-index': zIndex?.toString(),
    },
  })
)
