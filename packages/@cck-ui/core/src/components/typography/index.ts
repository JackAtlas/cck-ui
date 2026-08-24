import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import classes from './typography.module.css'
import Typography from './typography.vue'

const TypographyWithStatic = withPropsFactory(withExtend(withClasses(Typography, classes)))

export const CTypography: SFCWithInstallAndClasses<typeof Typography, typeof classes> =
  withInstall(TypographyWithStatic)

export default CTypography

export * from './typography.types'
