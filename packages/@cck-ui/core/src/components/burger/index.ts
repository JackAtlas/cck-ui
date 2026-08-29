import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import classes from './burger.module.css'
import { varsResolver } from './burger.utils'
import Burger from './burger.vue'

const BurgerWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Burger, classes), varsResolver))
)

export const CBurger: SFCWithInstallAndClasses<typeof Burger, typeof classes> =
  withInstall(BurgerWithStatic)

export default CBurger

export * from './burger.types'
