import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

import Container from './container.vue'
import classes from './container.module.css'
import { varsResolver } from './container.utils'

const ContainerWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Container, classes), varsResolver))
)

export const CContainer: SFCWithInstallAndClasses<typeof Container, typeof classes> =
  withInstall(ContainerWithStatic)

export default CContainer

export * from './container.types'
