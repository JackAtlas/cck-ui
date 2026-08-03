import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'

import Space from './space.vue'
import classes from './space.module.css'

const SpaceWithStatic = withPropsFactory(withExtend(withClasses(Space, classes)))

export const CSpace: SFCWithInstallAndClasses<typeof Space, typeof classes> =
  withInstall(SpaceWithStatic)

export default CSpace

export * from './space.types'
