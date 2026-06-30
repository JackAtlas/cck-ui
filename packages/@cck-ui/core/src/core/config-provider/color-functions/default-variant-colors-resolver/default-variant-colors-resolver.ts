import { darken } from '../darken/darken'
import { rgba } from '../rgba/rgba'
import { getGradient } from '../get-gradient/get-gradient'
import { CColor, CGradient, CTheme } from '../../theme.types'
import { parseThemeColor } from '../parse-theme-color/parse-theme-color'
import { rem } from '../../../utils'

export interface VariantColorsResolverInput {
  color: CColor | undefined
  theme: CTheme
  variant: string
  gradient?: CGradient
  autoContrast?: boolean
}

export interface VariantColorsResolverResult {
  background: string
  hover: string
  color: string
  border: string
  hoverColor?: string
}

export type VariantColorsResolver = (
  input: VariantColorsResolverInput
) => VariantColorsResolverResult

export const defaultVariantColorsResolver: VariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient,
  autoContrast,
}) => {
  const parsed = parseThemeColor({ color, theme })

  const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

  if (variant === 'none') {
    return {
      background: 'transparent',
      hover: 'transparent',
      color: 'inherit',
      border: 'none',
    }
  }

  if (variant === 'filled') {
    const textColor = _autoContrast
      ? parsed.isLight
        ? 'var(--c-color-black)'
        : 'var(--c-color-white)'
      : 'var(--c-color-white)'
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--c-color-${color}-filled)`,
          hover: `var(--c-color-${color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`,
        }
      }

      return {
        background: `var(--c-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--c-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`,
      }
    }

    return {
      background: color!,
      hover: darken(color!, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`,
    }
  }

  if (variant === 'light') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: `var(--c-color-${color}-light)`,
          hover: `var(--c-color-${color}-light-hover)`,
          color: `var(--c-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        }
      }

      const parsedColor = theme.colors[parsed.color][parsed.shade]

      return {
        background: parsedColor,
        hover: darken(parsedColor, 0.1),
        color: `var(--c-color-${parsed.color}-light-color)`,
        border: `${rem(1)} solid transparent`,
      }
    }

    return {
      background: rgba(color!, 0.1),
      hover: rgba(color!, 0.12),
      color: color!,
      border: `${rem(1)} solid transparent`,
    }
  }

  if (variant === 'outline') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--c-color-${color}-outline-hover)`,
          color: `var(--c-color-${color}-outline)`,
          border: `${rem(1)} solid var(--c-color-${color}-outline)`,
        }
      }

      return {
        background: 'transparent',
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--c-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--c-color-${parsed.color}-${parsed.shade})`,
      }
    }

    return {
      background: 'transparent',
      hover: rgba(color!, 0.05),
      color: color!,
      border: `${rem(1)} solid ${color}`,
    }
  }

  if (variant === 'subtle') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: `var(--c-color-${color}-light-hover)`,
          color: `var(--c-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        }
      }

      const parsedColor = theme.colors[parsed.color][parsed.shade]

      return {
        background: 'transparent',
        hover: rgba(parsedColor, 0.12),
        color: `var(--c-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      }
    }

    return {
      background: 'transparent',
      hover: rgba(color!, 0.12),
      color: color!,
      border: `${rem(1)} solid transparent`,
    }
  }

  if (variant === 'transparent') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'transparent',
          hover: 'transparent',
          color: `var(--c-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`,
        }
      }

      return {
        background: 'transparent',
        hover: 'transparent',
        color: `var(--c-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`,
      }
    }

    return {
      background: 'transparent',
      hover: 'transparent',
      color: color!,
      border: `${rem(1)} solid transparent`,
    }
  }

  if (variant === 'white') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          background: 'var(--c-color-white)',
          hover: darken(theme.white, 0.01),
          color: `var(--c-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`,
        }
      }

      return {
        background: 'var(--c-color-white)',
        hover: darken(theme.white, 0.01),
        color: `var(--c-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`,
      }
    }

    return {
      background: 'var(--c-color-white)',
      hover: darken(theme.white, 0.01),
      color: color!,
      border: `${rem(1)} solid transparent`,
    }
  }

  if (variant === 'gradient') {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: 'var(--c-color-white)',
      border: 'none',
    }
  }

  if (variant === 'default') {
    return {
      background: 'var(--c-color-default)',
      hover: 'var(--c-color-default-hover)',
      color: 'var(--c-color-default-color)',
      border: `${rem(1)} solid var(--c-color-default-border)`,
    }
  }

  return {} as VariantColorsResolverResult
}
