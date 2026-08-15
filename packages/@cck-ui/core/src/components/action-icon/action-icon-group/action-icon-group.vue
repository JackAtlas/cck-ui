<template>
  <c-box ref="_group" role="group" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, useComponentProps, useStyles } from '../../../core'
import { ActionIconGroupFactory, ActionIconGroupProps } from './action-icon-group.types'
import classes from '../action-icon.module.css'
import { varsResolver } from './action-icon-group.utils'

defineOptions({
  name: 'CActionIconGroup',
})

const _group = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ActionIconGroupProps>()

const defaultProps = {
  orientation: 'horizontal',
} satisfies Partial<ActionIconGroupProps>

const props = useComponentProps({
  component: 'CActionIconGroup',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'className',
  'style',
  'classNames',
  'styles',
  'unstyled',
  'orientation',
  'vars',
  'borderWidth',
  'variant',
  'mod',
  'attributes',
]

const getStyles = useStyles<ActionIconGroupFactory>({
  name: 'ActionIconGroup',
  props: { ...props.value, ...attrs } as ActionIconGroupProps,
  classes,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
  rootSelector: 'group',
})

const modList = computed(() => [
  {
    orientation: props.value.orientation,
  },
])

const groupAttrs = computed(() => getStyles('group'))
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
  return { ...others, mod: mergedMod, ...groupAttrs.value }
})

defineExpose({
  group: computed(() => _group.value?.root ?? null),
})
</script>
