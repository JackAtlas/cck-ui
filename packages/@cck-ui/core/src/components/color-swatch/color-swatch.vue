<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <c-box tag="span" v-bind="alphaAttrs"></c-box>
    <c-box tag="span" v-bind="shadowAttrs" v-if="props.withShadow"></c-box>
    <c-box tag="span" v-bind="colorAttrs"></c-box>
    <c-box tag="span" v-bind="childrenAttrs">
      <slot />
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { ColorSwatchFactory, ColorSwatchProps } from './color-swatch.types'
import classes from './color-swatch.module.css'
import { varsResolver } from './color-swatch.utils'

defineOptions({
  name: 'CColorSwatch',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _alpha = ref<InstanceType<typeof CBox> | null>(null)
const _shadow = ref<InstanceType<typeof CBox> | null>(null)
const _color = ref<InstanceType<typeof CBox> | null>(null)
const _children = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ColorSwatchProps>()

const defaultProps = {
  withShadow: true,
} satisfies Partial<ColorSwatchProps>

const props = useComponentProps({
  component: 'CColorSwatch',
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
  'radius',
  'withShadow',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<ColorSwatchFactory>({
  name: 'ColorSwatch',
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

const rootAttrs = computed(() => getStyles('root', { focusable: true }))
const alphaAttrs = computed(() => getStyles('alphaOverlay'))
const shadowAttrs = computed(() => getStyles('shadowOverlay'))
const colorAttrs = computed(() =>
  getStyles('colorOverlay', { style: { backgroundColor: props.value.color } })
)
const childrenAttrs = computed(() => getStyles('childrenOverlay'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod])]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  alphaOverlay: computed(() => _alpha.value?.root ?? null),
  shadowOverlay: computed(() => _shadow.value?.root ?? null),
  colorOverlay: computed(() => _color.value?.root ?? null),
  childrenOverlay: computed(() => _children.value?.root ?? null),
})
</script>
