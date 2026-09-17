<template>
  <scroll-area-scroll-auto
    v-bind="mergedAttrs"
    v-if="props.forceMount || visible"
    :orientation="props.orientation"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, toValue, useAttrs, watch } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaScrollbarHoverProps } from './scrollbar.types'
import ScrollAreaScrollAuto from './scrollbar-auto.vue'

defineOptions({
  name: 'CScrollAreaScrollbarHover',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaScrollbarHoverProps>()

const defaultProps = {
  orientation: 'vertical',
} satisfies Partial<ScrollAreaScrollbarHoverProps>

const props = useComponentProps<ScrollAreaScrollbarHoverProps>({
  component: 'CScrollAreaScrollbarHover',
  defaultProps,
  props: rawProps,
  booleanProps: ['forceMount'],
})

const ctx = useScrollAreaContext()

const visible = ref(false)

let hideTimer = 0

const attach = (el: HTMLDivElement | null) => {
  if (!el) {
    return
  }
  const handleEnter = () => {
    clearTimeout(hideTimer)
    visible.value = true
  }

  const scrollHideDelay = toValue(ctx.scrollHideDelay)

  const handleLeave = () => {
    hideTimer = window.setTimeout(() => (visible.value = false), scrollHideDelay)
  }
  el.addEventListener('pointerenter', handleEnter)
  el.addEventListener('pointerleave', handleLeave)
  return () => {
    clearTimeout(hideTimer)
    el.removeEventListener('pointerenter', handleEnter)
    el.removeEventListener('pointerleave', handleLeave)
  }
}

let cleanup: (() => void) | null = null

watch(
  ctx.scrollArea,
  (el, _old, onCleanup) => {
    cleanup?.()
    if (el) {
      cleanup = attach(el) || null
    }
    onCleanup(() => {
      cleanup?.()
      cleanup = null
    })
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  cleanup?.()
  clearTimeout(hideTimer)
})

const mergedAttrs = computed(() => ({
  ...attrs,
  'data-state':
    (attrs['data-state'] as string | undefined) ?? (visible.value ? 'visible' : 'hidden'),
}))
</script>
