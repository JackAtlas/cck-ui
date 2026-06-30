import { SFCWithInstall, withInstall } from '../../core'
import Group from './group.vue'

export const CGroup: SFCWithInstall<typeof Group> = withInstall(Group)
export default CGroup

export * from './group.types'
