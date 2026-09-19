<template>
  <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" v-bind="mergedAttrs">
    <path
      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { rem, useComponentProps } from '../../../core'
import { AccordionChevronProps } from './accordion-chevron.types'

defineOptions({
  name: 'AccordionChevron',
})

const attrs = useAttrs()

const rawProps = defineProps<AccordionChevronProps>()

const defaultProps = {
  size: 16,
} satisfies Partial<AccordionChevronProps>

const props = useComponentProps<AccordionChevronProps>({
  component: 'AccordionChevron',
  defaultProps,
  props: rawProps,
})

const mergedAttrs = computed(() => ({
  ...attrs,
  style: {
    display: 'block',
    width: rem(props.value.size),
    height: rem(props.value.size),
  },
}))
</script>
