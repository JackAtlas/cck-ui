import { MaybeRefOrGetter, nextTick, onBeforeUnmount, shallowRef, toValue, watchEffect } from 'vue'
import { FOCUS_SELECTOR, focusable, scopeTab, tabbable } from './tabbable'

export function useFocusTrap(active: MaybeRefOrGetter<boolean> = true) {
  const trapRef = shallowRef<HTMLElement | null>(null)
  let cleanup: (() => void) | null = null

  const focusNode = (node: HTMLElement) => {
    let focusElement: HTMLElement | null = node.querySelector('[data-autofocus]')
    if (!focusElement) {
      const children = Array.from(node.querySelectorAll<HTMLElement>(FOCUS_SELECTOR))
      focusElement = children.find(tabbable) || children.find(focusable) || null
      if (!focusElement && focusable(node)) {
        focusElement = node
      }
    }
    if (focusElement) {
      focusElement.focus({ preventScroll: true })
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[CCK-UI/hooks/use-focus-trap] No focusable element found', node)
    }
  }

  const activate = (node: HTMLElement) => {
    nextTick(() => focusNode(node))
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        scopeTab(node, event)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }

  const deactivate = () => {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  }

  watchEffect((onCleanup) => {
    const isActive = toValue(active)
    if (!isActive) {
      deactivate()
      return
    }
    const node = trapRef.value
    if (node) {
      deactivate()
      cleanup = activate(node)
    }
    onCleanup(() => deactivate())
  })

  onBeforeUnmount(deactivate)

  return trapRef
}
