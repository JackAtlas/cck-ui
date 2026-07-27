import { describe, expect, it } from 'vitest'
import { spacingResolver } from './spacing-resolver'
import { DEFAULT_THEME } from '../../../../config-provider'
import { rem } from '../../../../utils'

describe('@cck-ui/core/Box/spacing-resolver', () => {
  it('resolves number correctly', () => {
    expect(spacingResolver(10, DEFAULT_THEME)).toBe(rem(10))
    expect(spacingResolver(-10, DEFAULT_THEME)).toBe(rem(-10))
    expect(spacingResolver(1.5, DEFAULT_THEME)).toBe(rem(1.5))
    expect(spacingResolver(0, DEFAULT_THEME)).toBe(rem(0))
  })

  it('resolves theme value correctly', () => {
    expect(spacingResolver('xs', DEFAULT_THEME)).toBe('var(--c-spacing-xs)')
    expect(spacingResolver('-md', DEFAULT_THEME)).toBe('calc(var(--c-spacing-md) * -1)')
  })

  it('resolves string correctly', () => {
    expect(spacingResolver('10px', DEFAULT_THEME)).toBe(rem(10))
    expect(spacingResolver('-10px', DEFAULT_THEME)).toBe(rem(-10))
    expect(spacingResolver('1rem', DEFAULT_THEME)).toBe(rem('1rem'))
  })

  it('resolves empty strings correctly', () => {
    expect(spacingResolver('', DEFAULT_THEME)).toBe(rem(''))
    expect(spacingResolver(' 10px', DEFAULT_THEME)).toBe(` ${rem(10)}`)
  })
})
