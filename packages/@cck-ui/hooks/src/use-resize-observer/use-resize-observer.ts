import { onBeforeUnmount, ref, Ref, shallowRef, watch } from 'vue'

export type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export interface UseResizeObserverReturnValue<T extends HTMLElement = any> {
  ref: Ref<T | null>
  rect: Ref<ObserverRect>
}

export function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): UseResizeObserverReturnValue<T> {
  const elementRef = ref<T | null>(null) as Ref<T | null>
  const rect = shallowRef<ObserverRect>(defaultState)

  let observer: ResizeObserver | null = null
  let frameID = 0

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (frameID) {
      cancelAnimationFrame(frameID)
      frameID = 0
    }
  }

  const setup = (node: T | null) => {
    cleanup()
    if (!node) {
      return
    }

    observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      cancelAnimationFrame(frameID)
      frameID = requestAnimationFrame(() => {
        const boxSize = entry.borderBoxSize?.[0] || entry.contentBoxSize?.[0]

        if (boxSize) {
          const width = boxSize.inlineSize
          const height = boxSize.blockSize
          rect.value = {
            width,
            height,
            x: entry.contentRect.x,
            y: entry.contentRect.y,
            top: entry.contentRect.top,
            left: entry.contentRect.left,
            bottom: entry.contentRect.bottom,
            right: entry.contentRect.right,
          }
        } else {
          rect.value = { ...entry.contentRect }
        }
      })
    })

    observer.observe(node, options)
  }

  watch(elementRef, setup, { flush: 'post' })

  onBeforeUnmount(cleanup)

  return { ref: elementRef, rect }
}
