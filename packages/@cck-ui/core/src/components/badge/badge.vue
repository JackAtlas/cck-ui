<template>
  <c-box ref="_root" v-bind="mergedRootAttrs" :variant="props.variant">
    <c-box v-if="withLeftSection" v-bind="sectionAttrs" tag="span" :mod="{ position: 'left' }">
      <slot name="left-section">
        <span v-html="leftSection" v-if="typeof leftSection === 'string'"></span>
        <component v-else :is="leftSection" />
      </slot>
    </c-box>
    <c-box ref="_label" v-bind="labelAttrs" tag="span">
      <slot />
    </c-box>
    <c-box v-if="withRightSection" v-bind="sectionAttrs" tag="span" :mod="{ position: 'right' }">
      <slot name="right-section">
        <span v-html="rightSection" v-if="typeof rightSection === 'string'"></span>
        <component v-else :is="rightSection" />
      </slot>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import classes from './badge.module.css'
import { BadgeFactory, BadgeProps } from './badge.types'
import { varsResolver } from './badge.utils'

defineOptions({
  name: 'CBadge',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _leftSection = ref<InstanceType<typeof CBox> | null>(null)
const _rightSection = ref<InstanceType<typeof CBox> | null>(null)
const _label = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const withLeftSection = computed(() => !!slots['left-section'] || !!props.value.leftSection)
const withRightSection = computed(() => !!slots['right-section'] || !!props.value.rightSection)

const rawProps = defineProps<BadgeProps>()

const props = useComponentProps({
  component: 'CBadge',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'radius',
  'color',
  'gradient',
  'leftSection',
  'rightSection',
  'variant',
  'fullWidth',
  'autoContrast',
  'circle',
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<BadgeFactory>({
  name: 'Badge',
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

const modList = computed(() => [
  { block: props.value.fullWidth },
  { circle: props.value.circle },
  { 'with-left-section': withLeftSection.value },
  { 'with-right-section': withRightSection.value },
])

const rootAttrs = computed(() => getStyles('root', { variant: props.value.variant }))

const mergedRootAttrs = computed(() => {
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
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const sectionAttrs = computed(() => getStyles('section'))
const labelAttrs = computed(() => getStyles('label'))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  leftSection: computed(() => _leftSection.value?.root ?? null),
  rightSection: computed(() => _rightSection.value?.root ?? null),
  label: computed(() => _label.value?.root ?? null),
})
</script>
