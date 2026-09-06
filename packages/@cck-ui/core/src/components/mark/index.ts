import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './mark.module.css'
import { varsResolver } from './mark.utils'
import Mark from './mark.vue'

const MarkWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Mark, classes), varsResolver))
)

export const CMark: SFCWithInstallAndClasses<typeof Mark, typeof classes> =
  withInstall(MarkWithStatic)

export default CMark

export * from './mark.types'
