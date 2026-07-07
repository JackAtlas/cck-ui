<template>
  <c-box v-bind="mergedAttrs" :tag="tag" :type="tag === 'button' ? 'button' : undefined">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CBox, useStyles } from '../../core'
import type { UnstyledButtonFactory, UnstyledButtonProps } from './unstyled-button.types'
import classes from './unstyled-button.module.css'

defineOptions({
  name: 'UnstyledButton',
})

const props = withDefaults(defineProps<UnstyledButtonProps>(), {
  __staticSelector: 'UnstyledButton',
})

const { tag = 'button' } = props

const knownProps = [
  'className',
  'tag',
  '__staticSelector',
  'unstyled',
  'classNames',
  'styles',
  'style',
  'attributes',
]

const getStyles = useStyles<UnstyledButtonFactory>({
  name: props.__staticSelector,
  props,
  classes,
  className: props.className,
  style: props.style,
  classNames: props.classNames,
  styles: props.styles,
  unstyled: props.unstyled,
  attributes: props.attributes,
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))
const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})
</script>
