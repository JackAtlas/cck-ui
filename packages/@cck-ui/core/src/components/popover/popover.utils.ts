import { createVarsResolver, getRadius, getShadow } from '../../core'
import { PopoverFactory } from './popover.types'

export const varsResolver = createVarsResolver<PopoverFactory>((_, { radius, shadow }) => ({
  dropdown: {
    '--popover-radius': radius === undefined ? undefined : getRadius(radius),
    '--popover-shadow': getShadow(shadow),
  },
}))
