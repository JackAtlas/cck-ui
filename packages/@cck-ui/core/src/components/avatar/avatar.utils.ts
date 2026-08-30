import { createVarsResolver, getRadius, getSize } from '../../core'
import { AvatarFactory } from './avatar.types'
import { getInitialsColor } from './get-initials-color/get-initials-color'

export const varsResolver = createVarsResolver<AvatarFactory>(
  (
    theme,
    { size, radius, variant, gradient, color, autoContrast, name, allowedInitialsColors }
  ) => {
    const _color =
      color === 'initials' && typeof name === 'string'
        ? getInitialsColor(name, allowedInitialsColors)
        : color

    const colors = theme.variantColorResolver({
      color: _color || 'gray',
      theme,
      gradient,
      variant: variant || 'light',
      autoContrast,
    })

    return {
      root: {
        '--avatar-bd': _color || variant ? colors.border : undefined,
        '--avatar-bg': _color || variant ? colors.background : undefined,
        '--avatar-color': _color || variant ? colors.color : undefined,
        '--avatar-radius': radius === undefined ? undefined : getRadius(radius),
        '--avatar-size': getSize(size, 'avatar-size'),
      },
    }
  }
)
