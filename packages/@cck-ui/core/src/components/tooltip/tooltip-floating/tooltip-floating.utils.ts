import { createVarsResolver, getRadius, getThemeColor } from '../../../core'
import { TooltipFloatingFactory } from './tooltip-floating.types'

export const varsResolver = createVarsResolver<TooltipFloatingFactory>(
  (theme, { radius, color }) => ({
    tooltip: {
      '--tooltip-bg': color ? getThemeColor(color, theme) : undefined,
      '--tooltip-color': color ? 'var(--c-color-white)' : undefined,
      '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
    },
  })
)
