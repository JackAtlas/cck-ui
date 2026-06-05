import { useProp } from '@cck-ui/hooks'
import { computed, inject, MaybeRef, unref } from 'vue'
import { formContextKey } from '../constants'

export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formContextKey, undefined)

  return computed(() => {
    return disabled.value ?? unref(fallback) ?? form?.disabled ?? false
  })
}

export const useDisabled = useFormDisabled
