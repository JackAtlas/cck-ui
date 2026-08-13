import Skeleton from './skeleton.vue'
import classes from './skeleton.module.css'
import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import { varsResolver } from './skeleton.utils'

const SkeletonWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Skeleton, classes), varsResolver))
)

export const CSkeleton: SFCWithInstallAndClasses<typeof Skeleton, typeof classes> =
  withInstall(SkeletonWithStatic)

export default CSkeleton

export * from './skeleton.types'
