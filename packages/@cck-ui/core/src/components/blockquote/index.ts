import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Blockquote from './blockquote.vue'
import classes from './blockquote.module.css'
import { varsResolver } from './blockquote.utils'

const BlockquoteWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Blockquote, classes), varsResolver))
)

export const CBlockquote: SFCWithInstallAndClasses<typeof Blockquote, typeof classes> =
  withInstall(BlockquoteWithStatic)

export default CBlockquote

export * from './blockquote.types'
