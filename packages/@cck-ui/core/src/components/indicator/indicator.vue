<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <c-box ref="_indicator" v-bind="mergedIndicatorAttrs" v-if="!props.disabled && !shouldHideZero">
      <slot name="label">
        <span v-html="formattedLabel" v-if="formattedLabel != null"></span>
      </slot>
    </c-box>
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, isNumber, useComponentProps, useStyles } from '../../core'
import { IndicatorFactory, IndicatorProps } from './indicator.types'
import classes from './indicator.module.css'
import { varsResolver } from './indicator.utils'

defineOptions({
  name: 'CIndicator',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _indicator = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<IndicatorProps>()

const defaultProps = {
  position: 'top-end',
  offset: 0,
  showZero: true,
} satisfies Partial<IndicatorProps>

const props = useComponentProps({
  component: 'CIndicator',
  defaultProps,
  props: rawProps,
})

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const knownProps = [
  'style',
  'className',
  'styles',
  'classNames',
  'unstyled',
  'vars',
  'position',
  'offset',
  'inline',
  'label',
  'radius',
  'color',
  'withBorder',
  'disabled',
  'processing',
  'zIndex',
  'autoContrast',
  'maxValue',
  'showZero',
  'mod',
  'attributes',
]

const getStyles = useStyles<IndicatorFactory>({
  name: 'Indicator',
  classes,
  props: styleProps,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const modList = computed(() => [{ inline: props.value.inline }])

const rootAttrs = computed(() => getStyles('root'))
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod]), ...modList.value]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const shouldHideZero = computed(() => !props.value.showZero && Number(props.value.label) === 0)

const formattedLabel = computed(() =>
  props.value.maxValue !== undefined &&
  isNumber(props.value.label) &&
  Number(props.value.label) > props.value.maxValue
    ? `${props.value.maxValue}+`
    : props.value.label
)

const indicatorAttrs = computed(() => getStyles('indicator'))
const mergedIndicatorAttrs = computed(() => ({
  mod: [
    { 'with-label': !!props.value.label || !!slots.label },
    { 'with-border': props.value.withBorder },
    { processing: props.value.processing },
  ],
  ...indicatorAttrs.value,
}))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  indicator: computed(() => _indicator.value?.root ?? null),
})
</script>
