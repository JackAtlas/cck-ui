import { SFCWithInstall, withExtend, withInstall, withPropsFactory } from '../../core'
import FocusTrap from './focus-trap.vue'

const FocusTrapWithStatic = withPropsFactory(withExtend(FocusTrap))

export const CFocusTrap: SFCWithInstall<typeof FocusTrap> = withInstall(FocusTrapWithStatic)

export default CFocusTrap

export * from './focus-trap.types'
