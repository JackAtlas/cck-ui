import { createVarsResolver, getRadius, getSize } from '../../core'
import { ActionIconFactory } from './action-icon.types'

export const varsResolver = createVarsResolver<ActionIconFactory>(
  (theme, { size, radius, variant, gradient, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'default',
      autoContrast,
    })
    return {
      root: {
        '--ai-bd': color || variant ? colors.border : undefined,
        '--ai-bg': color || variant ? colors.background : undefined,
        '--ai-color': colors.color,
        '--ai-hover': color || variant ? colors.hover : undefined,
        '--ai-hover-color': color || variant ? colors.hoverColor : undefined,
        '--ai-radius': radius === undefined ? undefined : getRadius(radius),
        '--ai-size': getSize(size, 'ai-size'),
      },
    }
  }
)
