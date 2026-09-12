import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import Title from './title.vue'
import { varsResolver } from './title.utils'
import classes from './title.module.css'

const TitleWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Title, classes), varsResolver))
)

export const CTitle: SFCWithInstallAndClasses<typeof Title, typeof classes> =
  withInstall(TitleWithStatic)

export default CTitle

export * from './title.types'
