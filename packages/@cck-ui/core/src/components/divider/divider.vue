<template>
  <c-box ref="_root" role="separator" v-bind="mergedAttrs">
    <c-box
      component="span"
      ref="_label"
      v-bind="labelAttrs"
      v-if="$slots.label"
      :mod="labelModList"
    >
      <slot name="label" />
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { DividerFactory, DividerProps } from './divider.types'
import classes from './divider.module.css'
import { varsResolver } from './divider.utils'

defineOptions({
  name: 'CDivider',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _label = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<DividerProps>()

const defaultProps = {
  orientation: 'horizontal',
} satisfies Partial<DividerProps>

const props = useComponentProps({
  component: 'CDivider',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'color',
  'orientation',
  'labelPosition',
  'mod',
  'attributes',
]

const rootModList = computed(() => [
  { orientation: props.value.orientation },
  { withLabel: !!slots.label },
])

const labelModList = computed(() => [{ position: props.value.labelPosition }])

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<DividerFactory>({
  name: 'Divider',
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
})

const rootAttrs = computed(() => getStyles('root'))

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
    ...(rootModList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const labelAttrs = computed(() => getStyles('label'))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  label: computed(() => _label.value?.root ?? null),
})
</script>
