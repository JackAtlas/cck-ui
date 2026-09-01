import { createVarsResolver, getSpacing } from '../../core'
import { CardFactory } from './card.types'

export const varsResolver = createVarsResolver<CardFactory>((_, { padding }) => ({
  root: {
    '--card-padding': getSpacing(padding),
  },
}))
