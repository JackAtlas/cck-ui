import { createVarsResolver, getThemeColor, rem } from '../../core'
import { SplitterFactory } from './splitter.types'

export const varsResolver = createVarsResolver<SplitterFactory>(
  (theme, { lineSize, handleColor }) => ({
    root: {
      '--splitter-line-size': rem(lineSize),
      '--splitter-handle-color': handleColor ? getThemeColor(handleColor, theme) : undefined,
    },
  })
)
