import { computed, ref } from 'vue'
import { ButtonProps } from './button.types'
import { useFormDisabled } from '@cck-ui/core'
import { useLoading } from '@cck-ui/hooks'

export const useButton = (
  props: ButtonProps,
  slots: {
    hasLeftSlot: boolean
    hasRightSlot: boolean
  }
) => {
  const _disabled = useFormDisabled()
  const _loading = useLoading()
  const _ref = ref<HTMLButtonElement>()

  const { hasLeftSlot, hasRightSlot } = slots

  const hasLeftSection = hasLeftSlot || !!props.leftSection
  const hasRightSection = hasRightSlot || !!props.rightSection

  const _props = computed(() => {
    const _attrs: Record<string, any> = {
      'data-disabled': _disabled.value || undefined,
      'data-block': props.fullWidth || undefined,
      'data-loading': _loading.value || undefined,
      'data-size': props.size && props.size !== 'sm' ? props.size : undefined,
      'data-with-left-section': hasLeftSection || undefined,
      'data-with-right-section': hasRightSection || undefined,
      'data-variant': props.variant || 'default'
    }
    if (props.tag === 'button') {
      _attrs['aria-disabled'] = _disabled.value || undefined
      _attrs['disabled'] = _disabled.value
    }
    return _attrs
  })

  const handleClick = (evt: MouseEvent) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation()
      return
    }
  }

  return {
    _disabled,
    _loading,
    _ref,
    _props,
    handleClick
  }
}
