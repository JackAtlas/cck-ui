import {
  SFCWithInstall,
  SFCWithInstallAndClasses,
  withClasses,
  withExtend,
  withInstall,
  withPropsFactory,
  withVarsResolver,
} from '../../core'
import PopoverContextMenu from './popover-context-menu/popover-context-menu.vue'
import Popover from './popover.vue'
import classes from './popover.module.css'
import { varsResolver } from './popover.utils'
import PopoverTarget from './popover-target/popover-target.vue'
import PopoverDropdown from './popover-dropdown/popover-dropdown.vue'

const PopoverWithStatic = withPropsFactory(
  withExtend(withVarsResolver(withClasses(Popover, classes), varsResolver))
)
const PopoverTargetWithStatic = withPropsFactory(withExtend(PopoverTarget))
const PopoverDropdownWithStatic = withPropsFactory(withExtend(PopoverDropdown))

export const CPopoverContextMenu: SFCWithInstall<typeof PopoverContextMenu> =
  withInstall(PopoverContextMenu)
export const CPopoverDropdown: SFCWithInstall<typeof PopoverDropdown> =
  withInstall(PopoverDropdownWithStatic)
export const CPopoverTarget: SFCWithInstall<typeof PopoverTarget> =
  withInstall(PopoverTargetWithStatic)
export const CPopover: SFCWithInstallAndClasses<typeof Popover, typeof classes> & {
  Target: typeof PopoverTarget
  Dropdown: typeof PopoverDropdown
  ContextMenu: typeof PopoverContextMenu
} = withInstall(PopoverWithStatic, {
  ContextMenu: CPopoverContextMenu,
  Dropdown: CPopoverDropdown,
  Target: CPopoverTarget,
})

export default CPopover

export * from './popover-context-menu/popover-context-menu.types'
export * from './popover-dropdown/popover-dropdown.types'
export * from './popover-target/popover-target.types'
export * from './popover.types'
