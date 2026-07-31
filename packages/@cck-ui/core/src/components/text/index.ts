import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Text from './text.vue'
import classes from './text.module.css'
import { varsResolver } from './text.utils'

const TextWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Text, classes), varsResolver))
)

export const CText: SFCWithInstallAndClasses<typeof Text, typeof classes> =
  withInstall(TextWithStatic)

export default CText

export * from './text.types'
