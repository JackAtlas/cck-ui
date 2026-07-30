import { createVarsResolver, rem } from '../../../core'
import { ButtonGroupFactory } from './button-group.types'

export const varsResolver = createVarsResolver<ButtonGroupFactory>((_, { borderWidth }) => ({
  group: { '--button-border-width': rem(borderWidth) },
}))
