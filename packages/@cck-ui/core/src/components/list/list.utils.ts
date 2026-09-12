import { createVarsResolver, getFontSize, getLineHeight, getSpacing } from '../../core'
import { ListFactory } from './list.types'

export const varsResolver = createVarsResolver<ListFactory>((_, { size, spacing }) => ({
  root: {
    '--list-fz': getFontSize(size),
    '--list-lh': getLineHeight(size),
    '--list-spacing': getSpacing(spacing),
  },
}))
