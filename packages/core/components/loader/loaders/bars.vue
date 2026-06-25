<template>
  <span v-bind="$attrs" :class="loaderClass">
    <span :class="barClass" />
    <span :class="barClass" />
    <span :class="barClass" />
  </span>
</template>

<script setup lang="ts">
import { useNamespace } from '@cck-ui/hooks'

const ns = useNamespace('loader')
const loaderClass = [ns.b('bars'), ns.e('root')]
const barClass = ns.be('bars', 'bar')
</script>
