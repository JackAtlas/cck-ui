<template>
  <div :class="gridClass" :style="gridStyle">
    <div :class="innerClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps } from './grid.types'
import { useNamespace } from '@cck-ui/hooks'
import { useGridCustomStyle } from './grid-custom'
import { GridContextValue } from './grid.context'
import { provide } from 'vue'
import { isNumberLike } from '../../../core'
import { DEFAULT_COLUMNS, GRID_CONTEXT_KEY } from './grid.constants'

defineOptions({
  name: 'CGrid'
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: DEFAULT_COLUMNS,
  gap: 'md',
  grow: false,
  justify: 'flex-start'
})

const gridStyle = useGridCustomStyle(props)
const ns = useNamespace('grid')
const gridClass = computed(() => [ns.e('root')])
const innerClass = computed(() => [ns.e('inner')])

const _columns = computed(() => props.columns)
const _grow = computed(() => props.grow)
const _type = computed(() => props.type)

const context: GridContextValue = {
  get grow() {
    return _grow.value
  },
  get columns() {
    return _columns.value
  },
  get type() {
    return _type.value
  }
}

provide(GRID_CONTEXT_KEY, context)
</script>
