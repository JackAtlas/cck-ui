<template>
  <c-box
    v-bind="mergedAttrs"
    :tag="tag"
    :type="tag === 'button' ? 'button' : undefined"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CBox, useStyles } from '@cck-ui/core'
import classes from './unstyled-button.module.css'
import type {
  UnstyledButtonFactory,
  UnstyledButtonProps
} from './unstyled-button.types'

defineOptions({
  name: 'UnstyledButton'
})

const props = withDefaults(defineProps<UnstyledButtonProps>(), {
  __staticSelector: 'UnstyledButton'
})

const {
  className,
  tag = 'button',
  __staticSelector,
  unstyled,
  classNames,
  styles,
  style,
  attributes,
  ...others
} = props

const getStyles = useStyles<UnstyledButtonFactory>({
  name: __staticSelector,
  props,
  classes,
  className,
  style,
  classNames,
  styles,
  unstyled,
  attributes
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))
const mergedAttrs = computed(() => ({ ...others, ...rootAttrs.value }))
</script>
