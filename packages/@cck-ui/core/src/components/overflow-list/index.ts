import {
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import OverflowList from './overflow-list.vue'
import { varsResolver } from './overflow-list.utils'
import classes from './overflow-list.module.css'

const OverflowListWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(OverflowList, classes), varsResolver))
)

export const COverflowList: SFCWithInstallAndClasses<typeof OverflowList, typeof classes> =
  withInstall(OverflowListWithStatic) as SFCWithInstallAndClasses<
    typeof OverflowList,
    typeof classes
  >

export default COverflowList

export * from './overflow-list.types'
