<template>
  <c-box
    aria-hidden="true"
    class-name=""
    tag="span"
    v-bind="rootAttrs"
    :data-empty="props.empty || undefined"
  >
    <c-box
      class-name=""
      tag="span"
      v-bind="mergedColumnAttrs"
      :data-direction="direction"
      :key="props.digit"
    >
      <span v-for="(d, i) in STRIP_CELLS" :key="i">{{ d }}</span>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { DigitColumnProps } from './digit-column.types'
import { ROLLING_NUMBER_KEY, STRIP_CELLS } from '../rolling-number.constant'

defineOptions({
  name: 'CDigitColumn',
})

const rawProps = defineProps<DigitColumnProps>()

const props = useComponentProps({
  component: 'CDigitColumn',
  defaultProps: {},
  props: rawProps,
})

const digitIndex = computed(() => parseInt(props.value.digit, 10))
const previousDigitIndex = computed(() =>
  props.value.previousDigit !== null ? parseInt(props.value.previousDigit, 10) : digitIndex.value
)

const wrapsForward = computed(
  () =>
    props.value.valueDirection === 'up' &&
    props.value.previousDigit !== null &&
    digitIndex.value < previousDigitIndex.value &&
    digitIndex.value <= 1
)

const animateToIndex = computed(() =>
  wrapsForward.value ? digitIndex.value + 10 : digitIndex.value
)
const direction = computed(() => (digitIndex.value >= previousDigitIndex.value ? 'up' : 'down'))

const rollingNumberContext = inject(ROLLING_NUMBER_KEY)

const rootAttrs = computed(() => rollingNumberContext?.getStyles('digit'))
const columnAttrs = computed(() => rollingNumberContext?.getStyles('digitColumn'))

const mergedColumnAttrs = computed(() => ({
  ...columnAttrs.value,
  style: {
    ...(columnAttrs.value?.style || {}),
    transform: `translateY(${-digitIndex.value}em)`,
    ['--rn-roll-from' as any]: `translateY(${-previousDigitIndex.value}em)`,
    ['--rn-roll-to' as any]: `translateY(${-animateToIndex.value}em)`,
  },
}))
</script>
