import { createVarsResolver } from '../../core'
import { RollingNumberFactory } from './rolling-number.types'

export const varsResolver = createVarsResolver<RollingNumberFactory>(
  (_, { animationDuration, timingFunction }) => ({
    root: {
      '--rn-duration': `${animationDuration}ms`,
      '--rn-timing-function': timingFunction,
    },
  })
)
