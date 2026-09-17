<template>
  <scroll-area-root
    v-bind="rootAttrs"
    :get-styles="getStyles"
    ref="rootCompRef"
    :scroll-hide-delay="props.scrollHideDelay"
    :scrollbars="props.scrollbars"
    :type="rootType"
  >
    <scroll-area-viewport
      v-bind="viewportProps"
      :data-horizontal-hidden="
        props.offsetScrollbars === 'present' && !horizontalThumbVisible ? 'true' : undefined
      "
      :data-offset-scrollbars="
        props.offsetScrollbars === true ? 'xy' : offsetScrollbars || undefined
      "
      :data-scrollbars="props.scrollbars || undefined"
      :data-vertical-hidden="
        props.offsetScrollbars === 'present' && !verticalThumbVisible ? 'true' : undefined
      "
      :data-vertical-scrollbar-position="props.verticalScrollbarPosition || undefined"
      :viewport-ref="mergedViewportRef"
      @scroll="handleScroll"
    >
      <slot />
    </scroll-area-viewport>

    <scroll-area-scrollbar
      force-mount
      orientation="horizontal"
      v-bind="getStyles('scrollbar')"
      v-if="props.scrollbars === 'xy' || props.scrollbars === 'x'"
      :data-hidden="
        props.type === 'never' || (offsetScrollbars === 'present' && !horizontalThumbVisible)
          ? true
          : undefined
      "
      :data-vertical-scrollbar-position="props.verticalScrollbarPosition || undefined"
      @pointerenter="scrollbarHovered = true"
      @pointerleave="scrollbarHovered = false"
    />

    <scroll-area-scrollbar
      force-mount
      orientation="vertical"
      v-bind="getStyles('scrollbar')"
      v-if="props.scrollbars === 'xy' || props.scrollbars === 'y'"
      :data-hidden="
        props.type === 'never' || (offsetScrollbars === 'present' && !verticalThumbVisible)
          ? true
          : undefined
      "
      :data-vertical-scrollbar-position="props.verticalScrollbarPosition || undefined"
      @pointerenter="scrollbarHovered = true"
      @pointerleave="scrollbarHovered = false"
    />

    <scroll-area-corner
      :data-hidden="props.type === 'never' || undefined"
      :data-hovered="scrollbarHovered || undefined"
      :data-vertical-scrollbar-position="props.verticalScrollbarPosition || undefined"
    />
  </scroll-area-root>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { CStyleProp, useComponentProps, useStyles } from '../../core'
import { ScrollAreaFactory, ScrollAreaProps } from './scroll-area.types'
import ScrollAreaRoot from './scroll-area-root/scroll-area-root.vue'
import ScrollAreaViewport from './scroll-area-viewport/scroll-area-viewport.vue'
import ScrollAreaScrollbar from './scroll-area-scrollbar/scroll-area-scrollbar.vue'
import ScrollAreaCorner from './scroll-area-corner/scroll-area-corner.vue'
import classes from './scroll-area.module.css'
import { varsResolver } from './scroll-area.utils'
import { useMergedRef } from '@cck-ui/hooks'
import { useObserveElement } from './use-observe-element'

defineOptions({
  name: 'CScrollArea',
})

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaProps>()

const defaultProps = {
  scrollHideDelay: 1000,
  type: 'hover',
  scrollbars: 'xy',
} satisfies Partial<ScrollAreaProps>

const props = useComponentProps<ScrollAreaProps>({
  component: 'CScrollArea',
  defaultProps,
  props: rawProps,
  booleanProps: ['scrollbars', 'offsetScrollbars'],
})

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'scrollbarSize',
  'vars',
  'type',
  'scrollHideDelay',
  'viewportProps',
  'onScrollPositionChange',
  'offsetScrollbars',
  'scrollbars',
  'onBottomReached',
  'onTopReached',
  'onLeftReached',
  'onRightReached',
  'overscrollBehavior',
  'startScrollPosition',
  'verticalScrollbarPosition',
  'attributes',
  'ref',
]

const getStyles = useStyles<ScrollAreaFactory>({
  name: 'ScrollArea',
  props: styleProps,
  classes,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const rootType = computed(() => (props.value.type === 'never' ? 'always' : props.value.type))

const rootAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props.value) {
    if (!knownProps.includes(key)) {
      others[key] = (props.value as any)[key]
    }
  }
  return { ...others, ...getStyles('root') }
})

const rootCompRef = ref<InstanceType<typeof ScrollAreaRoot> | null>(null)
const rootEl = computed(() => rootCompRef.value?.root ?? null)
const localViewportRef = ref<HTMLDivElement | null>(null)
const mergedViewportRef = useMergedRef<HTMLDivElement>(
  props.value.viewportRef as any,
  localViewportRef
)

const verticalThumbVisible = ref(false)
const horizontalThumbVisible = ref(false)
const scrollbarHovered = ref(false)

useObserveElement(localViewportRef, () => {
  if (props.value.offsetScrollbars === 'present' && localViewportRef.value) {
    const el = localViewportRef.value
    verticalThumbVisible.value = el.scrollHeight > el.clientHeight
    horizontalThumbVisible.value = el.scrollWidth > el.clientWidth
  }
})

const prev = { top: true, bottom: false, left: true, right: false }

const handleScroll = (event: Event) => {
  const t = event.currentTarget as HTMLDivElement

  props.value.onScrollPositionChange?.({ x: t.scrollLeft, y: t.scrollTop })

  const isAtBottom = t.scrollTop - (t.scrollHeight - t.clientHeight) >= -0.8
  const isAtTop = t.scrollTop === 0
  if (isAtBottom && !prev.bottom) {
    props.value.onBottomReached?.()
  }
  if (isAtTop && !prev.top) {
    props.value.onTopReached?.()
  }
  prev.bottom = isAtBottom
  prev.top = isAtTop

  const isAtRight = t.scrollLeft - (t.scrollWidth - t.clientWidth) >= -0.8
  const isAtLeft = t.scrollLeft === 0
  if (isAtRight && !prev.right) {
    props.value.onRightReached?.()
  }
  if (isAtLeft && !prev.left) {
    props.value.onLeftReached?.()
  }
  prev.right = isAtRight
  prev.left = isAtLeft
}

onMounted(() => {
  const sp = props.value.startScrollPosition
  if (sp && localViewportRef.value) {
    localViewportRef.value.scrollTo({ left: sp.x ?? 0, top: sp.y ?? 0 })
  }
})

watch(
  () => localViewportRef.value,
  (el, _old, onCleanup) => {
    if (!el) {
      return
    }
    const sp = props.value.startScrollPosition
    if (!sp) {
      return
    }

    requestAnimationFrame(() => {
      if (!localViewportRef.value) {
        return
      }
      localViewportRef.value.scrollTo({ left: sp.x ?? 0, top: sp.y ?? 0 })
    })
  },
  { immediate: true, flush: 'post' }
)

defineExpose({
  root: computed(() => rootEl.value),
  viewport: computed(() => localViewportRef.value),
})
</script>
