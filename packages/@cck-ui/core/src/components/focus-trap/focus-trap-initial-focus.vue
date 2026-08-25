<template>
  <c-visually-hidden tabindex="-1" data-autofocus>
    <slot />
  </c-visually-hidden>
</template>

<script setup lang="ts">
import { CVisuallyHidden } from '../visually-hidden'
defineOptions({
  name: 'CFocusTrapInitialFocus',
})
</script>
