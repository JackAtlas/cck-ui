<template>
  <component
    v-bind="_props"
    :class="buttonClass"
    :is="tag"
    :style="buttonStyle"
    @click="handleClick"
  >
    <span :class="innerClass">
      <span data-position="left" v-if="$slots['left-section']">
        <slot name="left-section"></slot>
      </span>
      <span data-position="left" v-else-if="leftSection">
        <component :is="leftSection" />
      </span>
      <span :class="labelClass">
        <slot />
      </span>
      <span data-position="right" v-if="$slots['right-section']">
        <slot name="right-section"></slot>
      </span>
      <span data-position="right" v-else-if="rightSection">
        <component :is="rightSection" />
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ButtonProps } from './button.types'
import { useNamespace } from '@cck-ui/hooks'
import { useButton } from './use-button'
import { useButtonCustomStyle } from './button-custom'

defineOptions({
  name: 'CButton'
})

defineSlots<{
  'left-section': any
  'right-section': any
  default: any
}>()

const slots = useSlots()

const hasLeftSlot = computed(() => !!slots['left-section'])
const hasRightSlot = computed(() => !!slots['right-section'])

const props = withDefaults(defineProps<ButtonProps>(), {
  radius: '4px',
  size: 'sm',
  tag: 'button',
  variant: 'default'
})

const { _disabled, _props, _ref, handleClick } = useButton(props, {
  hasLeftSlot: hasLeftSlot.value,
  hasRightSlot: hasRightSlot.value
})

const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')
const buttonClass = computed(() => [
  useNamespace('focus').b('auto'),
  !_disabled.value && useNamespace('active').b(),
  ns.e('root'),
  ns.is('loading', props.loading)
])
const innerClass = computed(() => [ns.e('inner')])
const labelClass = computed(() => [ns.e('label')])

defineExpose({
  /** @description if button is disabled */
  disabled: _disabled.value,
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: props.size,
  /** @description button variant */
  variant: props.variant
})
</script>
