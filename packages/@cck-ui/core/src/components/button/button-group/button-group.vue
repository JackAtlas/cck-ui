<template>
  <c-box ref="_group" role="group" v-bind="mergedAttrs">
    <template v-for="(child, index) in validChildren" :key="child.key ?? index">
      <component :is="child" />
    </template>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../../core'
import classes from '../button.module.css'
import { ButtonGroupFactory, type ButtonGroupProps } from './button-group.types'
import { useButtonGroup } from './use-button-group'
import { varsResolver } from './button-group.utils'

defineOptions({
  name: 'CButtonGroup',
})

const _group = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<ButtonGroupProps>()

const props = useComponentProps({
  component: 'CButtonGroup',
  defaultProps: {
    orientation: 'horizontal',
  },
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
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<ButtonGroupFactory>({
  name: 'ButtonGroup',
  props: styleProps,
  classes,
  className: () => props.value.className,
  style: () => props.value.style,
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
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...groupAttrs.value }
})

const { validChildren } = useButtonGroup(slots)

defineExpose({
  group: computed(() => _group.value?.root ?? null),
})
</script>
