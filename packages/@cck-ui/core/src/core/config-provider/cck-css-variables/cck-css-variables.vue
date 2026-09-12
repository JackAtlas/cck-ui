<template></template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  useCckCssVariablesResolver,
  useCckStyleNonce,
  useCckTheme,
} from '../config-provider.context'
import { convertCssVariables } from '../convert-css-variables'
import { getMergedVariables } from './get-merged-variables/get-merged-variables'
import { removeDefaultVariables } from './remove-default-variables'

interface CckCssVariablesProps {
  cssVariablesSelector?: string
  deduplicateCssVariables: boolean
}

function getColorSchemeCssVariables(selectorOverride?: string) {
  return convertCssVariables(
    {
      variables: {},
      dark: { '--c-color-scheme': 'dark' },
      light: { '--c-color-scheme': 'light' },
    },
    selectorOverride
  )
}

const { cssVariablesSelector, deduplicateCssVariables } = defineProps<CckCssVariablesProps>()

const styleEl = ref<HTMLStyleElement | null>(null)

const theme = useCckTheme()
const nonce = useCckStyleNonce()
const generator = useCckCssVariablesResolver()
const mergedVariables = getMergedVariables({ theme: theme.value, generator })
const shouldCleanVariables =
  (cssVariablesSelector === undefined ||
    cssVariablesSelector === ':root' ||
    cssVariablesSelector === ':host') &&
  deduplicateCssVariables
const cleanedVariables = shouldCleanVariables
  ? removeDefaultVariables(mergedVariables)
  : mergedVariables
const css = convertCssVariables(cleanedVariables, cssVariablesSelector)

const updateStyles = () => {
  if (!styleEl.value) {
    const el = document.createElement('style')
    el.dataset.cStyles = 'variables'
    const nonceVal = nonce?.()
    if (nonceVal) {
      el.nonce = nonceVal
    }
    document.head.appendChild(el)
    styleEl.value = el
  }
  styleEl.value.innerHTML = css
}

onMounted(() => {
  updateStyles()
})
</script>
