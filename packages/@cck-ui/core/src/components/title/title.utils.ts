import { createVarsResolver } from '../../core'
import { getTitleSize } from './get-title-size/get-title-size'
import { TitleFactory } from './title.types'

export const varsResolver = createVarsResolver<TitleFactory>(
  (_, { order, size, lineClamp, textWrap }) => {
    const sizeVariables = getTitleSize(order || 1, size)
    return {
      root: {
        '--title-fw': sizeVariables.fontWeight,
        '--title-fz': sizeVariables.fontSize,
        '--title-lh': sizeVariables.lineHeight,
        '--title-line-clamp': typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
        '--title-text-wrap': textWrap,
      },
    }
  }
)
