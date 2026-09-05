import { createVarsResolver, getThemeColor } from '../../core'
import { CodeFactory } from './code.types'

export const varsResolver = createVarsResolver<CodeFactory>((theme, { color }) => ({
  root: {
    '--code-bg': color ? getThemeColor(color, theme) : undefined,
  },
}))
