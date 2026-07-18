<template>
  <c-box tag="span" v-bind="others" :className="loaderClass" />
</template>

<script setup lang="ts">
import cx from 'clsx'
import { CBox } from '../../../core'
import type { LoaderProps } from '../loader.types'
import classes from '../loader.module.css'

const { className, attributes, ...others } = defineProps<LoaderProps>()

const loaderClass = cx(classes.ovalLoader, className)
</script>
