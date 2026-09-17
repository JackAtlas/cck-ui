<template>
  <div v-bind="mergedAttrs" v-if="hasCorner && hasSize"></div>
</template>

<script setup lang="ts">
import { computed, ref, toValue, useAttrs } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaCornerProps } from './scroll-area-corner.types'
import { useObserveElement } from '../use-observe-element'

defineOptions({
  name: 'CScrollAreaCorner',
})

const rawProps = defineProps<ScrollAreaCornerProps>()

const props = useComponentProps<ScrollAreaCornerProps>({
  component: 'CScrollAreaCorner',
  defaultProps: {},
  props: rawProps,
})

const ctx = useScrollAreaContext()

const getType = () => toValue(ctx.type)

const width = ref(0)
const height = ref(0)

const hasSize = computed(() => Boolean(width.value && height.value))

useObserveElement(ctx.scrollbarX, () => {
  const h = ctx.scrollbarX.value?.offsetHeight || 0
  ctx.onCornerHeightChange(h)
  height.value = h
})

useObserveElement(ctx.scrollbarY, () => {
  const w = ctx.scrollbarY.value?.offsetWidth || 0
  ctx.onCornerWidthChange(w)
  width.value = w
})

const hasBothScrollbars = computed(() => !!ctx.scrollbarX.value && !!ctx.scrollbarY.value)
const hasCorner = computed(() => getType() !== 'scroll' && hasBothScrollbars.value)

const mergedAttrs = computed(() => {
  const styles = ctx.getStyles('corner')
  return {
    class: styles.className,
    style: {
      ...((styles.style as Record<string, any>) ?? {}),
      ...{ width: `${width.value}px`, height: `${height.value}px` },
    },
  }
})
</script>
