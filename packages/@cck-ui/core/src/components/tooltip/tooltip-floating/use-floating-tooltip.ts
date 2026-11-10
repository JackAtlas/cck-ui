import { computed, onScopeDispose, ref, watch } from 'vue'
import { FloatingPosition } from '../../../utils/Floating'
import {
  getOverflowAncestors,
  Placement,
  shift,
  useFloating,
  VirtualElement,
} from '@floating-ui/vue'

export interface UseFloatingTooltipOptions {
  offset: number
  position: FloatingPosition
  defaultOpened?: boolean
}

export function useFloatingTooltip(options: UseFloatingTooltipOptions) {
  const opened = ref(options.defaultOpened ?? false)
  const boundaryEl = ref<HTMLElement | null>(null)
  const floatingEl = ref<HTMLElement | null>(null)
  const virtualReference = ref<VirtualElement | null>(null)

  const floating = useFloating(virtualReference, floatingEl, {
    placement: computed(() => options.position as Placement),
    middleware: [shift({ crossAxis: true, padding: 5, rootBoundary: 'document' })],
  })

  const horizontalOffset = computed(() => {
    if (floating.placement.value.includes('right')) {
      return options.offset
    }
    if (floating.placement.value.includes('left') || options.position.includes('left')) {
      return options.offset * -1
    }
    return 0
  })

  const verticalOffset = computed(() => {
    if (floating.placement.value.includes('bottom')) {
      return options.offset
    }
    if (floating.placement.value.includes('top') || options.position.includes('top')) {
      return options.offset * -1
    }
    return 0
  })

  const handleMouseMove = (event: MouseEvent | { clientX: number; clientY: number }) => {
    const { clientX, clientY } = event
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
      return
    }

    const x = clientX
    const y = clientY
    const leftOffset = horizontalOffset.value
    const topOffset = verticalOffset.value

    virtualReference.value = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x,
          y,
          left: x + leftOffset,
          top: y + topOffset,
          right: x,
          bottom: y,
        }
      },
    }
  }

  watch(
    boundaryEl,
    (el, _old, onCleanup) => {
      if (!el) {
        return
      }
      const handler = (event: MouseEvent) => handleMouseMove(event)
      el.addEventListener('mousemove', handler)
      onCleanup(() => el.removeEventListener('mousemove', handler))
    },
    { immediate: true, flush: 'post' }
  )

  watch(
    floatingEl,
    (el, _old, onCleanup) => {
      if (!el) {
        return
      }
      const parents = getOverflowAncestors(el)
      const handler = () => floating.update()
      parents.forEach((parent) => parent.addEventListener('scroll', handler))
      onCleanup(() => {
        parents.forEach((parent) => parent.removeEventListener('scroll', handler))
      })
    },
    { immediate: true, flush: 'post' }
  )

  onScopeDispose(() => {
    opened.value = false
  })

  return {
    handleMouseMove,
    x: floating.x,
    y: floating.y,
    opened,
    setOpened: (value: boolean) => {
      opened.value = value
    },
    boundaryRef: boundaryEl,
    floating: (node: HTMLElement | null) => {
      floatingEl.value = node
    },
  }
}
