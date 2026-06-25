<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@cck-ui/hooks'
import type { ColProps } from './col.types'
import { computed, inject } from 'vue'
import { useColCustomStyle } from './col-custom'
import { GridContextValue } from '../grid.context'
import { GRID_CONTEXT_KEY } from '../grid.constants'
import {
  DEFAULT_THEME,
  normalizeNumberLikeStringProp,
  responsiveStyleManager,
  THEME_KEY,
  useRandomClassName
} from '../../../core'
import { ref } from 'vue'
import { watchEffect } from 'vue'
import { onUnmounted } from 'vue'

defineOptions({
  name: 'CCol'
})

const props = withDefaults(defineProps<ColProps>(), {
  span: 12
})

const gridContext = inject(GRID_CONTEXT_KEY) as GridContextValue
const theme = inject(THEME_KEY, DEFAULT_THEME)

const responsiveClassname = useRandomClassName()
const _offset = normalizeNumberLikeStringProp(props.offset)
const _order = normalizeNumberLikeStringProp(props.order)
const colStyle = useColCustomStyle(
  {
    selector: responsiveClassname,
    align: props.align,
    offset: _offset,
    order: _order,
    span: props.span
  },
  gridContext,
  theme
)
const ns = useNamespace('grid')
const gridClass = computed(() => [ns.e('col'), responsiveClassname])

const currentStyleKey = ref<string | null>(null)
watchEffect(() => {
  const cssText = colStyle.value.queryStylesString
  if (cssText) {
    const newKey = responsiveStyleManager.register(cssText)
    if (currentStyleKey.value && currentStyleKey.value !== newKey) {
      responsiveStyleManager.unregister(currentStyleKey.value)
    }
    currentStyleKey.value = newKey
  } else {
    if (currentStyleKey.value) {
      responsiveStyleManager.unregister(currentStyleKey.value)
      currentStyleKey.value = null
    }
  }
})
onUnmounted(() => {
  if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
  }
})
</script>
