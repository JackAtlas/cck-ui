import { MaybeRefOrGetter, ref, Ref, shallowReadonly, shallowRef, toValue } from 'vue'
import { useTimeoutFn } from '../use-timeout-fn/use-timeout-fn'
import { isClient } from '../utils'

interface ConfigurableNavigator {
  navigator?: Navigator
}

const defaultNavigator = isClient ? navigator : undefined

export interface UseClipboardInput<Source> extends ConfigurableNavigator {
  /**
   * @description Enable reading clipboard content on copy/cut events
   * @default false
   */
  read?: boolean

  /**
   * @description Default content to copy when `copy()` is called without arguments
   */
  source?: Source

  /**
   * @description Time in ms after which the copied state will reset
   * @default 2000
   */
  copiedDuring?: number
}

export interface UseClipboardReturnValue<Optional> {
  /**
   * @description Function to copy value to clipboard
   */
  copy: Optional extends true ? (text?: string) => Promise<void> : (text: string) => Promise<void>

  /**
   * @description Function to reset copied state and error
   */
  reset: () => void

  /**
   * @description Error if copying failed
   */
  error: Ref<Error | null>

  /**
   * @description Boolean indicating if the value was copied successfully
   */
  copied: Ref<boolean>

  /**
   * @description Current clipboard content (when `read: true`)
   */
  text: Ref<string>
}

type ClipboardValue = string | (() => Promise<string | undefined>)

export function useClipboard(options?: UseClipboardInput<undefined>): UseClipboardReturnValue<false>
export function useClipboard(
  options: UseClipboardInput<MaybeRefOrGetter<string>>
): UseClipboardReturnValue<true>
export function useClipboard(
  options: UseClipboardInput<MaybeRefOrGetter<string> | undefined> = {}
): UseClipboardReturnValue<boolean> {
  const { copiedDuring = 2000, navigator = defaultNavigator, source } = options

  const error = ref<Error | null>(null)
  const text = shallowRef('')
  const copied = shallowRef(false)
  const copyPending = shallowRef(false)
  const timeout = useTimeoutFn(() => (copied.value = false), copiedDuring, { immediate: false })

  async function copy(value?: ClipboardValue) {
    const resolvedValue = value ?? toValue(source)
    copyPending.value = true

    if (!navigator) {
      error.value = new Error('useClipboard: can only be used on client side.')
      return
    }

    if (typeof resolvedValue !== 'string') {
      error.value = new Error('useClipboard: invalid value')
      return
    }

    if ('clipboard' in navigator) {
      const clipboardItem = createClipboardItem(resolvedValue)
      await navigator.clipboard.write([clipboardItem])

      copied.value = true
      timeout.start()
      copyPending.value = false
    }
  }

  function createClipboardItem(value: ClipboardValue): ClipboardItem {
    if (typeof value === 'string') {
      text.value = value
      return new ClipboardItem({ 'text/plain': value })
    }

    return new ClipboardItem({
      'text/plain': value().then((resolvedText = '') => {
        text.value = resolvedText
        return new Blob([resolvedText], { type: 'text/plain' })
      }),
    })
  }

  function reset() {
    copied.value = false
    error.value = null
    timeout.clear()
  }

  return {
    error,
    text: shallowReadonly(text),
    copied: shallowReadonly(copied),
    copy,
    reset,
  }
}
