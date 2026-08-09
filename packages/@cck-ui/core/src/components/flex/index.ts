import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import Flex from './flex.vue'
import classes from './flex.module.css'

const FlexWithStatic = withPropsFactory(withExtend(withClasses(Flex, classes)))

export const CFlex: SFCWithInstallAndClasses<typeof Flex, typeof classes> =
  withInstall(FlexWithStatic)

export default CFlex

export * from './flex.types'
