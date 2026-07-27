import { describe, expect, it } from 'vitest'
import { colorResolver } from './color-resolver'
import { DEFAULT_THEME } from '../../../../config-provider'

describe('@cck-ui/core/Box/color-resolver', () => {
  it('resolves theme color', () => {
    expect(colorResolver('red', DEFAULT_THEME)).toBe('var(--c-color-red-filled)')
    expect(colorResolver('red.5', DEFAULT_THEME)).toBe('var(--c-color-red-5)')
  })

  it('resolves non theme color', () => {
    expect(colorResolver('#fefefe', DEFAULT_THEME)).toBe('#fefefe')
  })

  it('throws error if color is not string', () => {
    expect(() => colorResolver(1 as any, DEFAULT_THEME)).toThrow()
  })

  it('resolves white and black colors', () => {
    expect(colorResolver('white', DEFAULT_THEME)).toBe('var(--c-color-white)')
    expect(colorResolver('black', DEFAULT_THEME)).toBe('var(--c-color-black)')
  })

  it('resolves dimmed color', () => {
    expect(colorResolver('dimmed', DEFAULT_THEME)).toBe('var(--c-color-dimmed)')
  })
})
