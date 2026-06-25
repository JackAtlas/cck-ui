import { type SFCWithInstall, withInstall } from '@cck-ui/core'
import Grid from './grid.vue'
import Col from './col/col.vue'

export const CCol: SFCWithInstall<typeof Col> = withInstall(Col)
export const CGrid: SFCWithInstall<typeof Grid> & { Col: typeof Col } =
  withInstall(Grid, { Col })
export default CGrid

export * from './col/col.types.js'
export * from './grid.types.js'
