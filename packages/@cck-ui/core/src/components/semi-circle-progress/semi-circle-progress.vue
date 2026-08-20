<template>
  <c-box ref="_root" v-bind="mergedRootAttrs" :size="props.size">
    <c-box
      v-bind="labelAttrs"
      v-if="$slots.label"
      :data-position="props.labelPosition"
      :data-orientation="props.orientation"
    >
      <slot name="label" />
    </c-box>

    <svg
      v-bind="svgAttrs.rest"
      :class="svgAttrs.className"
      :style="svgAttrs.style"
      :width="props.size"
      :height="props.size! / 2"
      :viewBox="`0 0 ${props.size} ${props.size! / 2}`"
    >
      <circle
        fill="none"
        stroke="var(--scp-empty-segment-color)"
        v-bind="emptySegmentAttrs.rest"
        :class="emptySegmentAttrs.className"
        :style="emptySegmentAttrs.style"
        :cx="coordinateForCircle"
        :cy="coordinateForCircle"
        :r="radius"
        :stroke-width="props.thickness"
        :stroke-dasharray="circumference"
      />

      <circle
        fill="none"
        stroke="var(--scp-filled-segment-color)"
        v-bind="filledSegmentAttrs.rest"
        :class="filledSegmentAttrs.className"
        :style="filledSegmentAttrs.style"
        :cx="coordinateForCircle"
        :cy="coordinateForCircle"
        :r="radius"
        :stroke-width="props.thickness"
        :stroke-dasharray="circumference"
      />
    </svg>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { SemiCircleProgressFactory, SemiCircleProgressProps } from './semi-circle-progress.types'
import classes from './semi-circle-progress.module.css'
import { varsResolver } from './semi-circle-progress.utils'
import { clamp } from 'es-toolkit'

defineOptions({
  name: 'CSemiCircleProgress',
})

const rawProps = defineProps<SemiCircleProgressProps>()

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const defaultProps = {
  size: 200,
  thickness: 12,
  orientation: 'up',
  fillDirection: 'left-to-right',
  labelPosition: 'bottom',
} satisfies Partial<SemiCircleProgressProps>

const props = useComponentProps({
  component: 'CSemiCircleProgress',
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
  'size',
  'thickness',
  'value',
  'orientation',
  'fillDirection',
  'filledSegmentColor',
  'emptySegmentColor',
  'transitionDuration',
  'label',
  'labelPosition',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<SemiCircleProgressFactory>({
  name: 'SemiCircleProgress',
  props: styleProps,
  classes,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const coordinateForCircle = computed(() => props.value.size! / 2)
const radius = computed(() => (props.value.size! - 2 * props.value.thickness!) / 2)
const circumference = computed(() => Math.PI * radius.value)
const semiCirclePercentage = computed(
  () => clamp(props.value.value, 0, 100) * (circumference.value / 100)
)

const rootAttrs = computed(() => getStyles('root'))
const labelAttrs = computed(() => getStyles('label'))

const svgAttrs = computed(() => {
  const attrsResult = getStyles('svg')
  const { className, style, ...rest } = attrsResult
  return { className, style: style as any, rest }
})

const emptySegmentAttrs = computed(() => {
  const attrsResult = getStyles('emptySegment', {
    style: { strokeDashoffset: circumference.value },
  })
  const { className, style, ...rest } = attrsResult
  return { className, style: style as any, rest }
})
const filledSegmentAttrs = computed(() => {
  const attrsResult = getStyles('filledSegment', {
    style: {
      strokeDashoffset: semiCirclePercentage.value,
      ...(semiCirclePercentage.value === 0 ? { strokeOpacity: 0 } : null),
    },
  })
  const { className, style, ...rest } = attrsResult
  return { className, style: style as any, rest }
})

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
