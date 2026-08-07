import { createVarsResolver, getRadius, getSize, rem } from '../../core'
import { CloseButtonFactory } from './close-button.types'

export const varsResolver = createVarsResolver<CloseButtonFactory>(
  (_, { size, radius, iconSize }) => ({
    root: {
      '--cb-icon-size': getSize(size, 'cb-size'),
      '--cb-radius': radius === undefined ? undefined : getRadius(radius),
      '--cb-size': rem(iconSize),
    },
  })
)
