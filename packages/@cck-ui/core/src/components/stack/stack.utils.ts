import { createVarsResolver, getSpacing } from '../../core'
import { StackFactory } from './stack.types'

export const varsResolver = createVarsResolver<StackFactory>((_, { gap, align, justify }) => ({
  root: {
    '--stack-align': align,
    '--stack-gap': getSpacing(gap),
    '--stack-justify': justify,
  },
}))
