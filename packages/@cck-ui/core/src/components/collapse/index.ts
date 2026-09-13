import { SFCWithInstall, withExtend, withInstall, withPropsFactory } from '../../core'
import Collapse from './collapse.vue'

const CollapseWithStatic = withPropsFactory(withExtend(Collapse))

export const CCollapse: SFCWithInstall<typeof Collapse> = withInstall(CollapseWithStatic)

export default CCollapse

export * from './collapse.types'
