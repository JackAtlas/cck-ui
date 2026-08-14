import { createVarsResolver, getRadius, getShadow } from '../../core'
import { PaperFactory } from './paper.types'

export const varsResolver = createVarsResolver<PaperFactory>((_, { radius, shadow }) => ({
  root: {
    '--paper-radius': radius === undefined ? undefined : getRadius(radius),
    '--paper-shadow': getShadow(shadow),
  },
}))
