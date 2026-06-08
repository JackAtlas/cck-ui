import { type SFCWithInstall, withInstall } from '@cck-ui/utils'
import ButtonGroup from './src/button-group/button-group.vue'
import ButtonGroupSection from './src/button-group-section/button-group-section.vue'
import Button from './src/button.vue'

export const CButtonGroup: SFCWithInstall<typeof ButtonGroup> =
  withInstall(ButtonGroup)
export const CButtonGroupSection: SFCWithInstall<typeof ButtonGroupSection> =
  withInstall(ButtonGroupSection)
export const CButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default CButton

export * from './src/button-group-section/button-group-section.types'
export * from './src/button-group/button-group.types'
export * from './src/button.types'
