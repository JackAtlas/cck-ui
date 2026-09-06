import { createVarsResolver } from '../../core'
import { getMarkColor } from './get-mark-color/get-mark-color'
import { MarkFactory } from './mark.types'

export const varsResolver = createVarsResolver<MarkFactory>((theme, { color }) => ({
  root: {
    '--mark-bg-dark': getMarkColor({ color, theme, defaultShade: 5 }),
    '--mark-bg-light': getMarkColor({ color, theme, defaultShade: 2 }),
  },
}))
