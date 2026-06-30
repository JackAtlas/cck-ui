import { SFCWithInstall, withInstall } from '../../core'
import SimpleGrid from './simple-grid.vue'

export const CSimpleGrid: SFCWithInstall<typeof SimpleGrid> = withInstall(SimpleGrid)
export default CSimpleGrid

export * from './simple-grid.types'
