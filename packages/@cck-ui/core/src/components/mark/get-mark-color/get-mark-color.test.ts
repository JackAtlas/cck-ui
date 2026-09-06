import { describe, expect, it } from 'vitest'
import { getMarkColor } from './get-mark-color'
import { DEFAULT_THEME } from '../../../core'

describe('@cck-ui/core/mark/get-mark-color', () => {
  it('returns correct color for theme color', () => {
    expect(getMarkColor({ color: 'red', theme: DEFAULT_THEME, defaultShade: 2 })).toBe(
      'var(--c-color-red-2)'
    )
    expect(getMarkColor({ color: 'red.9', theme: DEFAULT_THEME, defaultShade: 5 })).toBe(
      'var(--c-color-red-9)'
    )
  })

  it('returns correct color for non-theme color', () => {
    expect(getMarkColor({ color: '#FECD78', theme: DEFAULT_THEME, defaultShade: 5 })).toBe(
      '#FECD78'
    )
  })
})
