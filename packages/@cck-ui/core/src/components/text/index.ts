import { SFCWithInstall, withInstall } from '../../core'
import Text from './text.vue'

export const CText: SFCWithInstall<typeof Text> = withInstall(Text)
export default CText

export * from './text.types'
