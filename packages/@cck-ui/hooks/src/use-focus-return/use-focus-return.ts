import { MaybeRefOrGetter, toValue, watch } from 'vue'

export interface UseFocusReturnInput {
  opened: MaybeRefOrGetter<boolean>
  shouldReturnFocus?: MaybeRefOrGetter<boolean>
}

export type UseFocusReturnReturnValue = () => void

export function useFocusReturn({
  opened,
  shouldReturnFocus = true,
}: UseFocusReturnInput): UseFocusReturnReturnValue {
  let lastActiveElement: HTMLElement | null = null

  const returnFocus = () => {
    if (
      lastActiveElement &&
      'focus' in lastActiveElement &&
      typeof lastActiveElement.focus === 'function'
    ) {
      lastActiveElement.focus({ preventScroll: true })
    }
  }

  watch(
    [() => toValue(opened), () => toValue(shouldReturnFocus)],
    ([isOpened, shouldReturn], _prev, onCleanup) => {
      let timeout = -1

      const clearFocusTimeout = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          window.clearTimeout(timeout)
        }
      }

      document.addEventListener('keydown', clearFocusTimeout)

      if (isOpened) {
        lastActiveElement = document.activeElement as HTMLElement
      } else if (shouldReturn) {
        const activeElementAtClose = document.activeElement
        timeout = window.setTimeout(() => {
          const currentActiveElement = document.activeElement
          if (
            currentActiveElement === null ||
            currentActiveElement === document.body ||
            currentActiveElement === activeElementAtClose
          ) {
            returnFocus()
          }
        }, 10)
      }

      onCleanup(() => {
        window.clearTimeout(timeout)
        document.removeEventListener('keydown', clearFocusTimeout)
      })
    }
  )

  return returnFocus
}
