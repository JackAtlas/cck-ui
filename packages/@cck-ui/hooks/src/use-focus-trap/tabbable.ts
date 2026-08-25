export const FOCUS_SELECTOR = 'a, input, select, textarea, button, object, [tabindex]'

function hidden(element: HTMLElement) {
  if (process.env.NODE_ENV === 'test') {
    return false
  }
  return element.style.display === 'none'
}

function visible(element: HTMLElement) {
  const isHidden =
    element.getAttribute('aria-hidden') ||
    element.getAttribute('hidden') ||
    element.getAttribute('type') === 'hidden'
  if (isHidden) {
    return false
  }
  let parent: HTMLElement | null = element
  while (parent) {
    if (parent === document.body || parent.nodeType === 11) {
      break
    }
    if (hidden(parent)) {
      return false
    }
    parent = parent.parentNode as HTMLElement
  }
  return true
}

function getElementTabIndex(element: HTMLElement) {
  const tabIndex = element.getAttribute('tabindex')
  return tabIndex === null ? NaN : parseInt(tabIndex, 10)
}

export function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase()
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element))
  const res =
    (['input', 'select', 'textarea', 'button', 'object'].includes(nodeName) &&
      !(element as HTMLButtonElement).disabled) ||
    (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN)
  return res && visible(element)
}

export function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element)
  const isTabIndexNaN = Number.isNaN(tabIndex)
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element)
}

export function findTabbableDescendants(element: HTMLElement): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)).filter(tabbable)
}

export function scopeTab(node: HTMLElement, event: KeyboardEvent) {
  const tabbableElements = findTabbableDescendants(node)
  if (!tabbableElements.length) {
    event.preventDefault()
    return
  }
  const finalElement = tabbableElements[event.shiftKey ? 0 : tabbableElements.length - 1]
  const root = node.getRootNode() as unknown as DocumentOrShadowRoot
  let leavingFinal = finalElement === root.activeElement || node === root.activeElement

  const activeEl = root.activeElement as Element
  const isRadio = activeEl.tagName === 'INPUT' && activeEl.getAttribute('type') === 'radio'
  if (isRadio) {
    const radioGroup = tabbableElements.filter(
      (el) =>
        el.getAttribute('type') === 'radio' &&
        el.getAttribute('name') === activeEl.getAttribute('name')
    )
    leavingFinal = radioGroup.includes(finalElement)
  }

  if (!leavingFinal) {
    return
  }

  event.preventDefault()
  const target = tabbableElements[event.shiftKey ? tabbableElements.length - 1 : 0]
  target?.focus()
}
