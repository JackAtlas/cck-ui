<template>
  <span v-if="formatted !== null">{{ formatted }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useComponentProps } from '../../core'
import { NumberFormatterProps } from './number-formatter.types'

defineOptions({
  name: 'CNumberFormatter',
})

const rawProps = defineProps<NumberFormatterProps>()

const defaultProps: Partial<NumberFormatterProps> = {
  allowNegative: true,
  decimalScale: Infinity,
  decimalSeparator: '.',
  fixedDecimalScale: false,
  thousandSeparator: ',',
  thousandsGroupStyle: 'thousand',
  prefix: '',
  suffix: '',
}

const props = useComponentProps({
  component: 'CNumberFormatter',
  defaultProps,
  props: rawProps,
})

const formatted = computed(() => {
  const {
    value,
    allowNegative,
    decimalScale,
    decimalSeparator,
    fixedDecimalScale,
    prefix,
    suffix,
    thousandSeparator,
    thousandsGroupStyle,
  } = props.value

  if (value === undefined || value === null) {
    return null
  }

  let num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) {
    return String(value)
  }

  if (!allowNegative && num < 0) {
    num = Math.abs(num)
  }

  let [intPart, decPart] = num.toString().split('.')
  if (decPart === undefined) {
    decPart = ''
  }

  if (decimalScale !== undefined && Number.isFinite(decimalScale)) {
    const factor = 10 ** decimalScale
    num = Math.round(num * factor) / factor
    const parts = num.toString().split('.')
    intPart = parts[0]
    decPart = parts[1] || ''
    if (fixedDecimalScale) {
      decPart = decPart.padEnd(decimalScale, '0')
    } else if (decimalScale === 0) {
      decPart = ''
    }
  }

  let sep: string = defaultProps.thousandSeparator as string
  if (typeof thousandSeparator === 'string') {
    sep = thousandSeparator === '' ? (defaultProps.thousandSeparator as string) : thousandSeparator
  } else if (typeof thousandSeparator === 'boolean') {
    sep = thousandSeparator ? (defaultProps.thousandSeparator as string) : ''
  }

  let formattedInt = intPart
  if (sep && thousandsGroupStyle !== 'none') {
    if (thousandsGroupStyle === 'thousand') {
      formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
    } else if (thousandsGroupStyle === 'wan') {
      formattedInt = intPart.replace(/\B(?=(\d{4})+(?!\d))/g, sep)
    } else if (thousandsGroupStyle === 'lakh') {
      const len = intPart.length
      if (len <= 3) {
        formattedInt = intPart
      } else {
        const firstGroup = len % 2 === 0 ? 2 : 1
        const parts = [
          intPart.slice(0, firstGroup),
          ...(intPart.slice(firstGroup).match(/.{1,2}/g) || []),
        ]
        formattedInt = parts.join(sep)
      }
    } else {
      formattedInt = intPart
    }
  }

  let result = formattedInt
  if (decPart) {
    result += decimalSeparator + decPart
  }
  return prefix + result + suffix
})
</script>
