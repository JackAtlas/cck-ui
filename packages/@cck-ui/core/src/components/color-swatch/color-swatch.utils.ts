import { createVarsResolver, getRadius, rem } from '../../core'
import { ColorSwatchFactory } from './color-swatch.types'

export const varsResolver = createVarsResolver<ColorSwatchFactory>((_, { radius, size }) => ({
  root: {
    '--cs-radius': radius === undefined ? undefined : getRadius(radius),
    '--cs-size': rem(size),
  },
}))
