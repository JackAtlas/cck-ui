import { createVarsResolver, getSpacing } from '../../core'
import { AffixFactory } from './affix.types'

export const varsResolver = createVarsResolver<AffixFactory>((_, { zIndex, position }) => ({
  root: {
    '--affix-bottom': getSpacing(position?.bottom),
    '--affix-left': getSpacing(position?.left),
    '--affix-right': getSpacing(position?.right),
    '--affix-top': getSpacing(position?.top),
    '--affix-z-index': zIndex?.toString(),
  },
}))
