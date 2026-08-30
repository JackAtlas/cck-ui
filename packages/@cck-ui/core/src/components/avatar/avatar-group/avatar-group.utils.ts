import { createVarsResolver, getSpacing } from '../../../core'
import { AvatarGroupFactory } from './avatar-group.types'

export const varsResolver = createVarsResolver<AvatarGroupFactory>((_, { spacing }) => ({
  group: {
    '--ag-spacing': getSpacing(spacing),
  },
}))
