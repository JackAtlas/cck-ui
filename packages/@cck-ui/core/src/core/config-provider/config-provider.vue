<template>
  <slot />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { CONFIG_KEY, type ConfigProviderProps, THEME_KEY } from './config-provider.types'
import './baseline.css'
import './global.css'
import './default-css-variables.css'
import { useProviderColorScheme } from './use-provider-color-scheme/use-provider-color-scheme'
import { localStorageColorSchemeManager } from './color-scheme-managers'
import { useRespectReduceMotion } from './use-respect-reduce-motion/use-respect-reduce-motion'

defineOptions({
  name: 'CckConfigProvider',
})

const config = withDefaults(defineProps<ConfigProviderProps>(), {
  withStaticClasses: true,
  withGlobalClasses: true,
  withCssVariables: true,
  classNamesPrefix: 'c',
  defaultColorScheme: 'light',
  colorSchemeManager: () => localStorageColorSchemeManager(),
  getRootElement: () => document.documentElement,
})

const { defaultColorScheme, forceColorScheme, colorSchemeManager, getRootElement } = config

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

provide(CONFIG_KEY, { ...config, colorScheme, setColorScheme, clearColorScheme })
config.theme && provide(THEME_KEY, config.theme)
</script>
