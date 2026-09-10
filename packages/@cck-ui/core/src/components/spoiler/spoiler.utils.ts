import { createVarsResolver } from '../../core'
import { SpoilerFactory } from './spoiler.types'

export const varsResolver = createVarsResolver<SpoilerFactory>((_, { transitionDuration }) => ({
  root: {
    '--spoiler-transition-duration':
      transitionDuration !== undefined ? `${transitionDuration}ms` : undefined,
  },
}))
