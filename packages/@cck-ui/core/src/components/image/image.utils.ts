import { createVarsResolver, getRadius } from '../../core'
import { ImageFactory } from './image.types'

export const varsResolver = createVarsResolver<ImageFactory>((_, { radius, fit }) => ({
  root: {
    '--image-object-fit': fit,
    '--image-radius': radius === undefined ? undefined : getRadius(radius),
  },
}))
