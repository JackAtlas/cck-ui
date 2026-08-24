import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import classes from './visually-hidden.module.css'
import VisuallyHidden from './visually-hidden.vue'

const VisuallyHiddenWithStatic = withPropsFactory(withExtend(withClasses(VisuallyHidden, classes)))

export const CVisuallyHidden: SFCWithInstallAndClasses<typeof VisuallyHidden, typeof classes> =
  withInstall(VisuallyHiddenWithStatic)

export default CVisuallyHidden

export * from './visually-hidden.types'
