import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import { varsResolver } from './breadcrumbs.utils'
import Breadcrumbs from './breadcrumbs.vue'
import classes from './breadcrumbs.module.css'

const BreadcrumbsWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Breadcrumbs, classes), varsResolver))
)

export const CBreadcrumbs: SFCWithInstallAndClasses<typeof Breadcrumbs, typeof classes> =
  withInstall(BreadcrumbsWithStatic)

export default CBreadcrumbs

export * from './breadcrumbs.types'
