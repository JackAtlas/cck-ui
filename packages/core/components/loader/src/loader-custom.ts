import { ColorScheme, useColorScheme } from '@cck-ui/hooks'
import { LoaderProps } from './loader.types'
import { computed } from 'vue'
import { generateColorShades } from '@cck-ui/utils'
import { getSize } from '@cck-ui/utils/get-size'

const PRESET_COLORS = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
  'gray',
  'dark'
]

const getShadeIndexes = (scheme: ColorScheme) => {
  return scheme === 'light' ? 6 : 8
}

export function useLoaderCustomStyle(props: LoaderProps) {
  const colorScheme = useColorScheme()

  return computed(() => {
    const styles: Record<string, string> = {}

    const { color, size } = props
    const scheme = colorScheme.value
    const idx = getShadeIndexes(scheme)

    if (color) {
      if (PRESET_COLORS.includes(color)) {
        styles['--loader-color'] = `var(--c-color-${color}-filled)`
      } else {
        const shades = generateColorShades(color)
        styles['--loader-color'] = shades[idx]
      }
    }

    if (size) {
      styles['--loader-size'] = getSize(size, 'loader-size') as string
    }

    return styles
  })
}
