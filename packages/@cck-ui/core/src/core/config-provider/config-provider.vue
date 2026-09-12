<template>
  <cck-classes-style v-if="props.withGlobalClasses" />
  <cck-css-variables
    v-if="props.withCssVariables"
    :css-variables-selector="props.cssVariablesSelector"
    :deduplicate-css-variables="props.deduplicateCssVariables"
  />
  <slot />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { CONFIG_KEY, type ConfigProviderProps, THEME_KEY } from './config-provider.types'
import { useProviderColorScheme } from './use-cck-color-scheme/use-provider-color-scheme'
import { localStorageColorSchemeManager } from './color-scheme-managers'
import { useRespectReduceMotion } from './use-respect-reduce-motion/use-respect-reduce-motion'
import { CckClassesStyle } from './cck-classes-style'
import { DEFAULT_THEME } from './default-theme'
import { mergeCckTheme } from './merge-cck-theme'
import { CContextValue } from './config-provider.context'
import { CckCssVariables } from './cck-css-variables'
import { useComponentProps } from './use-component-props/use-component-props'
import './baseline.css'
import './global.css'
import './default-css-variables.css'

defineOptions({
  name: 'CckConfigProvider',
})

const rawProps = defineProps<ConfigProviderProps>()

const props = useComponentProps({
  component: 'ConfigProvider',
  defaultProps: {
    withStaticClasses: true,
    withGlobalClasses: true,
    withCssVariables: true,
    deduplicateCssVariables: true,
    classNamesPrefix: 'c',
    defaultColorScheme: 'light',
    cssVariablesSelector: ':root',
    colorSchemeManager: localStorageColorSchemeManager(),
    getRootElement: () => document.documentElement,
  },
  props: rawProps,
  booleanProps: [
    'deduplicateCssVariables',
    'withCssVariables',
    'withGlobalClasses',
    'withStaticClasses',
  ],
})

const {
  defaultColorScheme,
  forceColorScheme,
  colorSchemeManager,
  getRootElement,
  theme: userTheme,
} = props.value

const finalTheme = computed(() => {
  if (userTheme) {
    return mergeCckTheme(DEFAULT_THEME, userTheme)
  }

  return DEFAULT_THEME
})

const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
  defaultColorScheme: defaultColorScheme!,
  forceColorScheme,
  manager: colorSchemeManager!,
  getRootElement: getRootElement!,
})

useRespectReduceMotion({
  respectReduceMotion: props.value.theme?.respectReducedMotion || false,
  getRootElement: getRootElement!,
})

const { theme: _excludedTheme, ...configWithoutTheme } = props.value
provide<CContextValue>(CONFIG_KEY, {
  ...configWithoutTheme,
  getRootElement: getRootElement!,
  classNamesPrefix: props.value.classNamesPrefix!,
  colorScheme: colorScheme!,
  getStyleNonce: props.value.getStyleNonce,
  cssVariablesResolver: props.value.cssVariablesResolver,
  cssVariablesSelector: props.value.cssVariablesSelector!,
  setColorScheme,
  clearColorScheme,
})
provide(THEME_KEY, finalTheme)
</script>
