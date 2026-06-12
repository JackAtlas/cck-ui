<template>
  <div v-bind="_props" :class="buttonGroupClass" :style="buttonGroupStyle">
    <template v-for="(child, index) in validChildren" :key="child.key ?? index">
      <component :is="child" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ButtonGroupProps } from './button-group.types'
import { useButtonGroup } from './use-button-group'
import { useButtonGroupCustomStyle } from './button-group-custom'
import { useNamespace } from '@cck-ui/hooks'

defineOptions({
  name: 'CButtonGroup'
})

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  borderWidth: 1,
  orientation: 'horizontal'
})

const slots = useSlots()

const { _props, validChildren } = useButtonGroup(props, slots)
const buttonGroupStyle = useButtonGroupCustomStyle(props)

const ns = useNamespace('button-group')
const buttonGroupClass = computed(() => [ns.e('group')])
</script>
