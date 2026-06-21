<template>
  <div v-if="type === 'container' && breakpoints" :class="containerClass">
    <div :class="gridClass">
      <div :class="innerClass">
        <slot />
      </div>
    </div>
  </div>
  <template v-else>
    <div :class="gridClass">
      <div :class="innerClass">
        <slot />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, provide, ref, watchEffect } from 'vue'
import { useNamespace } from '@cck-ui/hooks'
import { useGridCustomStyle } from './grid-custom'
import { DEFAULT_COLUMNS, GRID_CONTEXT_KEY } from './grid.constants'
import { GridContextValue } from './grid.context'
import type { GridProps } from './grid.types'
import {
  DEFAULT_THEME,
  isNumberLike,
  responsiveStyleManager,
  THEME_KEY,
  useRandomClassName
} from '../../../core'

defineOptions({
  name: 'CGrid'
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: DEFAULT_COLUMNS,
  gap: 'md',
  grow: false,
  justify: 'flex-start'
})

const theme = inject(THEME_KEY, DEFAULT_THEME)

const responsiveClassname = useRandomClassName()
const gridStyle = useGridCustomStyle(
  { selector: responsiveClassname, ...props },
  theme
)
const ns = useNamespace('grid')
const containerClass = computed(() => [ns.e('container')])
const gridClass = computed(() => [ns.e('root'), responsiveClassname])
const innerClass = computed(() => [ns.e('inner')])

const currentStyleKey = ref<string | null>(null)
watchEffect(() => {
  const cssText = gridStyle.value.queryStylesString
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

const _breakpoints = computed(() => props.breakpoints)
const _columns = computed(() => {
  if (!isNumberLike(props.columns)) {
    console.warn(
      `[C-Grid] columns should be number or number-like string, got ${props.columns}. Fallback to default columns ${DEFAULT_COLUMNS}.`
    )
    return DEFAULT_COLUMNS
  }

  return Number(props.columns)
})
const _grow = computed(() => props.grow)
const _type = computed(() => props.type)

const context: GridContextValue = {
  get breakpoints() {
    return _breakpoints.value
  },
  get columns() {
    return _columns.value
  },
  get grow() {
    return _grow.value
  },
  get type() {
    return _type.value
  }
}

provide(GRID_CONTEXT_KEY, context)
</script>
