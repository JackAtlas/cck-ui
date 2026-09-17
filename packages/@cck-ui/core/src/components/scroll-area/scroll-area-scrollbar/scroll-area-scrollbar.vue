<template>
  <scroll-area-scrollbar-hover
    v-bind="$attrs"
    v-if="type === 'hover'"
    :force-mount="props.forceMount"
    :orientation="props.orientation"
  />
  <scroll-area-scrollbar-scroll
    v-bind="$attrs"
    v-if="type === 'scroll'"
    :force-mount="props.forceMount"
    :orientation="props.orientation"
  />
  <scroll-area-scrollbar-auto
    v-bind="$attrs"
    v-if="type === 'auto'"
    :force-mount="props.forceMount"
    :orientation="props.orientation"
  />
  <scroll-area-scrollbar-visible
    v-bind="$attrs"
    v-if="type === 'always'"
    :force-mount="props.forceMount"
    :orientation="props.orientation"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, toValue, watch } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaScrollbarProps } from './scroll-area-scrollbar.types'
import ScrollAreaScrollbarAuto from './scrollbar-auto.vue'
import ScrollAreaScrollbarHover from './scrollbar-hover.vue'
import ScrollAreaScrollbarScroll from './scrollbar-scroll.vue'
import ScrollAreaScrollbarVisible from './scrollbar-visible.vue'

defineOptions({
  name: 'CScrollAreaScrollbar',
  inheritAttrs: false,
})

const rawProps = defineProps<ScrollAreaScrollbarProps>()

const defaultProps = {
  orientation: 'vertical',
} satisfies Partial<ScrollAreaScrollbarProps>

const props = useComponentProps<ScrollAreaScrollbarProps>({
  component: 'CScrollAreaScrollbar',
  defaultProps,
  props: rawProps,
  booleanProps: ['forceMount'],
})

const ctx = useScrollAreaContext()

const type = computed(() => toValue(ctx.type))
const isHorizontal = computed(() => props.value.orientation === 'horizontal')

watch(
  isHorizontal,
  (h) => {
    if (h) {
      ctx.onScrollbarXEnabledChange(true)
    } else {
      ctx.onScrollbarYEnabledChange(true)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (isHorizontal.value) {
    ctx.onScrollbarXEnabledChange(false)
  } else {
    ctx.onScrollbarYEnabledChange(false)
  }
})
</script>
