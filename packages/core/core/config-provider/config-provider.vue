<template>
  <slot />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import {
  CONFIG_KEY,
  type ConfigProviderProps,
  THEME_KEY
} from './config-provider.types'

defineOptions({
  name: 'CckConfigProvider'
})

const config = defineProps<ConfigProviderProps>()

provide(CONFIG_KEY, config)
config.theme && provide(THEME_KEY, config.theme)
</script>
