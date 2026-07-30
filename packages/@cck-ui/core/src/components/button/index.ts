import {
  type SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import ButtonGroup from './button-group/button-group.vue'
import ButtonGroupSection from './button-group-section/button-group-section.vue'
import Button from './button.vue'
import classes from './button.module.css'

import { varsResolver as sectionVarsResolver } from './button-group-section/button-group-section.utils'
import { varsResolver as groupVarsResolver } from './button-group/button-group.utils'
import { varsResolver } from './button.utils'

const ButtonGroupSectionWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ButtonGroupSection, classes), sectionVarsResolver))
)
const ButtonGroupWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(ButtonGroup, classes), groupVarsResolver))
)
const ButtonWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Button, classes), varsResolver))
)

export const CButtonGroup: SFCWithInstallAndClasses<typeof ButtonGroup, typeof classes> =
  withInstall(ButtonGroupWithStatic)
export const CButtonGroupSection: SFCWithInstallAndClasses<
  typeof ButtonGroupSection,
  typeof classes
> = withInstall(ButtonGroupSectionWithStatic)
export const CButton: SFCWithInstallAndClasses<typeof Button, typeof classes> & {
  CButtonGroup: typeof CButtonGroup
  CButtonGroupSection: typeof CButtonGroupSection
} = withInstall(ButtonWithStatic, {
  CButtonGroup,
  CButtonGroupSection,
})

export default CButton

export * from './button-group-section/button-group-section.types'
export * from './button-group/button-group.types'
export * from './button.types'
