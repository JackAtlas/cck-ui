import {
  type SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Grid from './grid.vue'
import Col from './col/col.vue'
import classes from './grid.module.css'
import { varsResolver } from '../button/button.utils'

const GridWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Grid, classes), varsResolver))
)
const ColWithStatic = withPropsFactory(withExtend(withClasses(Col, classes)))

export const CCol: SFCWithInstallAndClasses<typeof Col> = withInstall(ColWithStatic)
export const CGrid: SFCWithInstallAndClasses<typeof Grid, typeof classes> & { Col: typeof Col } =
  withInstall(GridWithStatic, { Col })
export default CGrid

export * from './col/col.types'
export * from './grid.types'
