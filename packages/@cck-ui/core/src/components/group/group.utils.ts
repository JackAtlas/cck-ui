import { createVarsResolver, getSpacing } from '../../core'
import { GroupFactory } from './group.types'

export const varsResolver = createVarsResolver<GroupFactory>(
  (_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      '--group-child-width': grow && preventGrowOverflow ? childWidth : undefined,
      '--group-gap': getSpacing(gap),
      '--group-align': align,
      '--group-justify': justify,
      '--group-wrap': wrap,
    },
  })
)
