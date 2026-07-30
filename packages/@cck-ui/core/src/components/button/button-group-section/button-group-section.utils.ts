import { createVarsResolver, getFontSize, getRadius, getSize } from '../../../core'
import { ButtonGroupSectionFactory } from './button-group-section.types'

export const varsResolver = createVarsResolver<ButtonGroupSectionFactory>(
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
        '--section-height': getSize(size, 'section-height'),
        '--section-padding-x': getSize(size, 'section-padding-x'),
        '--section-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--section-radius': radius === undefined ? undefined : getRadius(radius),
        '--section-bg': color || variant ? colors.background : undefined,
        '--section-color': colors.color,
        '--section-bd': color || variant ? colors.border : undefined,
      },
    }
  }
)
