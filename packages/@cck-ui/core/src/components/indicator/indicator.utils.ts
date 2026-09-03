import { createVarsResolver, getRadius, getThemeColor, rem } from '../../core'
import { getContrastColor } from '../../core/config-provider/color-functions/get-contrast-color/get-contrast-color'
import { getPositionVariables } from './get-position-variables/get-position-variables'
import { IndicatorFactory } from './indicator.types'

export const varsResolver = createVarsResolver<IndicatorFactory>(
  (theme, { color, position, offset, size, radius, zIndex, autoContrast }) => {
    const ac = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

    return {
      root: {
        '--indicator-color': color ? getThemeColor(color, theme) : undefined,
        '--indicator-radius': radius === undefined ? undefined : getRadius(radius),
        '--indicator-size': rem(size),
        '--indicator-text-color': ac
          ? getContrastColor({ color, theme, autoContrast: ac })
          : undefined,
        '--indicator-z-index': zIndex?.toString(),
        ...getPositionVariables(position, offset),
      },
    }
  }
)
