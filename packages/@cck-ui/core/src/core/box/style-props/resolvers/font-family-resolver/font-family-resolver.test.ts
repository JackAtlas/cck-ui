import { describe, expect, it } from 'vitest'
import { fontFamilyResolver } from './font-family-resolver'

describe('@cck-ui/core/Box/font-family-resolver', () => {
  it('resolves theme font family', () => {
    expect(fontFamilyResolver('text')).toBe('var(--c-font-family)')
    expect(fontFamilyResolver('mono')).toBe('var(--c-font-family-monospace)')
    expect(fontFamilyResolver('heading')).toBe('var(--c-font-family-headings)')
  })

  it('resolves non theme font family', () => {
    expect(fontFamilyResolver('Arial')).toBe('Arial')
  })
})
