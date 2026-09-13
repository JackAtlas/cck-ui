import { MaybeRefOrGetter, onMounted, onScopeDispose, ref, Ref, toValue, watch } from 'vue'

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean
}

function getInitialValue(query: string, initialValue?: boolean): boolean {
  if (typeof initialValue === 'boolean') {
    return initialValue
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches
  }

  return false
}

export function useMediaQuery(
  query: MaybeRefOrGetter<string>,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = { getInitialValueInEffect: true }
): Ref<boolean> {
  const matches = ref(
    getInitialValueInEffect
      ? (initialValue ?? false)
      : getInitialValue(toValue(query), initialValue)
  )

  let stopWatch: (() => void) | undefined

  onMounted(() => {
    stopWatch = watch(
      () => toValue(query),
      (q, _prev, onCleanup) => {
        if (typeof window === 'undefined' || !('matchMedia' in window)) {
          return
        }

        let mediaQuery: MediaQueryList
        try {
          mediaQuery = window.matchMedia(q)
        } catch {
          // Safari iframe compatibility issue
          return
        }

        matches.value = mediaQuery.matches

        const callback = (event: MediaQueryListEvent) => {
          matches.value = event.matches
        }

        mediaQuery.addEventListener('change', callback)
        onCleanup(() => mediaQuery.removeEventListener('change', callback))
      },
      { immediate: true }
    )
  })

  onScopeDispose(() => {
    stopWatch?.()
  })

  return matches
}

export namespace useMediaQuery {
  export type Options = UseMediaQueryOptions
}
