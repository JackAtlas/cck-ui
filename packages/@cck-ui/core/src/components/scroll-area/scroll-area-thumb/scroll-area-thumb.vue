<template>
  <div
    v-bind="mergedAttrs"
    v-if="props.forceMount || hasThumb"
    :data-state="hasThumb ? 'visible' : 'hidden'"
    :ref="thumbRefCallback"
  ></div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useComponentProps } from '../../../core'
import { useScrollbarContext } from '../scroll-area-scrollbar/scrollbar.context'
import { useScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaThumbProps } from './scroll-area-thumb.types'
import { addUnlinkedScrollListener } from '../utils'
import { useMergedRef } from '@cck-ui/hooks'

defineOptions({
  name: 'CScrollAreaThumb',
})

const rawProps = defineProps<ScrollAreaThumbProps>()

const props = useComponentProps<ScrollAreaThumbProps>({
  component: 'CScrollAreaThumb',
  defaultProps: {},
  props: rawProps,
  booleanProps: ['forceMount'],
})

const ctx = useScrollAreaContext()
const bar = useScrollbarContext()

const hasThumb = computed(() => bar.hasThumb.value)

const thumbRefCallback = useMergedRef<HTMLDivElement>(bar.onThumbChange)

const mergedAttrs = computed(() => {
  const styles = ctx.getStyles('thumb')
  return {
    class: styles.className,
    style: {
      width: 'var(--sa-thumb-width)',
      height: 'var(--sa-thumb-height)',
      ...((styles.style as Record<string, any>) ?? {}),
      ...((props.value.style as Record<string, any>) ?? {}),
    },
  }
})

let debounceTimer: number | null = null
let removeUnlinked: (() => void) | null = null

watch(
  () => ctx.viewport.value,
  (viewport, _old, onCleanup) => {
    if (!viewport) {
      return
    }
    const onThumbPositionChange = bar.onThumbPositionChange

    const handleScroll = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = window.setTimeout(() => {
        if (removeUnlinked) {
          removeUnlinked()
          removeUnlinked = null
        }
      }, 100)

      if (!removeUnlinked) {
        removeUnlinked = addUnlinkedScrollListener(viewport, onThumbPositionChange)
        onThumbPositionChange()
      }
    }

    onThumbPositionChange()
    viewport.addEventListener('scroll', handleScroll)

    onCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll)
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      if (removeUnlinked) {
        removeUnlinked()
        removeUnlinked = null
      }
    })
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if (removeUnlinked) {
    removeUnlinked()
    removeUnlinked = null
  }
})
</script>
