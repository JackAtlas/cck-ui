import { type SFCWithInstall, withInstall } from '@cck-ui/utils'
import Button from './src/button.vue'

export const CButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default CButton

export * from './src/button.types'
