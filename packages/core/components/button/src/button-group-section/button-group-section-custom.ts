import { ColorScheme, useColorScheme } from '@cck-ui/hooks'
import { ButtonGroupSectionProps } from './button-group-section.types'
import { computed } from 'vue'
import { generateColorShades } from '@cck-ui/core/core/utils'

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
  if (scheme === 'light') {
    return {
      bg: 6,
      lightBg: 1,
      lightColor: 9,
      outlineColor: 6
    }
  } else {
    return {
      bg: 8,
      lightBg: 1,
      lightColor: 9,
      outlineColor: 4
    }
  }
}

export function useButtonGroupSectionCustomStyle(
  props: ButtonGroupSectionProps
) {
  const colorScheme = useColorScheme()

  return computed(() => {
    const styles: Record<string, string> = {}

    const { color, gradient, variant } = props
    const scheme = colorScheme.value
    const idx = getShadeIndexes(scheme)

    switch (variant) {
      case 'default':
        break
      case 'filled':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-bg'] = `var(--c-color-${color}-filled)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-bg'] = shades[idx.bg]
          }
        }
        break
      case 'light':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-bg'] = `var(--c-color-${color}-light)`
            styles['--section-color'] = `var(--c-color-${color}-light-color)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-bg'] = shades[idx.lightBg]
            styles['--section-color'] = shades[idx.lightColor]
          }
        }
        break
      case 'outline':
      case 'dashed':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-color'] = `var(--c-color-${color}-outline)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-color'] = shades[idx.outlineColor]
          }
        }
        break
      case 'subtle':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-color'] = `var(--c-color-${color}-outline)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-color'] = shades[idx.outlineColor]
          }
        }
        break
      case 'transparent':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-color'] = `var(--c-color-${color}-light-color)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-color'] = shades[idx.lightColor]
          }
        }
        break
      case 'white':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--section-color'] = `var(--c-color-${color}-filled)`
          } else {
            const shades = generateColorShades(color)
            styles['--section-color'] = shades[idx.bg]
          }
        }
        break
      case 'gradient':
        const from = gradient?.from || 'blue'
        const to = gradient?.to || 'cyan'
        const deg = gradient?.deg || 45

        let finalFrom: string = from
        let finalTo: string = to
        if (PRESET_COLORS.includes(from)) {
          finalFrom = `var(--c-color-${from}-filled)`
        }
        if (PRESET_COLORS.includes(to)) {
          finalTo = `var(--c-color-${to}-filled)`
        }

        styles['--section-bg'] =
          `linear-gradient(${deg}deg, ${finalFrom} 0%, ${finalTo} 100%)`
        styles['--section-color'] = 'var(--c-color-white)'
        break
      default:
        break
    }

    return styles
  })
}
