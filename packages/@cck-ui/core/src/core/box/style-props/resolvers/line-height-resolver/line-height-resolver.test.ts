import { describe, expect, it } from 'vitest'
import { lineHeightResolver } from './line-height-resolver'
import { DEFAULT_THEME } from '../../../../config-provider'

describe('@cck-ui/core/Box/inline-height-resolver', () => {
  it('resolves theme line height', () => {
    expect(lineHeightResolver('xs', DEFAULT_THEME)).toBe('var(--c-line-height-xs)')
    expect(lineHeightResolver('sm', DEFAULT_THEME)).toBe('var(--c-line-height-sm)')
    expect(lineHeightResolver('md', DEFAULT_THEME)).toBe('var(--c-line-height-md)')
    expect(lineHeightResolver('lg', DEFAULT_THEME)).toBe('var(--c-line-height-lg)')
    expect(lineHeightResolver('xl', DEFAULT_THEME)).toBe('var(--c-line-height-xl)')
  })

  it('resolves number line height', () => {
    expect(lineHeightResolver(12, DEFAULT_THEME)).toBe(12)
    expect(lineHeightResolver(1.55, DEFAULT_THEME)).toBe(1.55)
  })

  it('resolves string line height', () => {
    expect(lineHeightResolver('12px', DEFAULT_THEME)).toBe('12px')
    expect(lineHeightResolver('1em', DEFAULT_THEME)).toBe('1em')
  })
})
