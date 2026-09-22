import { createVarsResolver, getRadius, rem } from '../../core'
import { AccordionFactory } from './accordion.types'

export const varsResolver = createVarsResolver<AccordionFactory>(
  (_, { transitionDuration, chevronSize, radius }) => ({
    root: {
      '--accordion-chevron-size': chevronSize === undefined ? undefined : rem(chevronSize),
      '--accordion-radius': radius === undefined ? undefined : getRadius(radius),
      '--accordion-transition-duration':
        transitionDuration === undefined ? undefined : `${transitionDuration}ms`,
    },
  })
)
