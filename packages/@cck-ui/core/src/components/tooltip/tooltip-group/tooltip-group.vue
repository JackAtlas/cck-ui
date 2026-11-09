<template>
  <slot />
</template>

<script setup lang="ts">
import { useComponentProps } from '../../../core'
import { createTooltipGroupContext, provideTooltipGroupContext } from './tooltip-group.context'
import { TooltipGroupProps } from './tooltip-group.types'

defineOptions({
  name: 'CTooltipGroup',
})

const rawProps = defineProps<TooltipGroupProps>()

const defaultProps = {
  openDelay: 0,
  closeDelay: 0,
} satisfies Partial<TooltipGroupProps>

const props = useComponentProps<TooltipGroupProps>({
  component: 'CTooltipGroup',
  defaultProps,
  props: rawProps,
})

provideTooltipGroupContext(
  createTooltipGroupContext(props.value.openDelay!, props.value.closeDelay!)
)
</script>
