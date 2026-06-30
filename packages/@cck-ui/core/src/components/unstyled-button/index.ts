import { SFCWithInstall, withInstall } from '../../core'
import _UnstyledButton from './unstyled-button.vue'

export const UnstyledButton: SFCWithInstall<typeof _UnstyledButton> = withInstall(_UnstyledButton)
export default UnstyledButton

export * from './unstyled-button.types'
