import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import Center from './center.vue'
import classes from './center.module.css'

const CenterWithStatic = withPropsFactory(withExtend(withClasses(Center, classes)))

export const CCenter: SFCWithInstallAndClasses<typeof Center, typeof classes> =
  withInstall(CenterWithStatic)

export default CCenter

export * from './center.types'
