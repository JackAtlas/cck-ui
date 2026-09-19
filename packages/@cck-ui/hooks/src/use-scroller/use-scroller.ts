import {
  getCurrentScope,
  MaybeRefOrGetter,
  nextTick,
  onScopeDispose,
  Ref,
  ref,
  shallowRef,
  toValue,
  VNodeRef,
  watch,
} from 'vue'

export interface UseScrollerOptions {
  /**
   * Amount of pixels to scroll when calling scroll functions
   * @default 200
   */
  scrollAmount?: MaybeRefOrGetter<number>

  /**
   * Determines whether content can be scrolled by dragging with mouse
   * @default true
   */
  draggable?: MaybeRefOrGetter<boolean>

  /** Called when scroll state changes (canScrollStart or canScrollEnd) */
  onScrollStateChange?: (state: UseScrollerScrollState) => void
}

export interface UseScrollerScrollState {
  /** Whether content can be scrolled towards the start (left in LTR, right in RTL) */
  canScrollStart: boolean

  /** Whether content can be scrolled towards the end (right in LTR, left in RTL) */
  canScrollEnd: boolean
}

export interface UseScrollerReturnValue {
  /** Ref to attach to the scrollable container element */
  ref: VNodeRef

  /** Whether content can be scrolled towards the start */
  canScrollStart: Ref<boolean>

  /** Whether content can be scrolled towards the end */
  canScrollEnd: Ref<boolean>

  /** Scrolls towards the start direction */
  scrollStart: () => void

  /** Scrolls towards the end direction */
  scrollEnd: () => void

  /** `true` if the user is currently dragging the content */
  isDragging: Ref<boolean>

  dragHandlers: {
    onMousedown: (e: MouseEvent) => void
    onMousemove: (e: MouseEvent) => void
    onMouseup: () => void
    onMouseleave: () => void
  }
}

export function useScroller(options: UseScrollerOptions = {}): UseScrollerReturnValue {
  const containerRef = shallowRef<HTMLElement | null>(null)
  const canScrollStart = ref(false)
  const canScrollEnd = ref(false)
  const isDragging = ref(false)

  let hasDragged = false
  let startX = 0
  let scrollLeftStart = 0
  let cleanup: (() => void) | null = null

  const getScrollAmount = () => toValue(options.scrollAmount) ?? 200
  const getDraggable = () => toValue(options.draggable) ?? true

  const updateScrollState = () => {
    const container = containerRef.value
    if (!container || !(container instanceof HTMLElement)) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = container
    if (clientWidth === 0 || scrollWidth === 0) {
      return
    }
    const isRtl = getComputedStyle(container).direction === 'rtl'

    let nextStart: boolean
    let nextEnd: boolean

    if (isRtl) {
      nextStart = scrollLeft < -1
      nextEnd = scrollLeft > -(scrollWidth - clientWidth) + 1
    } else {
      nextStart = scrollLeft > 1
      nextEnd = scrollLeft < scrollWidth - clientWidth - 1
    }

    canScrollStart.value = nextStart
    canScrollEnd.value = nextEnd

    options.onScrollStateChange?.({
      canScrollStart: nextStart,
      canScrollEnd: nextEnd,
    })
  }

  watch(
    containerRef,
    (container) => {
      cleanup?.()
      cleanup = null

      if (!container || !(container instanceof HTMLElement)) {
        return
      }

      container.addEventListener('scroll', updateScrollState)

      const resizeObserver = new ResizeObserver(updateScrollState)
      resizeObserver.observe(container)

      cleanup = () => {
        container.removeEventListener('scroll', updateScrollState)
        resizeObserver.disconnect()
      }
    },
    { immediate: true, flush: 'post' }
  )

  if (getCurrentScope()) {
    onScopeDispose(() => {
      cleanup?.()
      cleanup = null
    })
  }

  const scroll = (direction: 'start' | 'end') => {
    const container = containerRef.value
    if (!container || !(container instanceof HTMLElement)) {
      return
    }

    const amount = getScrollAmount()
    const isRtl = getComputedStyle(container).direction === 'rtl'
    const scrollBy = direction === 'end' ? amount : -amount
    const adjusted = isRtl ? -scrollBy : scrollBy

    container.scrollBy({ left: adjusted, behavior: 'smooth' })
  }

  const scrollStart = () => scroll('start')
  const scrollEnd = () => scroll('end')

  const handleMouseDown = (event: MouseEvent) => {
    if (!getDraggable()) {
      return
    }
    const container = containerRef.value
    if (!container || !(container instanceof HTMLElement)) {
      return
    }

    isDragging.value = true
    hasDragged = false
    startX = event.pageX - container.offsetLeft
    scrollLeftStart = container.scrollLeft
    container.style.cursor = 'grabbing'
    container.style.userSelect = 'none'
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value) {
      return
    }
    event.preventDefault()

    const container = containerRef.value
    if (!container || !(container instanceof HTMLElement)) {
      return
    }

    const x = event.pageX - container.offsetLeft
    const walk = x - startX
    if (Math.abs(walk) > 5) {
      hasDragged = true
    }
    container.scrollLeft = scrollLeftStart - walk
  }

  const handleMouseUp = () => {
    const wasDragged = hasDragged
    isDragging.value = false
    hasDragged = false

    const container = containerRef.value
    if (!container || !(container instanceof HTMLElement)) {
      return
    }

    container.style.cursor = ''
    container.style.userSelect = ''

    if (wasDragged) {
      const suppressClick = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        container.removeEventListener('click', suppressClick, true)
      }
      container.addEventListener('click', suppressClick, true)
    }
  }

  const handleMouseLeave = () => {
    if (isDragging.value) {
      handleMouseUp()
    }
  }

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
      return (root.value as HTMLElement) ?? null
    }
    return null
  }

  const assignRef: VNodeRef = (node) => {
    const immediate = resolveElement(node)
    if (immediate) {
      containerRef.value = immediate
      return
    }
    nextTick(() => {
      const resolved = resolveElement(node)
      containerRef.value = resolved
    })
  }

  return {
    ref: assignRef,
    canScrollEnd,
    canScrollStart,
    isDragging,
    scrollStart,
    scrollEnd,
    dragHandlers: {
      onMousedown: handleMouseDown,
      onMouseleave: handleMouseLeave,
      onMousemove: handleMouseMove,
      onMouseup: handleMouseUp,
    },
  }
}
