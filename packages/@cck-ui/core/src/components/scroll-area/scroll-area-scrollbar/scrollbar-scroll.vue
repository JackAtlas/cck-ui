<template>
  <scroll-area-scrollbar-visible
    v-bind="mergedAttrs"
    v-if="props.forceMount || state !== 'hidden'"
    :orientation="props.orientation"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
  />
</template>

<script setup lang="ts">
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaScrollbarScrollProps } from './scrollbar.types'
import ScrollAreaScrollbarVisible from './scrollbar-visible.vue'
import { computed, onBeforeUnmount, ref, toValue, useAttrs, watch } from 'vue'

defineOptions({
  name: 'CScrollAreaScrollbarScroll',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaScrollbarScrollProps>()

const props = useComponentProps<ScrollAreaScrollbarScrollProps>({
  component: 'CScrollAreaScrollbarScroll',
  defaultProps: {},
  props: rawProps,
  booleanProps: ['forceMount'],
})

const ctx = useScrollAreaContext()

const state = ref<'hidden' | 'idle' | 'interacting' | 'scrolling'>('hidden')

let debounceTimer: number | null = null
let hideTimer: number | null = null

watch(state, (s) => {
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
  if (s === 'idle') {
    const scrollHideDelay = toValue(ctx.scrollHideDelay)
    hideTimer = window.setTimeout(() => (state.value = 'hidden'), scrollHideDelay)
  }
})

watch(
  ctx.viewport,
  (viewport, _old, onCleanup) => {
    if (!viewport) {
      return
    }
    const key = props.value.orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop'
    let prev = (viewport as any)[key]
    const handleScroll = () => {
      const curr = (viewport as any)[key]
      if (prev !== curr) {
        state.value = 'scrolling'
        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }
        debounceTimer = window.setTimeout(() => (state.value = 'idle'), 100)
      }
      prev = curr
    }
    viewport.addEventListener('scroll', handleScroll)
    onCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll)
    })
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})

const onEnter = () => (state.value = 'interacting')
const onLeave = () => (state.value = 'idle')

const mergedAttrs = computed(() => ({
  ...attrs,
  'data-state':
    (attrs['data-state'] as string | undefined) ??
    (state.value === 'hidden' ? 'hidden' : 'visible'),
}))
</script>
