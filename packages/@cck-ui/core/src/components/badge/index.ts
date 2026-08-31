import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './badge.module.css'
import { varsResolver } from './badge.utils'
import Badge from './badge.vue'

const BadgeWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Badge, classes), varsResolver))
)

export const CBadge: SFCWithInstallAndClasses<typeof Badge, typeof classes> =
  withInstall(BadgeWithStatic)

export default CBadge

export * from './badge.types'
