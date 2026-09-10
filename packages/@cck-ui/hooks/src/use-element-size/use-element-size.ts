import { ref, Ref, watch } from 'vue'
import { useResizeObserver } from '../use-resize-observer/use-resize-observer'

export interface UseElementSizeReturnValue<T extends HTMLElement = any> {
  ref: Ref<T | null>
  width: Ref<number>
  height: Ref<number>
}

export function useElementSize<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): UseElementSizeReturnValue<T> {
  const { ref: elementRef, rect } = useResizeObserver<T>(options)
  const width = ref(0)
  const height = ref(0)

  watch(
    rect,
    (r) => {
      width.value = r.width
      height.value = r.height
    },
    { immediate: true }
  )

  return { ref: elementRef, width, height }
}
