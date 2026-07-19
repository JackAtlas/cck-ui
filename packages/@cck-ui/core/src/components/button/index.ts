import {
  type SFCWithInstall,
  type SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withVarsResolver,
} from '../../core'
import ButtonGroup from './button-group/button-group.vue'
import ButtonGroupSection from './button-group-section/button-group-section.vue'
import Button from './button.vue'
import classes from './button.module.css'

import { varsResolver } from './button.utils'

const ButtonWithStatic = withExtend(withVarsResolver(withClasses(Button, classes), varsResolver))

export const CButtonGroup: SFCWithInstall<typeof ButtonGroup> = withInstall(ButtonGroup)
export const CButtonGroupSection: SFCWithInstall<typeof ButtonGroupSection> =
  withInstall(ButtonGroupSection)
export const CButton: SFCWithInstallAndClasses<typeof Button, typeof classes> & {
  ButtonGroup: typeof ButtonGroup
  ButtonGroupSection: typeof ButtonGroupSection
} = withInstall(ButtonWithStatic, {
  ButtonGroup,
  ButtonGroupSection,
})

export default CButton

export * from './button-group-section/button-group-section.types'
export * from './button-group/button-group.types'
export * from './button.types'
