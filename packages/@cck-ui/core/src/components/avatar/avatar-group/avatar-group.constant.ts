import { InjectionKey } from 'vue'
import { AvatarGroupContextValue } from './avatar-group.context'

export const AVATAR_GROUP_CONTEXT_KEY: InjectionKey<AvatarGroupContextValue> =
  Symbol('AvatarGroupContext')
