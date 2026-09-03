import { createVarsResolver, getSize } from '../../core'
import { KbdFactory } from './kbd.types'

export const varsResolver = createVarsResolver<KbdFactory>((_, { size }) => ({
  root: {
    '--kbd-fz': getSize(size, 'kbd-fz'),
  },
}))
