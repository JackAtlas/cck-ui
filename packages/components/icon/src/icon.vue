<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { type CSSProperties, computed } from 'vue'
import { useNamespace } from '@cck-ui/hooks'
import { addUnit, isUndefined } from '@cck-ui/utils'
import { type IconProps } from './icon.types'

defineOptions({
  name: 'CIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}

  return {
    fontSize: isUndefined(size) ? undefined : addUnit(size),
    '--color': color
  }
})
</script>
