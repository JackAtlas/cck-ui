import { createVarsResolver, getFontSize, getRadius, getSize } from '../../../core'
import { ActionIconGroupSectionFactory } from './action-icon-group-section.types'

export const varsResolver = createVarsResolver<ActionIconGroupSectionFactory>(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'default',
      autoContrast,
    })
    return {
      groupSection: {
        '--section-bd': color || variant ? colors.border : undefined,
        '--section-bg': color || variant ? colors.background : undefined,
        '--section-color': colors.color,
        '--section-fz': getFontSize(size),
        '--section-height': getSize(size, 'section-height'),
        '--section-padding-x': getSize(size, 'section-padding-x'),
        '--section-radius': radius === undefined ? undefined : getRadius(radius),
      },
    }
  }
)
