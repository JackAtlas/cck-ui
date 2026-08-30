import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import AvatarGroup from './avatar-group/avatar-group.vue'
import { varsResolver as groupVarsResolver } from './avatar-group/avatar-group.utils'
import classes from './avatar.module.css'
import Avatar from './avatar.vue'
import { varsResolver } from './avatar.utils'

const AvatarGroupWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(AvatarGroup, classes), groupVarsResolver))
)

const AvatarWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Avatar, classes), varsResolver))
)

export const CAvatarGroup: SFCWithInstallAndClasses<typeof AvatarGroup, typeof classes> =
  withInstall(AvatarGroupWithStatic)
export const CAvatar: SFCWithInstallAndClasses<typeof Avatar, typeof classes> & {
  Group: typeof AvatarGroup
} = withInstall(AvatarWithStatic, { Group: AvatarGroup })

export default CAvatar

export * from './avatar.types'
export * from './avatar-group/avatar-group.types'
