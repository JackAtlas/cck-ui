import { describe, expect, it } from 'vitest'
import { em, rem } from './rem'

describe('@cck-ui/units-converters/rem', () => {
  it('returns undefined if input is undefined', () => {
    expect(rem(undefined)).toBe(undefined)
  })

  it('handles 0 correctly', () => {
    expect(rem(0)).toBe('0rem')
    expect(rem('0')).toBe('0rem')
  })

  it('converts numbers to rem', () => {
    expect(rem(16)).toBe('calc(1rem * var(--c-scale))')
    expect(rem(-32)).toBe('calc(-2rem * var(--c-scale))')
  })

  it('converts string px to rems', () => {
    expect(rem('32px')).toBe('calc(2rem * var(--c-scale))')
  })

  it('does not scale rem values', () => {
    expect(rem('2rem')).toBe('2rem')
  })

  it('does not modify other values', () => {
    expect(rem('10%')).toBe('10%')
    expect(rem('5vh')).toBe('5vh')
  })

  it('does not modify scaled values', () => {
    expect(rem('calc(2rem * var(--c-scale))')).toBe('calc(2rem * var(--c-scale))')
  })

  it('does not modify calc, var, clamp and other functions', () => {
    expect(rem('calc(2rem + 10px)')).toBe('calc(2rem + 10px)')
    expect(rem('var(--c-size-xs)')).toBe('var(--c-size-xs)')
    expect(rem('clamp(10px, 2rem, 20px)')).toBe('clamp(10px, 2rem, 20px)')
  })

  it('converts values separated by space', () => {
    expect(rem('10px 5px')).toBe('calc(0.625rem * var(--c-scale)) calc(0.3125rem * var(--c-scale))')

    expect(rem('16px 0.5rem')).toBe('calc(1rem * var(--c-scale)) 0.5rem')

    expect(rem('16px solid var(--c-color-primary)')).toBe(
      'calc(1rem * var(--c-scale)) solid var(--c-color-primary)'
    )
  })

  it('converts all values in space separated string and leaves non px values untouched', () => {
    expect(rem('10px 5px 1rem 2em')).toBe(
      'calc(0.625rem * var(--c-scale)) calc(0.3125rem * var(--c-scale)) 1rem 2em'
    )

    expect(rem('1px solid red')).toBe('calc(0.0625rem * var(--c-scale)) solid red')
    expect(rem('1px 1px 5px rgba(0, 0, 0, 0.5)')).toBe('1px 1px 5px rgba(0, 0, 0, 0.5)')
    expect(rem('0 0 5px 10px rgba(0, 0, 0, 0.5)')).toBe('0 0 5px 10px rgba(0, 0, 0, 0.5)')
  })

  it('correctly transforms values that are part of CSS variables', () => {
    expect(rem('var(--c-size-xs) 16px')).toBe('var(--c-size-xs) calc(1rem * var(--c-scale))')
  })

  it('correctly transforms a list of coma separated values', () => {
    expect(rem('0 0, 0 4px, 4px -4px, -4px 0')).toBe(
      '0rem 0rem, 0rem calc(0.25rem * var(--c-scale)), calc(0.25rem * var(--c-scale)) calc(-0.25rem * var(--c-scale)), calc(-0.25rem * var(--c-scale)) 0rem'
    )
  })
})

describe('@cck-ui/units-converters/em', () => {
  it('converts numbers to em', () => {
    expect(em(0)).toBe('0em')
    expect(em(16)).toBe('1em')
    expect(em(-32)).toBe('-2em')
  })

  it('converts string px to ems', () => {
    expect(em('32px')).toBe('2em')
  })

  it('does not modify other values', () => {
    expect(em('2em')).toBe('2em')
    expect(em('10%')).toBe('10%')
    expect(em('5vh')).toBe('5vh')
  })
})
