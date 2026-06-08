import { computed, ref } from 'vue'
import { ButtonGroupSectionProps } from './button-group-section.types'

export const useButtonGroupSection = (props: ButtonGroupSectionProps) => {
  const _ref = ref<HTMLDivElement>()

  const _props = computed(() => {
    const _attrs: Record<string, any> = {
      'data-variant': props.variant || 'default'
    }

    return _attrs
  })

  return {
    _ref,
    _props
  }
}
