import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Group from './group.vue'
import classes from './group.module.css'

import { varsResolver } from './group.utils'

const GroupWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Group, classes), varsResolver))
)

export const CGroup: SFCWithInstallAndClasses<typeof Group, typeof classes> =
  withInstall(GroupWithStatic)

export default CGroup

export * from './group.types'
