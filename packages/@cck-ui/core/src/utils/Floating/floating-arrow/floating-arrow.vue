<template>
  <div role="presentation" v-bind="mergedAttrs" v-if="visible"></div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useDirectionContext } from '../../../core'
import { getArrowPositionStyles } from './get-arrow-position-styles'
import { FloatingArrowProps } from './floating-arrow.types'

defineOptions({
  name: 'FloatingArrow',
})

const attrs = useAttrs()

const props = defineProps<FloatingArrowProps>()

const { dir } = useDirectionContext()

const mergedAttrs = computed(() => {
  const computedStyle = getArrowPositionStyles({
    position: props.position,
    arrowSize: props.arrowSize,
    arrowOffset: props.arrowOffset,
    arrowRadius: props.arrowRadius,
    arrowPosition: props.arrowPosition,
    dir: dir.value,
    arrowX: props.arrowX,
    arrowY: props.arrowY,
  })

  return {
    ...attrs,
    style: {
      ...((props.style as Record<string, any>) ?? {}),
      ...computedStyle,
    },
  }
})
</script>
