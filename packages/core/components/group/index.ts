import { SFCWithInstall, withInstall } from '@cck-ui/core/core'
import Group from './src/group.vue'

export const CGroup: SFCWithInstall<typeof Group> = withInstall(Group)
export default CGroup

export * from './src/group.types'
