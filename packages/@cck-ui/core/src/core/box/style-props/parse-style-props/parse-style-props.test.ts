import { describe, expect, it } from 'vitest'
import { parseStyleProps } from './parse-style-props'
import { STYLE_PROPS_DATA } from '../style-props-data'
import { DEFAULT_THEME } from '../../../config-provider'

describe('@cck-ui/core/Box/parse-style-props', () => {
  it('parses non responsive style props correctly', () => {
    expect(
      parseStyleProps({
        data: STYLE_PROPS_DATA,
        styleProps: {
          p: '1.5rem',
          mx: 32,
          c: 'red.5',
          opacity: 0.65,
        },
        theme: DEFAULT_THEME,
      })
    ).toStrictEqual({
      hasResponsiveStyles: false,
      inlineStyles: {
        padding: '1.5rem',
        marginInline: 'calc(2rem * var(--c-scale))',
        color: 'var(--c-color-red-5)',
        opacity: 0.65,
      },
      styles: {},
      media: [],
    })
  })

  it('parses responsive style props correctly', () => {
    expect(
      parseStyleProps({
        data: STYLE_PROPS_DATA,
        styleProps: {
          p: { base: '1.5rem', xs: '2rem' },
          mx: { base: 32, xs: 64 },
          c: { base: 'red.5', xs: 'red.6' },
          opacity: { base: 0.65, xs: 0.85 },
        },
        theme: DEFAULT_THEME,
      })
    ).toStrictEqual({
      hasResponsiveStyles: true,
      inlineStyles: {},
      styles: {
        padding: '1.5rem',
        marginInline: 'calc(2rem * var(--c-scale))',
        color: 'var(--c-color-red-5)',
        opacity: 0.65,
      },
      media: [
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.xs})`,
          styles: {
            padding: '2rem',
            marginInline: 'calc(4rem * var(--c-scale))',
            color: 'var(--c-color-red-6)',
            opacity: 0.85,
          },
        },
      ],
    })
  })

  it('parses combination of responsive and non responsive style props correctly', () => {
    expect(
      parseStyleProps({
        data: STYLE_PROPS_DATA,
        styleProps: {
          p: { base: 24, xs: 32 },
          mx: 64,
          c: 'red.6',
          opacity: { base: 0.65, xs: 0.85 },
        },
        theme: DEFAULT_THEME,
      })
    ).toStrictEqual({
      hasResponsiveStyles: true,
      inlineStyles: {
        marginInline: 'calc(4rem * var(--c-scale))',
        color: 'var(--c-color-red-6)',
      },
      styles: {
        padding: 'calc(1.5rem * var(--c-scale))',
        opacity: 0.65,
      },
      media: [
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.xs})`,
          styles: {
            padding: 'calc(2rem * var(--c-scale))',
            opacity: 0.85,
          },
        },
      ],
    })
  })

  it('correctly parses values with multiple breakpoints', () => {
    expect(
      parseStyleProps({
        data: STYLE_PROPS_DATA,
        styleProps: {
          p: { base: '1.5rem', xs: '2rem', md: '3rem' },
          mx: { base: 32, xs: 64, md: 128 },
          c: { base: 'red.5', xs: 'red.6', md: 'red.7' },
          opacity: { base: 0.65, xs: 0.85, md: 1 },
        },
        theme: DEFAULT_THEME,
      })
    ).toStrictEqual({
      hasResponsiveStyles: true,
      inlineStyles: {},
      styles: {
        padding: '1.5rem',
        marginInline: 'calc(2rem * var(--c-scale))',
        color: 'var(--c-color-red-5)',
        opacity: 0.65,
      },
      media: [
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.xs})`,
          styles: {
            padding: '2rem',
            marginInline: 'calc(4rem * var(--c-scale))',
            color: 'var(--c-color-red-6)',
            opacity: 0.85,
          },
        },
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.md})`,
          styles: {
            padding: '3rem',
            marginInline: 'calc(8rem * var(--c-scale))',
            color: 'var(--c-color-red-7)',
            opacity: 1,
          },
        },
      ],
    })
  })

  it('parses logical style props correctly', () => {
    expect(
      parseStyleProps({
        data: STYLE_PROPS_DATA,
        styleProps: { mis: 10, mie: 15, pis: 20, pie: 25 },
        theme: DEFAULT_THEME,
      })
    ).toStrictEqual({
      hasResponsiveStyles: false,
      inlineStyles: {
        marginInlineStart: 'calc(0.625rem * var(--c-scale))',
        marginInlineEnd: 'calc(0.9375rem * var(--c-scale))',
        paddingInlineStart: 'calc(1.25rem * var(--c-scale))',
        paddingInlineEnd: 'calc(1.5625rem * var(--c-scale))',
      },
      styles: {},
      media: [],
    })
  })
})
