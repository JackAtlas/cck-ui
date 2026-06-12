import { type SFCWithInstall, withInstall } from '@cck-ui/utils'
import Grid from './src/grid.vue'
import Col from './src/col/col.vue'

export const CCol: SFCWithInstall<typeof Col> = withInstall(Col)
export const CGrid: SFCWithInstall<typeof Grid> & { Col: typeof Col } =
  withInstall(Grid, { Col })
export default CGrid

export * from './src/col/col.types'
export * from './src/grid.types'
