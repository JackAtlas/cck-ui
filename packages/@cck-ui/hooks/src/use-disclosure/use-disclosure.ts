import { MaybeRefOrGetter, ref, Ref, toValue } from 'vue'

export interface UseDisclosureOptions {
  /**
   * @description Callback invoked when the state becomes true
   */
  onOpen?: () => void
  /**
   * @description Callback invoked when the state becomes false
   */
  onClose?: () => void
}

export interface UseDisclosureHandlers {
  /**
   * Directly set the state without triggering callbacks
   * @param value - The target boolean value.
   */
  set: (value: boolean) => void

  /** Open the state (no-op if already open) */
  open: () => void

  /** Close the state (no-op if already closed) */
  close: () => void

  /** Toggle the current state */
  toggle: () => void
}

export type UseDisclosureReturnValue = { state: Ref<boolean>; handlers: UseDisclosureHandlers }

export function useDisclosure(
  initialState: MaybeRefOrGetter<boolean> = false,
  options: MaybeRefOrGetter<UseDisclosureOptions> = {}
): UseDisclosureReturnValue {
  const state = ref(toValue(initialState))

  const getOptions = () => toValue(options)

  const open = () => {
    if (!state.value) {
      const opts = getOptions()
      opts.onOpen?.()
      state.value = true
    }
  }

  const close = () => {
    if (state.value) {
      const opts = getOptions()
      opts.onClose?.()
      state.value = false
    }
  }

  const toggle = () => {
    state.value ? close() : open()
  }

  const set = (value: boolean) => {
    state.value = value
  }

  return {
    state,
    handlers: {
      open,
      close,
      toggle,
      set,
    },
  }
}
