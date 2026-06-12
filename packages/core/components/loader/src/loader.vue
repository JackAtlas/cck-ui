<template>
  <component :is="activeLoader" :ref="_ref" :style="loaderStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LoaderProps } from './loader.types'
import { useLoader } from './use-loader'
import { useLoaderCustomStyle } from './loader-custom'
import { CDefaultLoaders } from '..'

defineOptions({
  name: 'CLoader'
})

const props = withDefaults(defineProps<LoaderProps>(), {
  size: 'md'
})

const mergedLoaders = computed(() => ({
  ...CDefaultLoaders,
  ...props.loaders
}))

const activeLoader = computed(() => {
  if (!props.type) return CDefaultLoaders.oval

  const loader = mergedLoaders.value[props.type]
  if (!loader) {
    console.warn(
      `[Loader] Unknown type "${props.type}", falling back to "oval".`
    )
    return CDefaultLoaders.oval
  }
  return loader
})

const { _ref } = useLoader()

const loaderStyle = useLoaderCustomStyle(props)

defineExpose({
  /** @description loader html element */
  ref: _ref,
  /** @description loader size */
  size: props.size
})
</script>
