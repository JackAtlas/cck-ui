import { MaybeRefOrGetter, Ref, shallowReadonly, shallowRef, toValue } from 'vue'
import { isClient } from '../utils'

interface Stoppable<StartFnArgs extends any[] = any[]> {
  /**
   * @description A ref indicate whether a stoppable instance is executing
   */
  readonly isPending: Readonly<Ref<boolean>>

  /**
   * @description Clear the timer
   */
  clear: () => void

  /**
   * @description Stop the effect from executing
   */
  stop: () => void

  /**
   * @description Start the effects
   */
  start: (...args: StartFnArgs) => void
}

export interface UseTimeoutFnOptions {
  /**
   * @description Start the timer immediately
   * @default false
   */
  immediate?: boolean

  /**
   * @description Execute the callback function at the beginning once
   * @default false
   */
  immediateCallback?: boolean
}

export type UseTimeoutFnReturnValue<CallbackFn extends (...args: any[]) => any> = Stoppable<
  Parameters<CallbackFn> | []
>

export function useTimeoutFn<CallbackFn extends (...args: any[]) => any>(
  callback: CallbackFn,
  delay: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions
): UseTimeoutFnReturnValue<CallbackFn> {
  const { immediate = false, immediateCallback = false } = options
  const isPending = shallowRef(false)

  let timer: ReturnType<typeof setTimeout> | null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: any[]) {
    if (immediateCallback) {
      callback()
    }
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null

      callback(...args)
    }, toValue(delay))
  }

  if (immediate) {
    isPending.value = true
    if (isClient) {
      start()
    }
  }

  return {
    clear,
    isPending: shallowReadonly(isPending),
    start,
    stop,
  }
}
