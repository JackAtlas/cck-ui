import { rem } from '@cck-ui/core/core/utils'
import { computed } from 'vue'
import { ButtonGroupProps } from './button-group.types'

export function useButtonGroupCustomStyle(props: ButtonGroupProps) {
  return computed(() => {
    const styles: Record<string, string> = {}

    const { borderWidth } = props

    styles['--button-border-width'] = rem(borderWidth)

    return styles
  })
}
