import { describe, expect, it } from 'vitest'
import { getTitleSize } from './get-title-size'

describe('@c/core/Title/get-title-size', () => {
  it('returns correct font size for h1-h6 based on order/size', () => {
    expect(getTitleSize(1, undefined)).toStrictEqual({
      fontSize: 'var(--c-h1-font-size)',
      fontWeight: 'var(--c-h1-font-weight)',
      lineHeight: 'var(--c-h1-line-height)',
    })

    expect(getTitleSize(2, 'h1')).toStrictEqual({
      fontSize: 'var(--c-h1-font-size)',
      fontWeight: 'var(--c-h1-font-weight)',
      lineHeight: 'var(--c-h1-line-height)',
    })
  })

  it('returns correct font size for size in px', () => {
    expect(getTitleSize(3, '32px')).toStrictEqual({
      fontSize: 'calc(2rem * var(--c-scale))',
      fontWeight: 'var(--c-h3-font-weight)',
      lineHeight: 'var(--c-h3-line-height)',
    })
  })
})
