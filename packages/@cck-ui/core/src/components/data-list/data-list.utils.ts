import { createVarsResolver, getFontSize, getLineHeight, getSpacing } from '../../core'
import { DataListFactory } from './data-list.types'

export const varsResolver = createVarsResolver<DataListFactory>((_, { size, gap, labelWidth }) => ({
  root: {
    '--data-list-fz': getFontSize(size),
    '--data-list-gap': getSpacing(size),
    '--data-list-label-width':
      labelWidth !== undefined
        ? typeof labelWidth === 'number'
          ? `${labelWidth}px`
          : labelWidth
        : undefined,
    '--data-list-lh': getLineHeight(gap),
  },
}))
