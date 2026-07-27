import { describe, expect, it } from 'vitest'
import { getContrastColor } from './get-contrast-color'
import { DEFAULT_THEME } from '../../default-theme'

describe('@cck-ui/core/get-contrast-color', () => {
  it('returns correct contrast color', () => {
    expect(getContrastColor({ color: 'blue', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'red', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'yellow.4', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--c-color-black)'
    )
    expect(getContrastColor({ color: 'blue.1', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--c-color-black)'
    )
    expect(getContrastColor({ color: 'lime.5', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--c-color-black)'
    )
  })

  it('always returns white when autoContrast is false', () => {
    expect(getContrastColor({ color: 'blue', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'red', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'yellow.4', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'blue.1', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--c-color-white)'
    )
    expect(getContrastColor({ color: 'lime.5', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--c-color-white)'
    )
  })
})
