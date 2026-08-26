<template>
  <Teleport v-if="container" :to="container">
    <slot />
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import { PortalProps } from './portal.types'
import { useComponentProps } from '../../core'

defineOptions({
  name: 'CPortal',
})

const attrs = useAttrs()

const rawProps = defineProps<PortalProps>()

const defaultProps = {
  reuseTargetNode: true,
} satisfies Partial<PortalProps>

const props = useComponentProps({
  component: 'CPortal',
  defaultProps,
  props: rawProps,
})

const container = ref<HTMLElement | null>(null)
let createdNode: HTMLElement | null = null

function createPortalNode(nodeAttrs: Record<string, any>): HTMLElement {
  const node = document.createElement('div')
  node.setAttribute('data-portal', 'true')

  const className = nodeAttrs.class || nodeAttrs.className
  if (className) {
    node.classList.add(...String(className).split(' ').filter(Boolean))
  }
  if (nodeAttrs.style) {
    Object.assign(node.style, nodeAttrs.style)
  }
  if (nodeAttrs.id) {
    node.setAttribute('id', nodeAttrs.id)
  }
  Object.keys(nodeAttrs).forEach((key) => {
    if (!['class', 'className', 'style', 'id'].includes(key)) {
      node.setAttribute(key, nodeAttrs[key])
    }
  })

  return node
}

function getTargetNode(): HTMLElement {
  const target = props.value.target
  const reuseTargetNode = props.value.reuseTargetNode

  if (target) {
    if (typeof target === 'string') {
      const found = document.querySelector<HTMLElement>(target)
      if (found) {
        return found
      }
      const node = createPortalNode(attrs)
      document.body.appendChild(node)
      createdNode = node
      return node
    }
    return target
  }

  if (reuseTargetNode) {
    const existing = document.querySelector<HTMLElement>('[data-cck-shared-portal]')
    if (existing) {
      return existing
    }
    const node = createPortalNode(attrs)
    node.setAttribute('data-cck-shared-portal', 'true')
    document.body.appendChild(node)
    createdNode = node
    return node
  }

  const node = createPortalNode(attrs)
  document.body.appendChild(node)
  createdNode = node
  return node
}

onMounted(() => {
  container.value = getTargetNode()
})

onBeforeUnmount(() => {
  if (createdNode && !createdNode.hasAttribute('data-cck-shared-portal')) {
    if (createdNode.parentNode) {
      createdNode.parentNode.removeChild(createdNode)
    }
  }
})

defineExpose({
  root: container,
})
</script>
