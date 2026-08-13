import { createVarsResolver, getRadius, rem } from '../../core'
import { SkeletonFactory } from './skeleton.types'

export const varsResolver = createVarsResolver<SkeletonFactory>(
  (_, { width, height, radius, circle }) => ({
    root: {
      '--skeleton-height': rem(height),
      '--skeleton-radius': circle ? '1000px' : radius === undefined ? undefined : getRadius(radius),
      '--skeleton-width': circle ? rem(height) : rem(width),
    },
  })
)
