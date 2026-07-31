import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import SimpleGrid from './simple-grid.vue'
import classes from './simple-grid.module.css'

const SimpleGridWithStatic = withPropsFactory(withExtend(withClasses(SimpleGrid, classes)))

export const CSimpleGrid: SFCWithInstallAndClasses<typeof SimpleGrid, typeof classes> =
  withInstall(SimpleGridWithStatic)
export default CSimpleGrid

export * from './simple-grid.types'
