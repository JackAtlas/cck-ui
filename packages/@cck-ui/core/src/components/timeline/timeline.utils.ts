import { createVarsResolver, getRadius, getThemeColor, rem } from '../../core'
import { getContrastColor } from '../../core/config-provider/color-functions/get-contrast-color/get-contrast-color'
import { TimelineFactory } from './timeline.types'

export const varsResolver = createVarsResolver<TimelineFactory>(
  (theme, { bulletSize, lineWidth, radius, color, autoContrast }) => {
    const ac = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

    return {
      root: {
        '--tl-bullet-size': rem(bulletSize),
        '--tl-color': color ? getThemeColor(color, theme) : undefined,
        '--tl-icon-color': ac ? getContrastColor({ color, theme, autoContrast }) : undefined,
        '--tl-line-width': rem(lineWidth),
        '--tl-radius': radius === undefined ? undefined : getRadius(radius),
      },
    }
  }
)
