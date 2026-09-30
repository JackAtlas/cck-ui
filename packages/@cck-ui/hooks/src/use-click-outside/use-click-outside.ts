import { MaybeRefOrGetter, ref, Ref, toValue, watchEffect } from 'vue'

type EventType = MouseEvent | TouchEvent

const DEFAULT_EVENTS = ['mousedown', 'touchstart']

export interface UseClickOutsideOptions {
  events?: MaybeRefOrGetter<string[] | null | undefined>
  nodes?: MaybeRefOrGetter<(HTMLElement | null | undefined)[] | undefined>
  enabled?: MaybeRefOrGetter<boolean>
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: (event: EventType) => void,
  options: UseClickOutsideOptions = {}
): Ref<T | null> {
  const { events, nodes, enabled = true } = options

  const elementRef = ref<T | null>(null) as Ref<T | null>

  const listener = (event: Event) => {
    const target = event?.target as Node | null

    const shouldIgnore =
      (!target || !document.body.contains(target)) && (target as Element | null)?.tagName !== 'HTML'

    if (shouldIgnore) {
      return
    }

    const path = event.composedPath()
    const currentNodes = toValue(nodes)

    if (Array.isArray(currentNodes)) {
      const shouldTrigger = currentNodes.every(
        (node) => !!node && !path.includes(node as EventTarget)
      )
      if (shouldTrigger) {
        callback(event as EventType)
      }
    } else if (elementRef.value && !path.includes(elementRef.value)) {
      callback(event as EventType)
    }
  }

  watchEffect((onCleanup) => {
    if (!toValue(enabled)) {
      return
    }

    const eventsList = toValue(events) || DEFAULT_EVENTS

    eventsList.forEach((fn) => document.addEventListener(fn, listener))

    onCleanup(() => {
      eventsList.forEach((fn) => document.removeEventListener(fn, listener))
    })
  })

  return elementRef
}
