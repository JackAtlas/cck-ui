import {} from '@cck-ui/components'
import { computed, ref } from 'vue'
import { ButtonProps } from './button.types'
import { useFormDisabled } from '@cck-ui/components/form'

export const useButton = (props: ButtonProps) => {
  const _disabled = useFormDisabled()
  const _ref = ref<HTMLButtonElement>()

  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: _disabled.value || props.loading || undefined,
        'data-disabled': _disabled.value || props.loading || undefined,
        disabled: _disabled.value || props.loading,
        'data-block': props.fullWidth || undefined,
        'data-size': props.size || undefined,
        'data-variant': props.variant || 'default'
      }
    }
    return {}
  })

  const handleClick = (evt: MouseEvent) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation()
      return
    }
  }

  return {
    _ref,
    _props,
    handleClick
  }
}
