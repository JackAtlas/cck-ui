<script lang="ts">
import { cloneVNode, defineComponent } from 'vue'
import { getSingleElementChild, useComponentProps } from '../../../core'
import { PopoverTargetProps } from './popover-target.types'
import { usePopoverContext } from '../popover.context'
import { useMergedRef } from '@cck-ui/hooks'
import clsx from 'clsx'

export default defineComponent({
  name: 'CPopoverTarget',
  inheritAttrs: false,
  props: {
    refProps: { type: String, default: 'ref' },
    popupType: { type: String, default: 'dialog' },
  },
  setup(rawProps, { slots, attrs }) {
    const props = useComponentProps<PopoverTargetProps>({
      component: 'CPopoverTarget',
      defaultProps: { refProp: 'ref', popupType: 'dialog' },
      props: rawProps,
    })

    const ctx = usePopoverContext()

    function resolveElement(el: any): HTMLElement | null {
      if (!el) {
        return null
      }
      if (el instanceof HTMLElement) {
        return el
      }
      const root = el.root
      if (root instanceof HTMLElement) {
        return root
      }
      if (root && typeof root === 'object' && 'value' in root) {
        const v = root.value
        if (v instanceof HTMLElement) {
          return v
        }
      }
      if (el.$el instanceof HTMLElement) {
        return el.$el
      }
      return null
    }

    const safeReference = (node: any) => {
      const dom = resolveElement(node)
      if (dom) {
        ctx.reference(dom)
      }
    }

    const targetRef = useMergedRef<HTMLElement>(safeReference, attrs.ref as any)

    return () => {
      const child = getSingleElementChild(slots.default?.())
      if (!child) {
        throw new Error(
          'PopoverTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
      }

      const childProps = (child.props ?? {}) as Record<string, any>

      const forwardedProps: Record<string, any> = { ...attrs }
      delete forwardedProps.ref

      const accessibleProps = ctx?.withRoles
        ? {
            'aria-haspopup': props.value.popupType,
            'aria-expanded': ctx.opened.value,
            'aria-controls': ctx.opened.value ? ctx.getDropdownId() : undefined,
            id: ctx.getTargetId(),
          }
        : {}

      const targetProps = (ctx?.targetProps ?? {}) as Record<string, any>

      const mergedClassName = clsx(
        targetProps.className,
        forwardedProps.className,
        childProps.className,
        childProps.class
      )

      const onClickHandler = !ctx?.controlled.value
        ? (event: MouseEvent) => {
            ctx?.onToggle()
            childProps.onClick?.(event)
            childProps.onclick?.(event)
          }
        : undefined

      const mergedProps: Record<string, any> = {
        ...forwardedProps,
        ...accessibleProps,
        ...targetProps,
        class: mergedClassName,
      }

      if (props.value.refProp === 'ref') {
        mergedProps.ref = targetRef
      } else {
        mergedProps[props.value.refProp!] = targetRef
      }

      if (onClickHandler) {
        mergedProps.onClick = onClickHandler
      }

      return cloneVNode(child, mergedProps)
    }
  },
})
</script>
