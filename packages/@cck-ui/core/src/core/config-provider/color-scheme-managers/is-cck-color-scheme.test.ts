import { describe, expect, it } from 'vitest'
import { isCckColorScheme } from './is-cck-color-scheme'

describe('@cck-ui/core/CckConfigProvider/is-cck-color-scheme', () => {
  it('returns true for valid color schemes', () => {
    expect(isCckColorScheme('auto')).toBe(true)
    expect(isCckColorScheme('dark')).toBe(true)
    expect(isCckColorScheme('light')).toBe(true)
  })

  it('returns false for invalid color schemes', () => {
    expect(isCckColorScheme('')).toBe(false)
    expect(isCckColorScheme('invalid')).toBe(false)
  })
})
