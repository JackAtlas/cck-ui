import { computed, ComputedRef, MaybeRefOrGetter, ref, toValue } from 'vue'

export interface UseUncontrolledOptions<T> {
  /** Value for controlled state */
  value?: MaybeRefOrGetter<T | undefined>

  /** Initial value for uncontrolled state */
  defaultValue?: T

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T

  /** Controlled state onChange handler */
  onChange?: (value: T, ...payload: any[]) => void
}

export type UseUncontrolledReturnValue<T> = [
  /** Current value */
  ComputedRef<T>,

  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T, ...payload: any[]) => void,

  /** True if the state is controlled, false if uncontrolled */
  ComputedRef<boolean>,
]

export function useUncontrolled<T>({
  value,
  defaultValue,
  finalValue,
  onChange,
}: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T> {
  const uncontrolledValue = ref(defaultValue !== undefined ? defaultValue : (finalValue as T))

  const isControlled = computed(() => toValue(value) !== undefined)

  const currentValue = computed<T>(() => {
    if (isControlled.value) {
      return toValue(value) as T
    }
    return uncontrolledValue.value as T
  })

  const setValue = (val: T, ...payload: any[]) => {
    if (!isControlled.value) {
      uncontrolledValue.value = val
    }
    onChange?.(val, ...payload)
  }

  return [currentValue, setValue, isControlled] as const
}
