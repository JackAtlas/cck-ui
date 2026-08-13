import SemiCircleProgress from './semi-circle-progress.vue'
import classes from './semi-circle-progress.module.css'
import { varsResolver } from './semi-circle-progress.utils'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'

const SemiCircleProgressWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(SemiCircleProgress, classes), varsResolver))
)

export const CSemiCircleProgress: SFCWithInstallAndClasses<
  typeof SemiCircleProgress,
  typeof classes
> = withInstall(SemiCircleProgressWithStatic)

export default CSemiCircleProgress

export * from './semi-circle-progress.types'
