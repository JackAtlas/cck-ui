<template>
  <unstyled-button
    ref="_root"
    v-bind="mergedAttrs"
    :disabled="props.disabled || props.dataDisabled"
    :unstyled="props.unstyled"
    :variant="props.variant"
  >
    <slot name="icon">
      <close-icon></close-icon>
    </slot>
    <slot />
  </unstyled-button>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CloseButtonFactory, CloseButtonProps } from './close-button.types'
import UnstyledButton from '../unstyled-button'
import CloseIcon from './close-icon.vue'
import classes from './close-button.module.css'
import { useComponentProps, useStyles } from '../../core'
import { varsResolver } from './close-button.utils'

defineOptions({
  name: 'CCloseButton',
})

defineSlots<{
  icon: any
  default: any
}>()

const _root = ref<InstanceType<typeof UnstyledButton> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<CloseButtonProps>()

const defaultProps = {
  variant: 'subtle',
} satisfies Partial<CloseButtonProps>

const props = useComponentProps({
  component: 'CCloseButton',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'iconSize',
  'vars',
  'radius',
  'className',
  'classNames',
  'style',
  'styles',
  'unstyled',
  'dataDisabled',
  'disabled',
  'variant',
  'mod',
  'attributes',
  '__staticSelector',
]

const getStyles = useStyles<CloseButtonFactory>({
  name: props.value.__staticSelector || 'CloseButton',
  props: { ...props.value, ...attrs } as CloseButtonProps,
  classes,
  className: props.value.className,
  classNames: props.value.classNames,
  style: props.value.style,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const modList = computed(() => [
  {
    disabled: props.value.disabled || props.value.dataDisabled,
  },
])

const rootAttrs = computed(() =>
  getStyles('root', {
    variant: props.value.variant,
    active: !props.value.disabled && !props.value.dataDisabled,
  })
)

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
