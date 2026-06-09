import { useProp } from '../use-prop'
import { MaybeRef, computed, getCurrentInstance, unref, useAttrs } from 'vue'

export const useLoading = (fallback?: MaybeRef<boolean | undefined>) => {
  const instance = getCurrentInstance()
  const attrs = useAttrs()
  const loadingProp = useProp<boolean>('loading')

  const hasExplicitLoading = computed(() => {
    const vnodeProps = instance?.vnode.props ?? {}
    return 'loading' in vnodeProps
  })

  const hasDataLoading = computed(() => 'data-loading' in attrs)

  return computed(() => {
    if (hasExplicitLoading.value) {
      return loadingProp.value ?? true
    }

    if (hasDataLoading.value) return true

    if (fallback !== undefined) return unref(fallback)

    return false
  })
}
