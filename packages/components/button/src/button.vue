<template>
  <component
    v-bind="_props"
    :class="buttonClass"
    :is="tag"
    :style="buttonStyle"
    @click="handleClick"
  >
    <span :class="innerClass">
      <span :class="labelClass">
        <slot />
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './button.types'
import { useNamespace } from '@cck-ui/hooks'
import { useButton } from './use-button'
import { useButtonCustomStyle } from './button-custom'

defineOptions({
  name: 'CButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  justify: 'center',
  radius: '4px',
  size: 'sm',
  tag: 'button',
  variant: 'default'
})

const { _props, _ref, handleClick } = useButton(props)

const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')
const buttonClass = computed(() => [
  ns.e('root'),
  ns.is('loading', props.loading)
])
const innerClass = computed(() => [ns.e('inner')])
const labelClass = computed(() => [ns.e('label')])

defineExpose({
  /** @description button html element */
  ref: _ref
})
</script>
