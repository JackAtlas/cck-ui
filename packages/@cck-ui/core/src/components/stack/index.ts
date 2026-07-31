import Stack from './stack.vue'
import classes from './stack.module.css'
import { varsResolver } from './stack.utils'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

const StackWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Stack, classes), varsResolver))
)

export const CStack: SFCWithInstallAndClasses<typeof Stack, typeof classes> =
  withInstall(StackWithStatic)

export default CStack

export * from './stack.types'
