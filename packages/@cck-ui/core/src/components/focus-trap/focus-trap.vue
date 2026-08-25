<script lang="ts">
import { useFocusTrap } from '@cck-ui/hooks'
import { defineComponent, Fragment, h, isVNode } from 'vue'
import { FocusTrapPrpos } from './focus-trap.types'
import { useComponentProps } from '../../core'
export default defineComponent({
  name: 'CFocusTrap',
  props: {
    active: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const defaultProps = { active: true } satisfies Partial<FocusTrapPrpos>
    const computedProps = useComponentProps({
      component: 'CFocusTrap',
      defaultProps,
      props,
    })

    const trapRef = useFocusTrap(() => computedProps.value.active)

    return () => {
      const children = slots.default?.()
      if (!children || children.length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[@cck-ui/core/focus-trap] No children provided, nothing to trap.')
        }
        return null
      }

      if (children.length === 1) {
        const child = children[0]
        if (isVNode(child) && child.type === Fragment) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              '[@cck-ui/core/focus-trap] Fragment as single child is not supported; wrapping with div.'
            )
          }
          const subChildren = Array.isArray(child.children) ? child.children : []
          return h('div', { ref: trapRef }, subChildren)
        }
        return h(child, { ref: trapRef })
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn('[@cck-ui/core/focus-trap] Multiple root elements found; wrapping with div.')
      }
      return h('div', { ref: trapRef }, children)
    }
  },
})
</script>
