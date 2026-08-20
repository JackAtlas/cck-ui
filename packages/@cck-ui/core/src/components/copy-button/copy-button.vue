<template>
  <slot :copied="copied" :copy="copy" />
</template>

<script setup lang="ts">
import { useClipboard } from '@cck-ui/hooks'
import { useComponentProps } from '../../core'
import { CopyButtonProps } from './copy-button.types'
import { computed } from 'vue'

defineOptions({
  name: 'CCopyButton',
})

const rawProps = defineProps<CopyButtonProps>()

const defaultProps = {
  timeout: 1000,
} satisfies Partial<CopyButtonProps>

const props = useComponentProps({
  component: 'CCopyButton',
  defaultProps,
  props: rawProps,
})

const clipboard = useClipboard({ copiedDuring: props.value.timeout })
const copied = computed(() => clipboard.copied.value)
const copy = async () => {
  await clipboard.copy(props.value.value)
}
</script>
