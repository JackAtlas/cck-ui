import { Fragment, VNode, isVNode } from 'vue'

export function filterFalsyChildren(children: unknown): VNode[] {
  const nodes = Array.isArray(children) ? children : children ? [children] : []

  function process(node: unknown): VNode[] {
    if (Array.isArray(node)) {
      return node.flatMap((item) => process(item))
    }

    if (!isVNode(node)) return []

    if (node.type === Fragment) {
      const childNodes = Array.isArray(node.children)
        ? node.children
        : node.children
          ? [node.children]
          : []
      return process(childNodes)
    }

    const type = node.type
    if (
      typeof type === 'string' ||
      typeof type === 'object' ||
      typeof type === 'function'
    ) {
      return [node]
    }

    return []
  }

  return process(nodes)
}
