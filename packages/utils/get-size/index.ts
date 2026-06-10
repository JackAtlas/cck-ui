import { isNumberLike } from '../types'
import { rem } from '../units-converter'

export function getSize(
  size: unknown,
  prefix = 'size',
  converToRem = true
): string | undefined {
  if (size === undefined) return undefined

  return isNumberLike(size)
    ? converToRem
      ? rem(size)
      : (size as string)
    : `var(--${prefix}-${size})`
}

export function getSpacing(size: unknown) {
  return getSize(size, 'c-spacing')
}

export function getRadius(size: unknown) {
  if (size === undefined) {
    return 'var(--c-radius-default)'
  }

  return getSize(size, 'c-radius')
}

export function getFontSize(size: unknown) {
  return getSize(size, 'c-font-size')
}

export function getLineHeight(size: unknown) {
  return getSize(size, 'c-line-height', false)
}

export function getShadow(size: unknown) {
  if (!size) return undefined

  return getSize(size, 'c-shadow', false)
}
