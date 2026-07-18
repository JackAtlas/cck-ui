<template>
  <cck-classes-style v-if="withGlobalClasses" />
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
import './baseline.css'
import './global.css'
import './default-css-variables.css'

defineOptions({
  name: 'CckConfigProvider',
})

// withDefaults will be undefined in vitest
const props = defineProps<ConfigProviderProps>()

const config = {
  withStaticClasses: props.withStaticClasses ?? true,
  withGlobalClasses: props.withGlobalClasses ?? true,
  withCssVariables: props.withCssVariables ?? true,
  classNamesPrefix: props.classNamesPrefix ?? 'c',
  defaultColorScheme: props.defaultColorScheme ?? 'light',
  cssVariablesSelector: props.cssVariablesSelector ?? ':root',
  colorSchemeManager: props.colorSchemeManager ?? localStorageColorSchemeManager(),
  getRootElement: props.getRootElement ?? (() => document.documentElement),
  theme: props.theme,
  stylesTransform: props.stylesTransform,
  env: props.env,
  forceColorScheme: undefined,
}

const {
  defaultColorScheme,
  forceColorScheme,
  colorSchemeManager,
  getRootElement,
  theme: userTheme,
} = config

const finalTheme = computed(() => {
  if (userTheme) {
    return mergeCckTheme(DEFAULT_THEME, userTheme)
  }

  return DEFAULT_THEME
})

const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
  defaultColorScheme,
  forceColorScheme,
  manager: colorSchemeManager,
  getRootElement,
})

useRespectReduceMotion({
  respectReduceMotion: config.theme?.respectReducedMotion || false,
  getRootElement,
})

const { theme: _excludedTheme, ...configWithoutTheme } = config
provide<CContextValue>(CONFIG_KEY, {
  ...configWithoutTheme,
  colorScheme,
  setColorScheme,
  clearColorScheme,
})
provide(THEME_KEY, finalTheme)
</script>
