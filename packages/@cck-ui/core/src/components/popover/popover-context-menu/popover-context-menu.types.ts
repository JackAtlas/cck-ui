export interface PopoverContextMenuProps {
  /** If set, the right-click trigger is disabled and the browser's default context menu is shown */
  disabled?: boolean

  /**
   * Delay in ms before a touch long-press opens the dropdown on touch devices
   * @default 500
   */
  longPressDelay?: number
}
