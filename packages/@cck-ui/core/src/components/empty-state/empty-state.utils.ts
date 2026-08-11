import { createVarsResolver, getSize } from '../../core'
import { EmptyStateFactory } from './empty-state.types'

export const varsResolver = createVarsResolver<EmptyStateFactory>(
  (theme, { size, variant, color }) => {
    const colors = variant
      ? theme.variantColorResolver({ color: color || theme.primaryColor, theme, variant })
      : null

    return {
      root: {
        '--empty-state-description-fz': getSize(size, 'empty-state-description-fz'),
        '--empty-state-gap': getSize(size, 'empty-state-gap'),
        '--empty-state-indicator-bg': colors ? colors.background : undefined,
        '--empty-state-indicator-color': colors ? colors.color : undefined,
        '--empty-state-indicator-size': getSize(size, 'empty-state-indicator-size'),
        '--empty-state-title-fz': getSize(size, 'empty-state-title-fz'),
      },
    }
  }
)
