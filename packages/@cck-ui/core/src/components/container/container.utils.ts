import { createVarsResolver, getSize } from '../../core'
import { ContainerFactory } from './container.types'

export const varsResolver = createVarsResolver<ContainerFactory>((_, { size, fluid }) => ({
  root: {
    '--container-size': fluid ? undefined : getSize(size, 'container-size'),
  },
}))
