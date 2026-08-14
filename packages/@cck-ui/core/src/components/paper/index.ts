import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import { varsResolver } from './paper.utils'
import Paper from './paper.vue'
import classes from './paper.module.css'

const PaperWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Paper, classes), varsResolver))
)

export const CPaper: SFCWithInstallAndClasses<typeof Paper, typeof classes> =
  withInstall(PaperWithStatic)

export default CPaper

export * from './paper.types'
