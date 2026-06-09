import { useProp } from '@cck-ui/hooks'
import {
  computed,
  getCurrentInstance,
  inject,
  MaybeRef,
  unref,
  useAttrs
} from 'vue'
import { formContextKey } from '../constants'

export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const instance = getCurrentInstance()
  const attrs = useAttrs()
  const disabledProp = useProp<boolean>('disabled')
  const form = inject(formContextKey, undefined)

  const hasExplicitDisabled = computed(() => {
    const vnodeProps = instance?.vnode?.props ?? {}
    return 'disabled' in vnodeProps
  })

  const hasDataDisabled = computed(() => 'data-disabled' in attrs)

  return computed(() => {
    if (hasExplicitDisabled.value) {
      return disabledProp.value ?? true
    }

    if (hasDataDisabled.value) return true

    if (fallback !== undefined) return unref(fallback)

    return form?.disabled ?? false
  })
}

export const useDisabled = useFormDisabled
