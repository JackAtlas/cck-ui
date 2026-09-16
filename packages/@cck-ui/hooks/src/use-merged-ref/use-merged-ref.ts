import type { Ref, VNodeRef } from 'vue'

export type PossibleRef<T> = Ref<T | null> | ((value: T | null) => void) | undefined | null

export function assignRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (!ref) {
    return
  }
  if (typeof ref === 'string') {
    return
  }
  if (typeof ref === 'function') {
    ;(ref as (v: T | null) => void)(value)
    return
  }
  ;(ref as Ref<T | null>).value = value
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  const merged = (value: T | null) => {
    refs.forEach((ref) => assignRef(ref, value))
  }
  return merged as ((value: T | null) => void) & VNodeRef
}
