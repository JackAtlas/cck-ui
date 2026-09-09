<template>
  <c-box
    ref="_root"
    v-bind="mergedAttrs"
    :aria-label="accessibleValue"
    :role="props.withLiveRegion ? 'status' : 'img'"
  >
    <c-box aria-hidden="true" tag="span" v-bind="copyAttrs">{{ accessibleValue }}</c-box>
    <template v-for="slot in slots" :key="slot.key">
      <digit-column
        v-if="slot.type === 'digit'"
        :digit="slot.digit"
        :empty="slot.empty"
        :previous-digit="slot.previousDigit"
        :value-direction="valueDirection"
      />
      <c-box
        aria-hidden="true"
        tag="span"
        v-bind="charAttrs"
        v-else
        :data-empty="slot.empty || undefined"
      >
        {{ slot.char }}
      </c-box>
    </template>
  </c-box>
</template>

<script setup lang="ts">
import { computed, provide, ref, useAttrs, watch } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { RollingNumberFactory, RollingNumberProps } from './rolling-number.types'
import { varsResolver } from './rolling-number.utils'
import { buildValue } from './build-value'
import { getDigitParts } from './get-digit-parts/get-digit-parts'
import { getRenderSlots } from './get-render-slots/get-render-slots'
import DigitColumn from './digit-column/digit-column.vue'
import classes from './rolling-number.module.css'
import { ROLLING_NUMBER_KEY } from './rolling-number.constant'

defineOptions({
  name: 'CRollingNumber',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<RollingNumberProps>()

const defaultProps = {
  animationDuration: 600,
  timingFunction: 'ease',
  decimalSeparator: '.',
  tabularNumbers: true,
} satisfies Partial<RollingNumberProps>

const props = useComponentProps({
  component: 'CRollingNumber',
  defaultProps,
  props: rawProps,
})

const previousValue = ref(props.value.value)

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'value',
  'prefix',
  'suffix',
  'decimalSeparator',
  'thousandSeparator',
  'decimalScale',
  'fixedDecimalScale',
  'animationDuration',
  'timingFunction',
  'tabularNumbers',
  'withLiveRegion',
  'mod',
  'attributes',
]

const modList = computed(() => [
  {
    'tabular-numbers': props.value.tabularNumbers,
  },
])

const getStyles = useStyles<RollingNumberFactory>({
  name: 'RollingNumber',
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
const copyAttrs = computed(() => getStyles('copyValue'))
const charAttrs = computed(() => getStyles('char'))

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

const valueDirection = computed<'up' | 'down'>(() =>
  props.value.value >= previousValue.value ? 'up' : 'down'
)

const current = computed(() =>
  getDigitParts({
    value: props.value.value,
    decimalScale: props.value.decimalScale,
    fixedDecimalScale: props.value.fixedDecimalScale,
  })
)

const prev = computed(() =>
  getDigitParts({
    value: previousValue.value,
    decimalScale: props.value.decimalScale,
    fixedDecimalScale: props.value.fixedDecimalScale,
  })
)

const slots = computed(() => {
  let ts = ''
  const thousandSeparator = props.value.thousandSeparator
  if (typeof thousandSeparator === 'string') {
    ts = thousandSeparator === '' ? ',' : thousandSeparator
  } else if (typeof thousandSeparator === 'boolean') {
    ts = thousandSeparator ? ',' : ''
  }
  return getRenderSlots({
    current: current.value,
    previous: prev.value,
    prefix: props.value.prefix,
    suffix: props.value.suffix,
    decimalSeparator: props.value.decimalSeparator,
    thousandSeparator: ts,
  })
})

const accessibleValue = computed(() => {
  let ts = ''
  const thousandSeparator = props.value.thousandSeparator
  if (typeof thousandSeparator === 'string') {
    ts = thousandSeparator === '' ? ',' : thousandSeparator
  } else if (typeof thousandSeparator === 'boolean') {
    ts = thousandSeparator ? ',' : ''
  }
  return buildValue({
    value: props.value.value,
    prefix: props.value.prefix,
    suffix: props.value.suffix,
    decimalSeparator: props.value.decimalSeparator,
    thousandSeparator: ts,
    decimalScale: props.value.decimalScale,
    fixedDecimalScale: props.value.fixedDecimalScale,
  })
})

provide(ROLLING_NUMBER_KEY, { getStyles })

watch(
  () => props.value.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      previousValue.value = oldVal!
    }
  },
  { immediate: true }
)

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  current,
})
</script>
