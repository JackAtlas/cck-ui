import { onBeforeUnmount, watch, type Ref } from 'vue'

export function useObserveElement(
  element: Ref<HTMLElement | null | undefined>,
  onResize: () => void
) {
  let observer: ResizeObserver | null = null
  let rAF = 0

  const cleanup = () => {
    observer?.disconnect()
    observer = null
    if (rAF) {
      cancelAnimationFrame(rAF)
      rAF = 0
    }
  }

  watch(
    element,
    (el) => {
      cleanup()
      if (!(el instanceof Element) || typeof ResizeObserver === 'undefined') {
        return
      }
      observer = new ResizeObserver(() => {
        cancelAnimationFrame(rAF)
        rAF = requestAnimationFrame(onResize)
      })
      observer.observe(el)
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(cleanup)
}
