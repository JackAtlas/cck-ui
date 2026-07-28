import { createVarsResolver } from '../../core'
import { GridFactory } from './grid.types'

export const varsResolver = createVarsResolver<GridFactory>((_, { justify, align, overflow }) => ({
  root: {
    '--grid-align': align,
    '--grid-justify': justify,
    '--grid-overflow': overflow,
  },
}))
