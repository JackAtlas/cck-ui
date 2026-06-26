<template>
  <c-box tag="span" v-bind="others" :class="loaderClass">
    <span :class="classes.bar" />
    <span :class="classes.bar" />
    <span :class="classes.bar" />
  </c-box>
</template>

<script setup lang="ts">
import cx from 'clsx'
import type { LoaderProps } from '../loader.types'
import classes from '../loader.module.css'

const { className, ...others } = defineProps<LoaderProps>()

const loaderClass = cx(classes.barsLoader, className)
</script>
