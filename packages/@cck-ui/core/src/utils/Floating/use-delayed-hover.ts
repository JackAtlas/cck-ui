import { getCurrentScope, onScopeDispose, toValue, type MaybeRefOrGetter } from 'vue'

export interface UseDelayedHoverInput {
  /** Called to open the dropdown (immediately or after `openDelay`) */
  open: () => void
  /** Called to close the dropdown (immediately or after `closeDelay`) */
  close: () => void
  /** Delay in ms before opening, `0` or `undefined` for no delay */
  openDelay?: MaybeRefOrGetter<number | undefined>
  /** Delay in ms before closing, `0` or `undefined` for no delay */
  closeDelay?: MaybeRefOrGetter<number | undefined>
}

export function useDelayedHover({ open, close, openDelay, closeDelay }: UseDelayedHoverInput) {
  let openTimeout = -1
  let closeTimeout = -1

  const clearTimeouts = () => {
    window.clearTimeout(openTimeout)
    window.clearTimeout(closeTimeout)
    openTimeout = -1
    closeTimeout = -1
  }

  const openDropdown = () => {
    clearTimeouts()

    const delay = toValue(openDelay)

    if (delay === 0 || delay === undefined) {
      open()
    } else {
      openTimeout = window.setTimeout(open, delay)
    }
  }

  const closeDropdown = () => {
    clearTimeouts()

    const delay = toValue(closeDelay)

    if (delay === 0 || delay === undefined) {
      close()
    } else {
      closeTimeout = window.setTimeout(close, delay)
    }
  }

  if (getCurrentScope()) {
    onScopeDispose(clearTimeouts)
  }

  return { openDropdown, closeDropdown }
}
