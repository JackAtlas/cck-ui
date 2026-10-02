<script lang="ts">
import { assignRef, useFocusTrap, useMergedRef } from '@cck-ui/hooks'
import { defineComponent, Fragment, h, isVNode, nextTick, ref, watch } from 'vue'
import { FocusTrapPrpos } from './focus-trap.types'
import { useComponentProps } from '../../core'
import { resolveElement } from '../../utils'
export default defineComponent({
  name: 'CFocusTrap',
  props: {
    active: {
      type: Boolean,
    },
    innerRef: {
      type: [Object, Function] as any,
      default: undefined,
    },
  },
  setup(props, { slots, expose }) {
    const defaultProps = { active: true } satisfies Partial<FocusTrapPrpos>
    const computedProps = useComponentProps({
      component: 'CFocusTrap',
      defaultProps,
      props,
      booleanProps: ['active'],
    })

    const resolvedEl = ref<HTMLElement | null>(null)

    const trapRef = useFocusTrap(() => computedProps.value.active)

    watch(
      () => [trapRef.value, computedProps.value.innerRef] as const,
      ([el, inner]) => {
        if (inner) {
          assignRef(inner as any, el)
        }
      },
      { immediate: true }
    )

    function setRefValue(node: any) {
      const dom = resolveElement(node)
      if (dom) {
        trapRef.value = dom
        return
      }
      nextTick(() => {
        const retry = resolveElement(node)
        if (retry) {
          trapRef.value = retry
        }
      })
    }

    expose({
      root: resolvedEl,
    })

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
          return h('div', { ref: setRefValue }, subChildren)
        }
        return h(child, { ref: setRefValue })
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn('[@cck-ui/core/focus-trap] Multiple root elements found; wrapping with div.')
      }
      return h('div', { ref: setRefValue }, children)
    }
  },
})
</script>
