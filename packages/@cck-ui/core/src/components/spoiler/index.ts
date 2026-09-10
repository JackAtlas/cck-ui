import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './spoiler.module.css'
import { varsResolver } from './spoiler.utils'
import Spoiler from './spoiler.vue'

const SpoilerWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Spoiler, classes), varsResolver))
)

export const CSpoiler: SFCWithInstallAndClasses<typeof Spoiler, typeof classes> =
  withInstall(SpoilerWithStatic)

export default CSpoiler

export * from './spoiler.types'
