import { createVarsResolver, getSpacing } from '../../core'
import { OverflowListFactory } from './overflow-list.types'

export const varsResolver = createVarsResolver<OverflowListFactory>((_, { gap }) => ({
  root: {
    '--ol-gap': getSpacing(gap),
  },
}))
