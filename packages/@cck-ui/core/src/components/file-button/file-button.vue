<template>
  <input
    ref="inputRef"
    style="display: none"
    type="file"
    v-bind="props.inputProps"
    :accept="props.accept"
    :capture="props.capture"
    :disabled="props.disabled"
    :form="props.form"
    :multiple="props.multiple"
    :name="props.name"
    @change="handleChange"
  />
  <slot :on-click="handleClick" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useComponentProps } from '../../core'
import { FileButtonProps } from './file-button.types'

defineOptions({
  name: 'CFileButton',
})

const inputRef = ref<HTMLInputElement | null>(null)

const rawProps = defineProps<FileButtonProps>()

const emit = defineEmits<{
  (e: 'change', payload: File | File[] | null): void
}>()

const defaultProps = {
  multiple: false,
  disabled: false,
} satisfies Partial<FileButtonProps>

const props = useComponentProps({
  component: 'CFileButton',
  defaultProps,
  props: rawProps,
})

const handleClick = () => {
  if (!props.value.disabled) {
    inputRef.value?.click()
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files === null) {
    emit('change', props.value.multiple ? [] : null)
    return
  }

  if (props.value.multiple !== false && props.value.multiple !== undefined) {
    emit('change', Array.from(target.files))
  } else {
    emit('change', target.files[0] || null)
  }
}

const reset = () => {
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

defineExpose({
  input: inputRef,
  reset,
})
</script>
