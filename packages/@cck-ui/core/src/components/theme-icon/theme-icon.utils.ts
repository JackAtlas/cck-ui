import { createVarsResolver, getRadius, getSize } from '../../core'
import { ThemeIconFactory } from './theme-icon.types'

export const varsResolver = createVarsResolver<ThemeIconFactory>(
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
        '--ti-bd': color || variant ? colors.border : undefined,
        '--ti-bg': color || variant ? colors.background : undefined,
        '--ti-color': color || variant ? colors.color : undefined,
        '--ti-radius': radius === undefined ? undefined : getRadius(radius),
        '--ti-size': getSize(size, 'ti-size'),
      },
    }
  }
)
