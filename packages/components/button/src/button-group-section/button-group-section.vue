<template>
  <div v-bind="_props" :class="sectionClass" :style="sectionStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonGroupSectionProps } from './button-group-section.types'
import { useNamespace } from '@cck-ui/hooks'
import { useButtonGroupSectionCustomStyle } from './button-group-section-custom'
import { useButtonGroupSection } from './use-button-group-section'

defineOptions({
  name: 'CButtonGroupSection'
})

const props = withDefaults(defineProps<ButtonGroupSectionProps>(), {
  variant: 'default'
})

const { _props, _ref } = useButtonGroupSection(props)

const sectionStyle = useButtonGroupSectionCustomStyle(props)
const ns = useNamespace('button-group')
const sectionClass = computed(() => [ns.e('section')])

defineExpose({
  /** @description button group section html element */
  ref: _ref,
  /** @description button group section size */
  size: props.size,
  /** @description button variant */
  variant: props.variant
})
</script>
