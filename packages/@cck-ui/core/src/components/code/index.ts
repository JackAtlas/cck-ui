import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './code.module.css'
import { varsResolver } from './code.utils'
import Code from './code.vue'

const CodeWithStatics = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Code, classes), varsResolver))
)

export const CCode: SFCWithInstallAndClasses<typeof Code, typeof classes> =
  withInstall(CodeWithStatics)

export default CCode

export * from './code.types'
