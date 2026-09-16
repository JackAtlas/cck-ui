import { getCurrentScope, onScopeDispose, toValue, type MaybeRefOrGetter } from 'vue'

export interface UseDebouncedCallbackOptions {
  delay: number
  flushOnUnmount?: boolean
  leading?: boolean
  maxWait?: number
}

export interface UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  flush: () => void
  cancel: () => void
  isPending: () => boolean
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: MaybeRefOrGetter<T>,
  options: MaybeRefOrGetter<number | UseDebouncedCallbackOptions>
): UseDebouncedCallbackReturnValue<T> {
  let debounceTimer = 0
  let maxWaitTimer = 0
  let latestArgs: Parameters<T> | null = null
  let isFirstCall = true
  let hasPendingCallback = false

  const getOptions = (): UseDebouncedCallbackOptions => {
    const raw = toValue(options)
    if (typeof raw === 'number') {
      return { delay: raw, flushOnUnmount: false, leading: false, maxWait: undefined }
    }
    return raw
  }

  const clearTimers = () => {
    window.clearTimeout(debounceTimer)
    window.clearTimeout(maxWaitTimer)
    debounceTimer = 0
    maxWaitTimer = 0
    isFirstCall = true
    hasPendingCallback = false
  }

  const getCallback = () => toValue(callback)

  const flush = () => {
    if (debounceTimer !== 0) {
      const args = latestArgs
      clearTimers()
      if (args) {
        getCallback()(...args)
      }
    }
  }

  const cancel = () => {
    clearTimers()
  }

  const startMaxWaitTimer = () => {
    const { maxWait } = getOptions()
    if (maxWait !== undefined && maxWaitTimer === 0) {
      maxWaitTimer = window.setTimeout(() => {
        if (debounceTimer !== 0 && latestArgs) {
          const args = latestArgs
          clearTimers()
          getCallback()(...args)
        }
      }, maxWait)
    }
  }

  const debounced = ((...args: Parameters<T>) => {
    const { delay, leading } = getOptions()

    window.clearTimeout(debounceTimer)
    latestArgs = args

    const wasFirst = isFirstCall
    isFirstCall = false

    if (leading && wasFirst) {
      getCallback()(...args)
      debounceTimer = window.setTimeout(clearTimers, delay)
      startMaxWaitTimer()
      return
    }

    hasPendingCallback = true
    debounceTimer = window.setTimeout(flush, delay)
    startMaxWaitTimer()
  }) as UseDebouncedCallbackReturnValue<T>

  debounced.flush = flush
  debounced.cancel = cancel
  debounced.isPending = () => hasPendingCallback

  if (getCurrentScope()) {
    onScopeDispose(() => {
      const { flushOnUnmount } = getOptions()
      if (flushOnUnmount) {
        flush()
      } else {
        cancel()
      }
    })
  }

  return debounced
}
