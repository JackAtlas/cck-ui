import ActionIconGroup from './action-icon-group/action-icon-group.vue'
import ActionIconGroupSection from './action-icon-group-section/action-icon-group-section.vue'
import ActionIcon from './action-icon.vue'
import classes from './action-icon.module.css'

import { varsResolver as sectionVarsResolver } from './action-icon-group/action-icon-group.utils'
import { varsResolver as groupVarsResolver } from './action-icon-group-section/action-icon-group-section.utils'
import { varsResolver } from './action-icon.utils'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

const ActionIconGroupSectionWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ActionIconGroupSection, classes), sectionVarsResolver))
)
const ActionIconGroupWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ActionIconGroup, classes), groupVarsResolver))
)
const ActionIconWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ActionIcon, classes), varsResolver))
)

export const CActionIconGroup: SFCWithInstallAndClasses<typeof ActionIconGroup, typeof classes> =
  withInstall(ActionIconGroupWithStatic)
export const CActionIconGroupSection: SFCWithInstallAndClasses<
  typeof ActionIconGroupSection,
  typeof classes
> = withInstall(ActionIconGroupSectionWithStatic)
export const CActionIcon: SFCWithInstallAndClasses<typeof ActionIcon, typeof classes> & {
  CActionIconGroup: typeof CActionIconGroup
  CActionIconGroupSection: typeof CActionIconGroupSection
} = withInstall(ActionIconWithStatic, {
  CActionIconGroup,
  CActionIconGroupSection,
})

export default CActionIcon

export * from './action-icon-group/action-icon-group.types'
export * from './action-icon-group-section/action-icon-group-section.types'
export * from './action-icon.types'
