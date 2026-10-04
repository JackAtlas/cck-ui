import { Fragment, isVNode, VNode } from 'vue'

export function getSingleElementChild(children: unknown): VNode | null {
  const arr = Array.isArray(children) ? children : children ? [children] : []
  if (arr.length !== 1) {
    return null
  }

  const child = arr[0]

  if (!isVNode(child)) {
    return null
  }

  if (child.type === Fragment) {
    return null
  }

  if (typeof child.type === 'symbol') {
    return null
  }

  if (typeof child.type === 'string' && child.type === 'template') {
    return null
  }

  return child
}
