<template>
  <span v-bind="$attrs" :class="loaderClass">
    <span :class="dotClass" />
    <span :class="dotClass" />
    <span :class="dotClass" />
  </span>
</template>

<script setup lang="ts">
import { useNamespace } from '@cck-ui/hooks'

const ns = useNamespace('loader')
const loaderClass = [ns.b('dots'), ns.e('root')]
const dotClass = ns.be('dots', 'dot')
</script>
