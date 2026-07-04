import { onBeforeUnmount, onMounted, watch, type WatchSource } from 'vue'

type EffectCallback = () => void | (() => void)
type DependencyList = WatchSource | WatchSource[]

export function useIsomorphicEffect(effect: EffectCallback, deps?: DependencyList) {
  let cleanup: (() => void) | undefined
  let stopWatch: (() => void) | undefined

  onMounted(() => {
    cleanup = effect() ?? undefined

    if (deps !== undefined) {
      const sources = Array.isArray(deps) ? deps : [deps]
      stopWatch = watch(sources, () => {
        if (typeof cleanup === 'function') {
          cleanup()
        }
        cleanup = effect() ?? undefined
      })
    }
  })

  onBeforeUnmount(() => {
    if (typeof cleanup === 'function') {
      cleanup()
    }
    if (stopWatch) {
      stopWatch()
    }
  })
}
