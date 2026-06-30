import { SFCWithInstall, withInstall } from '../utils'
import Box from './box.vue'

export * from './style-props'
export * from './box.types'
export { useRandomClassName } from './use-random-classname/use-random-classname'

export const CBox: SFCWithInstall<typeof Box> = withInstall(Box)
export default CBox
