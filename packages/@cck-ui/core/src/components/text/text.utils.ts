import { createVarsResolver, getFontSize, getGradient, getLineHeight } from '../../core'
import { TextFactory } from './text.types'

export const varsResolver = createVarsResolver<TextFactory>(
  (theme, { gradient, lineClamp, size, textWrap, variant }) => ({
    root: {
      '--text-fz': getFontSize(size),
      '--text-lh': getLineHeight(size),
      '--text-gradient': variant === 'gradient' ? getGradient(gradient, theme) : undefined,
      '--text-line-clamp': typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
      '--text-text-wrap': textWrap,
    },
  })
)
