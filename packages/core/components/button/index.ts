import { type SFCWithInstall, withInstall } from '@cck-ui/core'
import ButtonGroup from './button-group/button-group.vue'
import ButtonGroupSection from './button-group-section/button-group-section.vue'
import Button from './button.vue'

export const CButtonGroup: SFCWithInstall<typeof ButtonGroup> =
  withInstall(ButtonGroup)
export const CButtonGroupSection: SFCWithInstall<typeof ButtonGroupSection> =
  withInstall(ButtonGroupSection)
export const CButton: SFCWithInstall<typeof Button> & {
  ButtonGroup: typeof ButtonGroup
} & { ButtonGroupSection: typeof ButtonGroupSection } = withInstall(Button, {
  ButtonGroup,
  ButtonGroupSection
})
export default CButton

export * from './button-group-section/button-group-section.types.js'
export * from './button-group/button-group.types.js'
export * from './button.types.js'
