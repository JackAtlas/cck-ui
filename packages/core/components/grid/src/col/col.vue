<template>
  <div :class="gridClass" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@cck-ui/hooks'
import type { ColProps } from './col.types'
import { computed, inject } from 'vue'
import { useColCustomStyle } from './col-custom'
import { GRID_CONTEXT_KEY, GridContextValue } from '../grid.context'

defineOptions({
  name: 'CCol'
})

const props = withDefaults(defineProps<ColProps>(), {
  span: 12
})

const gridContext = inject(GRID_CONTEXT_KEY) as GridContextValue

const colStyle = useColCustomStyle(props, gridContext)
const ns = useNamespace('grid')
const gridClass = computed(() => ns.e('col'))
</script>
