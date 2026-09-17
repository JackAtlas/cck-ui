<template>
  <c-box
    data-scrollarea-viewport
    v-bind="mergedAttrs"
    :ref="viewportRefCallback"
    @wheel="handleWheel"
  >
    <div :class="contentClass" :style="contentStyle" :ref="contentRefCallback">
      <slot />
    </div>
  </c-box>
</template>

<script setup lang="ts">
import { computed, nextTick, StyleValue, VNodeRef } from 'vue'
import { assignRef } from '@cck-ui/hooks'
import { CBox, CStyleProp, useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaViewportProps } from './scroll-area-viewport.types'

defineOptions({
  name: 'CScrollAreaViewport',
})

const rawProps = defineProps<ScrollAreaViewportProps>()

const props = useComponentProps<ScrollAreaViewportProps>({
  component: 'CScrollAreaViewport',
  defaultProps: {},
  props: rawProps,
})

const ctx = useScrollAreaContext()

function resolveElement(el: any): HTMLDivElement | null {
  if (!el) {
    return null
  }
  if (el instanceof HTMLDivElement) {
    return el
  }
  const root = el.root
  if (root instanceof HTMLDivElement) {
    return root
  }
  if (root && typeof root === 'object' && 'value' in root) {
    return (root.value as HTMLDivElement) ?? null
  }
  return null
}

const assignViewport = (node: HTMLDivElement | null) => {
  assignRef(props.value.viewportRef as any, node)
  ctx.onViewportChange(node)
}

const viewportRefCallback: VNodeRef = (el) => {
  if (!el) {
    assignViewport(null)
    return
  }
  const immediate = resolveElement(el)
  if (immediate) {
    assignViewport(immediate)
    return
  }
  nextTick(() => {
    assignViewport(resolveElement(el))
  })
}
const contentRefCallback: VNodeRef = (el) => {
  const node = resolveElement(el)
  ctx.onContentChange(node)
}

const contentStyle = computed(() => ctx.getStyles('content').style as StyleValue)
const contentClass = computed(() => ctx.getStyles('content').className)
const mergedAttrs = computed(() => {
  const base = ctx.getStyles('viewport')

  return {
    ...base,
    style: {
      ...(base.style ?? {}),
      overflowX: ctx.scrollbarXEnabled.value ? 'scroll' : 'hidden',
      overflowY: ctx.scrollbarYEnabled.value ? 'scroll' : 'hidden',
      ...(props.value.style ?? {}),
    } as CStyleProp,
  }
})

const handleWheel = (event: WheelEvent) => {
  props.value.onWheel?.(event)
  if (ctx.scrollbarXEnabled.value && ctx.viewport.value && event.shiftKey) {
    const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = ctx.viewport.value
    const isAtTop = scrollTop < 1
    const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1
    const canScrollHorizontally = scrollWidth > clientWidth
    if (canScrollHorizontally && (isAtTop || isAtBottom)) {
      event.stopPropagation()
    }
  }
}
</script>
