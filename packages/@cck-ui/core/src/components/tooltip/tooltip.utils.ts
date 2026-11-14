import { createVarsResolver, getRadius } from '../../core'
import { TooltipFactory } from './tooltip.types'

export const varsResolver = createVarsResolver<TooltipFactory>(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      theme,
      color: color || theme.primaryColor,
      autoContrast,
      variant: variant || 'default',
    })

    return {
      tooltip: {
        '--tooltip-bg': color ? colors.background : undefined,
        '--tooltip-color': color ? colors.color : undefined,
        '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
      },
    }
  }
)
