import { createVarsResolver, getRadius } from '../../core'
import { BackgroundImageFactory } from './background-image.types'

export const varsResolver = createVarsResolver<BackgroundImageFactory>((_, { radius }) => ({
  root: {
    '--bi-radius': radius === undefined ? undefined : getRadius(radius),
  },
}))
