<template>
  <c-box
    ref="_root"
    v-bind="mergedAttrs"
    :tag="tag"
    :type="tag === 'button' ? 'button' : undefined"
  >
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CBox, useComponentProps, useStyles } from '../../core'
import type { UnstyledButtonFactory, UnstyledButtonProps } from './unstyled-button.types'
import classes from './unstyled-button.module.css'

defineOptions({
  name: 'UnstyledButton',
})

// const props = withDefaults(defineProps<UnstyledButtonProps>(), {
//   __staticSelector: 'UnstyledButton',
// })

const rawProps = defineProps<UnstyledButtonProps>()

const props = useComponentProps({
  component: 'UnstyledButton',
  defaultProps: {
    __staticSelector: 'UnstyledButton',
  },
  props: rawProps,
})

const { tag = 'button' } = props.value

const _root = ref<InstanceType<typeof CBox> | null>(null)

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
  name: props.value.__staticSelector!,
  props: props.value,
  classes,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))
const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  return { ...others, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
