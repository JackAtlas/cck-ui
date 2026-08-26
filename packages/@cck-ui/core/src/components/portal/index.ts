import { SFCWithInstall, withExtend, withInstall, withPropsFactory } from '../../core'
import Portal from './portal.vue'

const PortalWithStatic = withPropsFactory(withExtend(Portal))

export const CPortal: SFCWithInstall<typeof Portal> = withInstall(PortalWithStatic)

export default CPortal

export * from './portal.types'
