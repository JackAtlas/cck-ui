export function getComponentName(component: any): string {
  if (typeof component === 'string') {
    return component
  }
  if (component && typeof component === 'object') {
    return component.name || component.__name || 'unknown component'
  }
  return String(component)
}
