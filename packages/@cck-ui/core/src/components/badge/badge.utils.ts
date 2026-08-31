import { createVarsResolver, getRadius, getSize, getThemeColor } from '../../core'
import { BadgeFactory } from './badge.types'

export const varsResolver = createVarsResolver<BadgeFactory>(
  (theme, { radius, color, gradient, variant, size, autoContrast, circle }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'default',
      autoContrast,
    })
    return {
      root: {
        '--badge-bd': color || variant ? colors.border : undefined,
        '--badge-bg': color || variant ? colors.background : undefined,
        '--badge-color': color || variant ? colors.color : undefined,
        '--badge-dot-color': variant === 'dot' ? getThemeColor(color, theme) : undefined,
        '--badge-fz': getSize(size, 'badge-fz'),
        '--badge-height': getSize(size, 'badge-height'),
        '--badge-padding-x': getSize(size, 'badge-padding-x'),
        '--badge-radius': circle || radius === undefined ? undefined : getRadius(radius),
      },
    }
  }
)
