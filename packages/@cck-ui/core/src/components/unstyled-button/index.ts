import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
} from '../../core'
import _UnstyledButton from './unstyled-button.vue'
import classes from './unstyled-button.module.css'

const UnstyledButtonWithStatic = withPropsFactory(withExtend(withClasses(_UnstyledButton, classes)))

export const UnstyledButton: SFCWithInstallAndClasses<typeof _UnstyledButton, typeof classes> =
  withInstall(UnstyledButtonWithStatic)
export default UnstyledButton

export * from './unstyled-button.types'
