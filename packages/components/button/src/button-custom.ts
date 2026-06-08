import { ColorScheme, useColorScheme } from '@cck-ui/hooks'
import { generateColorShades, setColorAlpha } from '@cck-ui/utils'
import { computed } from 'vue'
import { ButtonProps } from './button.types'

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
      hover: 7,
      lightBg: 1,
      lightHover: 2,
      lightColor: 9,
      outlineColor: 6,
      outlineHoverBgAlpha: 0.05
    }
  } else {
    return {
      bg: 8,
      hover: 9,
      lightBg: 1,
      lightHover: 2,
      lightColor: 9,
      outlineColor: 4,
      outlineHoverBgAlpha: 0.05
    }
  }
}

export function useButtonCustomStyle(props: ButtonProps) {
  const colorScheme = useColorScheme()

  return computed(() => {
    const styles: Record<string, string> = {}

    const { color, gradient, justify, variant } = props
    const scheme = colorScheme.value
    const idx = getShadeIndexes(scheme)

    if (justify) {
      styles['--button-justify'] = justify
    }

    switch (variant) {
      case 'default':
        break
      case 'filled':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-bg'] = `var(--c-color-${color}-filled)`
            styles['--button-hover'] = `var(--c-color-${color}-filled-hover)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-bg'] = shades[idx.bg]
            styles['--button-hover'] = shades[idx.hover]
          }
        }
        break
      case 'light':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-bg'] = `var(--c-color-${color}-light)`
            styles['--button-hover'] = `var(--c-color-${color}-light-hover)`
            styles['--button-color'] = `var(--c-color-${color}-light-color)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-bg'] = shades[idx.lightBg]
            styles['--button-hover'] = shades[idx.lightHover]
            styles['--button-color'] = shades[idx.lightColor]
          }
        }
        break
      case 'outline':
      case 'dashed':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-hover'] = `var(--c-color-${color}-outline-hover)`
            styles['--button-color'] = `var(--c-color-${color}-outline)`
            styles['--button-bd'] =
              `calc(0.0625rem * var(--c-scale)) solid var(--c-color-${color}-outline)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-hover'] = setColorAlpha(
              shades[idx.outlineColor],
              idx.outlineHoverBgAlpha
            )
            styles['--button-color'] = shades[idx.outlineColor]
            styles['--button-bd'] =
              `calc(0.0625rem * var(--c-scale)) solid ${shades[idx.outlineColor]}`
          }
        }
        break
      case 'subtle':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-hover'] = `var(--c-color-${color}-outline-hover)`
            styles['--button-color'] = `var(--c-color-${color}-outline)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-hover'] = setColorAlpha(
              shades[idx.outlineColor],
              idx.outlineHoverBgAlpha
            )
            styles['--button-color'] = shades[idx.outlineColor]
          }
        }
        break
      case 'transparent':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-color'] = `var(--c-color-${color}-light-color)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-color'] = shades[idx.lightColor]
          }
        }
        break
      case 'white':
        if (color) {
          if (PRESET_COLORS.includes(color)) {
            styles['--button-color'] = `var(--c-color-${color}-filled)`
          } else {
            const shades = generateColorShades(color)
            styles['--button-color'] = shades[idx.bg]
          }
        }
        break
      case 'gradient':
        const from = gradient?.from || 'blue'
        const to = gradient?.to || 'cyan'
        const deg = gradient?.deg || '45'

        let finalFrom: string = from
        let finalTo: string = to
        if (PRESET_COLORS.includes(from)) {
          finalFrom = `var(--c-color-${from}-filled)`
        }
        if (PRESET_COLORS.includes(to)) {
          finalTo = `var(--c-color-${to}-filled)`
        }

        styles['--button-bg'] =
          `linear-gradient(${deg}deg, ${finalFrom} 0%, ${finalTo} 100%)`
        break
      default:
        break
    }

    return styles
  })
}
