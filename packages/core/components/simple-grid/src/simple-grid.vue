<template>
  <div v-if="type === 'container'" :class="containerClass">
    <div :class="gridClass">
      <slot />
    </div>
  </div>
  <template v-else>
    <div v-bind="gridStyle.attrs" :class="gridClass">
      <slot />
    </div>
  </template>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { SimpleGridProps } from './simple-grid.types'
import {
  DEFAULT_THEME,
  responsiveStyleManager,
  THEME_KEY,
  useRandomClassName
} from '../../../core'
import { useNamespace } from '@cck-ui/hooks'
import { computed } from 'vue'
import { useSimpleGridStyle } from './simple-grid-custom'
import { watchEffect, onUnmounted } from 'vue'
import classes from './simple-grid.module.css'

defineOptions({
  name: 'CSimpleGrid'
})

const props = withDefaults(defineProps<SimpleGridProps>(), {
  cols: 1,
  spacing: 'md',
  type: 'media'
})

const theme = inject(THEME_KEY, DEFAULT_THEME)

const responsiveClassname = useRandomClassName()
const gridStyle = useSimpleGridStyle(
  { selector: responsiveClassname, ...props },
  theme
)

const ns = useNamespace('simple-grid')
const containerClass = computed(() => [ns.e('container'), classes.container])
const gridClass = computed(() => [
  ns.e('root'),
  responsiveClassname,
  classes.root
])

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
</script>
