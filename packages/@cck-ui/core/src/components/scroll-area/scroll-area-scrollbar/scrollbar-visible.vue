<template>
  <scroll-area-scrollbar-axis
    v-bind="$attrs"
    :orientation="props.orientation"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaScrollbarVisibleProps } from './scrollbar.types'
import { Sizes } from '../scroll-area.types'
import { getThumbOffsetFromScroll, getThumbRatio } from '../utils'
import { provideScrollbarContext } from './scrollbar.context'
import ScrollAreaScrollbarAxis from './scrollbar-axis.vue'

defineOptions({
  name: 'CScrollAreaScrollbarVisible',
  inheritAttrs: false,
})

const rawProps = defineProps<ScrollAreaScrollbarVisibleProps>()

const defaultProps = {
  orientation: 'vertical',
} satisfies Partial<ScrollAreaScrollbarVisibleProps>

const props = useComponentProps<ScrollAreaScrollbarVisibleProps>({
  component: 'CScrollAreaScrollbarVisible',
  defaultProps,
  props: rawProps,
})

const ctx = useScrollAreaContext()

const sizes = ref<Sizes>({
  content: 0,
  viewport: 0,
  scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
})

const thumbEl = ref<HTMLDivElement | null>(null)
const scrollbarEl = ref<HTMLDivElement | null>(null)

const thumbRatio = computed(() => getThumbRatio(sizes.value.viewport, sizes.value.content))
const hasThumb = computed(() => thumbRatio.value > 0 && thumbRatio.value < 1)

const getDirection = (): 'ltr' | 'rtl' => {
  if (typeof document === 'undefined') {
    return 'ltr'
  }
  return document.dir === 'rtl' ? 'rtl' : 'ltr'
}

const onThumbPositionChange = () => {
  if (!ctx.viewport.value || !thumbEl.value) {
    return
  }
  if (props.value.orientation === 'horizontal') {
    const scrollPos = ctx.viewport.value.scrollLeft
    const offset = getThumbOffsetFromScroll(scrollPos, sizes.value, getDirection())
    thumbEl.value.style.transform = `translate3d(${offset}px, 0, 0)`
    thumbEl.value.style.setProperty('--thumb-opacity', sizes.value.scrollbar.size === 0 ? '0' : '1')
  } else {
    const scrollPos = ctx.viewport.value.scrollTop
    const offset = getThumbOffsetFromScroll(scrollPos, sizes.value)
    if (sizes.value.scrollbar.size === 0) {
      thumbEl.value.style.setProperty('--thumb-opacity', '0')
    } else {
      thumbEl.value.style.setProperty('--thumb-opacity', '1')
    }
    thumbEl.value.style.transform = `translate3d(0, ${offset}px, 0)`
  }
}

provideScrollbarContext({
  scrollbar: scrollbarEl,
  hasThumb,
  onThumbChange: (thumb) => (thumbEl.value = thumb),
  onThumbPositionChange,
  onDragScroll: (pointerPos) => {
    if (!ctx.viewport.value) {
      return
    }
    if (props.value.orientation === 'horizontal') {
      ctx.viewport.value.scrollLeft = pointerPos
    } else {
      ctx.viewport.value.scrollTop = pointerPos
    }
  },
  onWheelScroll: (scrollPos) => {
    if (!ctx.viewport.value) {
      return
    }
    if (props.value.orientation === 'horizontal') {
      ctx.viewport.value.scrollLeft = scrollPos
    } else {
      ctx.viewport.value.scrollTop = scrollPos
    }
  },
  sizes,
  onSizesChange: (s) => (sizes.value = s),
})

watch(
  () => ctx.viewport.value,
  () => onThumbPositionChange()
)

watch(
  () => sizes.value,
  () => onThumbPositionChange(),
  { deep: true }
)

const onPointerEnter = () => {}
const onPointerLeave = () => {}
</script>
