import { createVarsResolver } from '../../core'
import { AspectRatioFactory } from './aspect-ratio.types'

export const varsResolver = createVarsResolver<AspectRatioFactory>((_, { ratio }) => ({
  root: {
    '--ar-ratio': ratio?.toString(),
  },
}))
