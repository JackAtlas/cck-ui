import { createVarsResolver, getRadius } from '../../core'
import { AlertFactory } from './alert.types'

export const varsResolver = createVarsResolver<AlertFactory>(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || 'light',
      autoContrast,
    })
    return {
      root: {
        '--alert-radius': radius === undefined ? undefined : getRadius(radius),
        '--alert-bg': color || variant ? colors.background : undefined,
        '--alert-color': colors.color,
        '--alert-bd': color || variant ? colors.border : undefined,
      },
    }
  }
)
