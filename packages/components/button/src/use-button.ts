import {} from '@cck-ui/components'
import { computed, ref } from 'vue'
import { ButtonProps } from './button.types'
import { useFormDisabled } from '@cck-ui/components/form'

export const useButton = (
  props: ButtonProps,
  slots: {
    hasLeftSlot: boolean
    hasRightSlot: boolean
  }
) => {
  const _disabled = useFormDisabled()
  const _ref = ref<HTMLButtonElement>()

  const { hasLeftSlot, hasRightSlot } = slots

  const hasLeftSection = hasLeftSlot || !!props.leftSection
  const hasRightSection = hasRightSlot || !!props.rightSection

  const _props = computed(() => {
    const _attrs: Record<string, any> = {
      'data-disabled': _disabled.value || props.loading || undefined,
      'data-block': props.fullWidth || undefined,
      'data-size': props.size && props.size !== 'sm' ? props.size : undefined,
      'data-with-left-section': hasLeftSection || undefined,
      'data-with-right-section': hasRightSection || undefined,
      'data-variant': props.variant || 'default'
    }
    if (props.tag === 'button') {
      _attrs['aria-disabled'] = _disabled.value || props.loading || undefined
      _attrs['disabled'] = _disabled.value || props.loading
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
    _ref,
    _props,
    handleClick
  }
}
