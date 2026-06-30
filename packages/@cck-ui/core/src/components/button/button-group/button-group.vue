<template>
  <c-box rol="group" v-bind="mergedAttrs" :mod="[{ 'data-orientation': orientation }, mod]">
    <template v-for="(child, index) in validChildren" :key="child.key ?? index">
      <component :is="child" />
    </template>
  </c-box>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { CBox, createVarsResolver, rem, useStyles } from '../../../core'
import classes from '../button.module.css'
import { ButtonGroupFactory, type ButtonGroupProps } from './button-group.types'
import { useButtonGroup } from './use-button-group'

defineOptions({
  name: 'CButtonGroup',
})

const slots = useSlots()

const varsResolver = createVarsResolver<ButtonGroupFactory>((_, { borderWidth }) => ({
  group: { '--button-border-width': rem(borderWidth) },
}))

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})

const {
  className,
  style,
  classNames,
  styles,
  unstyled,
  orientation,
  vars,
  borderWidth,
  mod,
  attributes,
  ...others
} = props

const getStyles = useStyles<ButtonGroupFactory>({
  name: 'ButtonGroup',
  props,
  classes,
  className,
  style,
  classNames,
  styles,
  unstyled,
  attributes,
  vars,
  varsResolver,
  rootSelector: 'group',
})

const groupAttrs = computed(() => getStyles('group'))
const mergedAttrs = computed(() => ({ ...others, ...groupAttrs.value }))

const { validChildren } = useButtonGroup(slots)
</script>
