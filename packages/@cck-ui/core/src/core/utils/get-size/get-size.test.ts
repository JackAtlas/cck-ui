import { describe, expect, it } from 'vitest'
import { getFontSize, getLineHeight, getRadius, getShadow, getSize, getSpacing } from './get-size'

describe('@cck-ui/core/get-size', () => {
  it('returns correct size for numbers and number like values', () => {
    expect(getSize(10)).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSize('10')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSize('10px')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSize('10rem')).toBe('10rem')
    expect(getSize('10%')).toBe('10%')
    expect(getSize('10vh')).toBe('10vh')
    expect(getSize('10cqw')).toBe('10cqw')
    expect(getSize('10cqmax')).toBe('10cqmax')
  })

  it('returns correct size with custom prefix', () => {
    expect(getSize('xs', 'test')).toBe('var(--test-xs)')
    expect(getSize('md', 'test')).toBe('var(--test-md)')
    expect(getSize(10, 'test')).toBe('calc(0.625rem * var(--c-scale))')
  })

  it('returns correct size for default prefix', () => {
    expect(getSize('xs')).toBe('var(--size-xs)')
    expect(getSize('md')).toBe('var(--size-md)')
  })
})

describe('@cck-ui/core/get-spacing', () => {
  it('returns correct values', () => {
    expect(getSpacing(10)).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSpacing(0)).toBe('0rem')
    expect(getSpacing('10')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSpacing('10px')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getSpacing('10rem')).toBe('10rem')
    expect(getSpacing('10%')).toBe('10%')
    expect(getSpacing('xs')).toBe('var(--c-spacing-xs)')
    expect(getSpacing('md')).toBe('var(--c-spacing-md)')
  })
})

describe('@cck-ui/core/get-radius', () => {
  it('returns correct values', () => {
    expect(getRadius(10)).toBe('calc(0.625rem * var(--c-scale))')
    expect(getRadius(0)).toBe('0rem')
    expect(getRadius('10')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getRadius('10px')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getRadius('10rem')).toBe('10rem')
    expect(getRadius('10%')).toBe('10%')
    expect(getRadius('xs')).toBe('var(--c-radius-xs)')
    expect(getRadius('md')).toBe('var(--c-radius-md)')
    expect(getRadius(undefined)).toBe('var(--c-radius-default)')
    expect(getRadius('16px 8px')).toBe('calc(1rem * var(--c-scale)) calc(0.5rem * var(--c-scale))')
  })
})

describe('@cck-ui/core/get-font-size', () => {
  it('returns correct values', () => {
    expect(getFontSize(10)).toBe('calc(0.625rem * var(--c-scale))')
    expect(getFontSize(0)).toBe('0rem')
    expect(getFontSize('10')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getFontSize('10px')).toBe('calc(0.625rem * var(--c-scale))')
    expect(getFontSize('10rem')).toBe('10rem')
    expect(getFontSize('10%')).toBe('10%')
    expect(getFontSize('xs')).toBe('var(--c-font-size-xs)')
    expect(getFontSize('md')).toBe('var(--c-font-size-md)')
  })
})

describe('@cck-ui/core/get-line-height', () => {
  it('returns correct values', () => {
    expect(getLineHeight(10)).toBe(10)
    expect(getLineHeight(1.55)).toBe(1.55)
    expect(getLineHeight('10rem')).toBe('10rem')
    expect(getLineHeight('10%')).toBe('10%')
    expect(getLineHeight('xs')).toBe('var(--c-line-height-xs)')
    expect(getLineHeight('md')).toBe('var(--c-line-height-md)')
  })
})

describe('@cck-ui/core/get-shadow', () => {
  it('returns correct values', () => {
    expect(getShadow(undefined)).toBe(undefined)
    expect(getShadow('5px 5px 10px red')).toBe('5px 5px 10px red')
    expect(getShadow('xs')).toBe('var(--c-shadow-xs)')
    expect(getShadow('md')).toBe('var(--c-shadow-md)')
  })
})
