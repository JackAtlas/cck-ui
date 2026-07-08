import { SFCWithInstall, withInstall } from '../../core'
import Transition from './transition.vue'
export { transitions as CCK_TRANSITIONS } from './transitions'
export type { CTransition as CckTransition } from './transitions'
export { getTransitionProps } from './get-transition-props/get-transition-props'

export const CTransition: SFCWithInstall<typeof Transition> = withInstall(Transition)
export default CTransition

export * from './transition.types'
