export function resolveElement(el: any): HTMLElement | null {
  if (!el) {
    return null
  }
  if (el instanceof HTMLElement) {
    return el
  }
  const root = el.root
  if (root instanceof HTMLElement) {
    return root
  }
  if (root && typeof root === 'object' && 'value' in root) {
    const v = root.value
    if (v instanceof HTMLElement) {
      return v
    }
  }
  if (el.$el instanceof HTMLElement) {
    return el.$el
  }
  return null
}
