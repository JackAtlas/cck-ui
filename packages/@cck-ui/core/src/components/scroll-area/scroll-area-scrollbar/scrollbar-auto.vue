<template>
  <scroll-area-scrollbar-visible
    v-bind="mergedAttrs"
    v-if="props.forceMount || visible"
    :orientation="props.orientation"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import ScrollAreaScrollbarVisible from './scrollbar-visible.vue'
import { ScrollAreaScrollbarAutoProps } from './scrollbar.types'
import { useObserveElement } from '../use-observe-element'

defineOptions({
  name: 'CScrollAreaScrollbarAuto',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaScrollbarAutoProps>()

const defaultProps = {
  orientation: 'vertical',
} satisfies Partial<ScrollAreaScrollbarAutoProps>

const props = useComponentProps<ScrollAreaScrollbarAutoProps>({
  component: 'CScrollAreaScrollbarAuto',
  defaultProps,
  props: rawProps,
  booleanProps: ['forceMount'],
})

const ctx = useScrollAreaContext()

const visible = ref(false)
let timer = 0

const check = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = window.setTimeout(() => {
    const v = ctx.viewport.value
    if (!v) {
      return
    }
    const isHorizontal = props.value.orientation === 'horizontal'
    const overflowX = v.offsetWidth < v.scrollWidth
    const overflowY = v.offsetHeight < v.scrollHeight
    visible.value = isHorizontal ? overflowX : overflowY
  }, 10)
}

useObserveElement(ctx.viewport, check)
useObserveElement(ctx.content, check)

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})

const mergedAttrs = computed(() => ({
  ...attrs,
  'data-state':
    (attrs['data-state'] as string | undefined) ?? (visible.value ? 'visible' : 'hidden'),
}))
</script>
