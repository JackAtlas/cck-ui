import { GridProps } from './grid.types'
import { computed } from 'vue'

export function useGridCustomStyle(props: GridProps) {
  return computed(() => {
    const styles: Record<string, string> = {}

    const { gap } = props

    styles['--grid-gap'] = `var(--c-spacing-${gap})`

    return styles
  })
}
