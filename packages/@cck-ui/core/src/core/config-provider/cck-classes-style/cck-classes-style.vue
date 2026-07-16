<template></template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCckStyleNonce, useCckTheme } from '../config-provider.context'
import { em, keys, px } from '../../utils'

const theme = useCckTheme().value
const nonce = useCckStyleNonce()

const styleEl = ref<HTMLStyleElement | null>(null)

const generateClasses = () => {
  return keys(theme.breakpoints).reduce<string>((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes('px')
    const pxValue = px(theme.breakpoints[breakpoint]) as number
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1)
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue)

    return `${acc}$media (max-width: ${maxWidthBreakpoint}) {.c-visible-from-${breakpoint} {display:none !important;}}@media (min-width: ${minWidthBreakpoint}) {.c-hidden-from-${breakpoint} {display:none !important;}}`
  }, '')
}

const updateStyles = () => {
  if (!styleEl.value) {
    const el = document.createElement('style')
    el.dataset.cStyles = 'classes'
    const nonceVal = nonce?.()
    if (nonceVal) {
      el.nonce = nonceVal
    }
    document.head.appendChild(el)
    styleEl.value = el
  }
  styleEl.value.innerHTML = generateClasses()
}

onMounted(() => {
  updateStyles()
})
</script>
