import { toRgba } from '../to-rgba/to-rgba'

export function rgb(color: string): string {
  if (typeof color !== 'string') {
    return 'rgb(0, 0, 0)'
  }

  if (color.startsWith('var(')) {
    return color
  }

  if (color.startsWith('oklch')) {
    return color
  }

  const { r, g, b } = toRgba(color)
  return `rgb(${r}, ${g}, ${b})`
}

export function rgba(color: string, alpha: number) {
  if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
    return `rgba(0, 0, 0, 1)`
  }

  if (color.startsWith('var(')) {
    const mixPercentage = (1 - alpha) * 100
    return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`
  }

  if (color.startsWith('oklch')) {
    if (color.includes('/')) {
      return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha})`)
    }

    return color.replace(')', ` / ${alpha})`)
  }

  const { r, g, b } = toRgba(color)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const alpha = rgba
