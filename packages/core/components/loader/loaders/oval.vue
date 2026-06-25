<template>
  <span v-bind="$attrs" :class="loaderClass" />
</template>

<script setup lang="ts">
import { useNamespace } from '@cck-ui/hooks'

const ns = useNamespace('loader')
const loaderClass = [ns.b('oval'), ns.e('root')]
</script>
