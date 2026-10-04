<script lang="ts">
import { cloneVNode, computed, defineComponent, h, useSlots } from 'vue'
import { usePopoverContext } from '../popover.context'
import { PopoverContextMenuProps } from './popover-context-menu.types'
import { getSingleElementChild } from '../../../core'
import { useContextMenuHandlers } from '../../../utils/Floating'

export default defineComponent({
  name: 'CPopoverContextMenu',
  props: {
    /** If set, the right-click trigger is disabled and the browser's default context menu is shown */
    disabled: { type: Boolean, default: false },

    /**
     * Delay in ms before a touch long-press opens the dropdown on touch devices
     * @default 500
     */
    longPressDelay: { type: Number, default: 500 },
  },
  setup(props: PopoverContextMenuProps) {
    const slots = useSlots()
    const ctx = usePopoverContext()

    const childProps = computed<Record<string, any>>(
      () => (getSingleElementChild(slots.default?.())?.props ?? {}) as Record<string, any>
    )

    const handlers = useContextMenuHandlers({
      childProps: {},
      disabled: () => props.disabled || ctx?.disabled.value,
      opened: ctx?.opened,
      longPressDelay: () => props.longPressDelay!,
      setReference: ctx?.reference as unknown as (node: object) => void,
      open: () => {
        if (!ctx?.opened.value) {
          ctx?.onToggle()
        }
      },
    })

    return () => {
      const child = getSingleElementChild(slots.default?.())
      if (!child) {
        throw new Error(
          'PopoverContextMenu component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
      }

      const mergedProps = {
        ...handlers.value,
        onClick: (event: MouseEvent) => {
          if (ctx.opened.value) {
            event.preventDefault()
            event.stopPropagation()
            ctx.onClose?.()
          }
        },
      }

      return cloneVNode(child, mergedProps)
    }
  },
})
</script>
