import { SFCWithInstall, withInstall } from '@cck-ui/core/core/utils'
import SimpleGrid from './src/simple-grid.vue'

export const CSimpleGrid: SFCWithInstall<typeof SimpleGrid> =
  withInstall(SimpleGrid)
export default CSimpleGrid

export * from './src/simple-grid.types'
