<template>
  <div
    v-bind="$attrs"
    :data-orientation="orientation"
    :ref="barRef"
    :style="axisStyle"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @lostpointercapture="handleLostPointerCapture"
  >
    <scroll-area-thumb :force-mount="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, VNodeRef, watch } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollAreaContext } from '../scroll-area.context'
import { useScrollbarContext } from './scrollbar.context'
import { getScrollPositionFromPointer, getThumbSize } from '../utils'
import ScrollAreaThumb from '../scroll-area-thumb/scroll-area-thumb.vue'
import { ScrollAreaScrollbarAxisProps } from './scrollbar.types'

defineOptions({
  name: 'CScrollAreaScrollbarAxis',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaScrollbarAxisProps>()

const props = useComponentProps<ScrollAreaScrollbarAxisProps>({
  component: 'CScrollAreaScrollbarAxis',
  defaultProps: {},
  props: rawProps,
})

const ctx = useScrollAreaContext()
const bar = useScrollbarContext()

const barEl = ref<HTMLDivElement | null>(null)
const rectRef = ref<DOMRect | null>(null)

const barRef: VNodeRef = (el) => {
  const node = el as HTMLDivElement | null
  barEl.value = node
  if (isHorizontal.value) {
    ctx.onScrollbarXChange(node)
  } else {
    ctx.onScrollbarYChange(node)
  }
}
const isHorizontal = computed(() => props.value.orientation === 'horizontal')

const axisStyle = computed(() => {
  const sizes = bar.sizes.value
  const thumbSize = getThumbSize(sizes)
  const base = isHorizontal.value
    ? {
        position: 'absolute' as const,
        '--sa-thumb-width': `${thumbSize}px`,
        '--sa-thumb-height': 'var(--scrollarea-scrollbar-size)',
      }
    : {
        position: 'absolute' as const,
        '--sa-thumb-height': `${thumbSize}px`,
        '--sa-thumb-width': 'var(--scrollarea-scrollbar-size)',
      }
  const externalStyle = (attrs.style ?? {}) as Record<string, any>
  return { ...base, ...externalStyle }
})

const getDirection = (): 'ltr' | 'rtl' => {
  if (typeof document === 'undefined') {
    return 'ltr'
  }
  return document.dir === 'rtl' ? 'rtl' : 'ltr'
}

function measureSizes() {
  const el = barEl.value
  const viewport = ctx.viewport.value
  const content = ctx.content.value
  if (!el || !viewport) {
    return
  }

  const style = getComputedStyle(el)

  const scrollbarSize = isHorizontal.value ? el.offsetWidth : el.offsetHeight
  const paddingStart = isHorizontal.value
    ? parseFloat(style.paddingLeft) || 0
    : parseFloat(style.paddingTop) || 0
  const paddingEnd = isHorizontal.value
    ? parseFloat(style.paddingRight) || 0
    : parseFloat(style.paddingBottom) || 0

  bar.onSizesChange({
    content: isHorizontal.value ? (content?.scrollWidth ?? 0) : (content?.scrollHeight ?? 0),
    viewport: isHorizontal.value ? viewport.clientWidth : viewport.clientHeight,
    scrollbar: { size: scrollbarSize, paddingStart, paddingEnd },
  })
}

const pointerOffset = ref(0)
let prevUserSelect = ''

function computeScrollPos(pointerPos: number) {
  return getScrollPositionFromPointer(
    pointerPos,
    pointerOffset.value,
    bar.sizes.value,
    isHorizontal.value ? getDirection() : 'ltr'
  )
}

const handlePointerDown = (event: PointerEvent) => {
  event.preventDefault()
  if (event.button !== 0) {
    return
  }

  const el = barEl.value
  if (!el) {
    return
  }

  const rect = el.getBoundingClientRect()
  rectRef.value = rect

  const target = event.target as HTMLElement
  const thumb = target.closest('.c-ScrollArea-thumb') as HTMLElement | null

  if (thumb) {
    const thumbRect = thumb.getBoundingClientRect()
    pointerOffset.value = isHorizontal.value
      ? event.clientX - thumbRect.left
      : event.clientY - thumbRect.top
  } else {
    pointerOffset.value = 0
  }

  const pointerPos = isHorizontal.value ? event.clientX - rect.left : event.clientY - rect.top
  bar.onDragScroll(computeScrollPos(pointerPos))

  el.setPointerCapture(event.pointerId)
  prevUserSelect = document.body.style.webkitUserSelect
  document.body.style.webkitUserSelect = 'none'
}

const handlePointerMove = (event: PointerEvent) => {
  const rect = rectRef.value
  if (!rect) {
    return
  }
  const pointerPos = isHorizontal.value ? event.clientX - rect.left : event.clientY - rect.top
  bar.onDragScroll(computeScrollPos(pointerPos))
}

const handlePointerUp = (event: PointerEvent) => {
  const el = event.target as HTMLElement
  if (el.hasPointerCapture(event.pointerId)) {
    el.releasePointerCapture(event.pointerId)
  }
}

const handleLostPointerCapture = () => {
  document.body.style.webkitUserSelect = prevUserSelect
  rectRef.value = null
  pointerOffset.value = 0
}

let ro: ResizeObserver | null = null
function observeAll() {
  ro?.disconnect()
  if (!barEl.value) {
    return
  }
  ro = new ResizeObserver(() => measureSizes())
  ro.observe(barEl.value)
  if (ctx.viewport.value) {
    ro.observe(ctx.viewport.value)
  }
  if (ctx.content.value) {
    ro.observe(ctx.content.value)
  }
  measureSizes()
}

onMounted(observeAll)

watch(
  () => [ctx.viewport.value, ctx.content.value],
  () => observeAll(),
  { flush: 'post' }
)

onBeforeUnmount(() => {
  ro?.disconnect()
  document.body.style.webkitUserSelect = prevUserSelect
})

defineExpose({ measureSizes })
</script>
