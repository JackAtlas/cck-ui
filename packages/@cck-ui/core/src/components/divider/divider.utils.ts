import { createVarsResolver, getSize, getThemeColor } from '../../core'
import { DividerFactory } from './divider.types'

export const varsResolver = createVarsResolver<DividerFactory>(
  (theme, { color, variant, size }) => ({
    root: {
      '--divider-border-style': variant,
      '--divider-color': color ? getThemeColor(color, theme) : undefined,
      '--divider-size': getSize(size, 'divider-size'),
    },
  })
)
