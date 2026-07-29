import { describe, expect, it } from 'vitest'
import { mergeThemeOverrides } from './merge-theme-overrides'

describe('@cck-ui/merge-theme-overrides', () => {
  it('merges theme overrides', () => {
    expect(
      mergeThemeOverrides(
        { primaryColor: 'red' },
        { colors: { cyan: ['#fff', '#000'] as any } },
        { defaultRadius: 'md', colors: { red: ['#fff', '#000'] as any }, primaryColor: 'cyan' }
      )
    ).toStrictEqual({
      primaryColor: 'cyan',
      defaultRadius: 'md',
      colors: {
        red: ['#fff', '#000'],
        cyan: ['#fff', '#000'],
      },
    })
  })
})
