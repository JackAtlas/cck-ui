import { createVarsResolver, rem } from '../../../core'
import { ActionIconGroupFactory } from './action-icon-group.types'

export const varsResolver = createVarsResolver<ActionIconGroupFactory>((_, { borderWidth }) => ({
  group: {
    '--ai-border-width': rem(borderWidth),
  },
}))
