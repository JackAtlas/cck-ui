import { describe, expect, it } from 'vitest'
import {
  INVALID_PRIMARY_COLOR_ERROR,
  INVALID_PRIMARY_SHADE_ERROR,
  mergeCckTheme,
} from './merge-cck-theme'
import { DEFAULT_THEME } from '../default-theme'

describe('@cck-ui/core/merge-cck-theme', () => {
  const getFreshTheme = (overrides: any = {}) => ({
    ...DEFAULT_THEME,
    ...overrides,
    colors: { ...DEFAULT_THEME.colors, ...(overrides.colors || {}) },
  })

  it('throws error when theme.primaryColor is invalid', () => {
    expect(() => mergeCckTheme(getFreshTheme({ primaryColor: 'unknown' }))).toThrow(
      INVALID_PRIMARY_COLOR_ERROR
    )

    expect(() => mergeCckTheme(getFreshTheme(), { primaryColor: 'unknown' })).toThrow(
      INVALID_PRIMARY_COLOR_ERROR
    )
  })

  it('throws error when theme.primaryShade is invalid', () => {
    expect(() => mergeCckTheme(getFreshTheme({ primaryShade: 10 as any }))).toThrow(
      INVALID_PRIMARY_SHADE_ERROR
    )

    expect(() =>
      mergeCckTheme(getFreshTheme({ primaryShade: { light: 0, dark: 10 as any } }))
    ).toThrow(INVALID_PRIMARY_SHADE_ERROR)

    expect(() =>
      mergeCckTheme(getFreshTheme({ primaryShade: { light: 10 as any, dark: 0 } }))
    ).toThrow(INVALID_PRIMARY_SHADE_ERROR)

    expect(() => mergeCckTheme(getFreshTheme(), { primaryShade: 10 as any })).toThrow(
      INVALID_PRIMARY_SHADE_ERROR
    )

    expect(() =>
      mergeCckTheme(getFreshTheme(), { primaryShade: { light: 0, dark: 10 as any } })
    ).toThrow(INVALID_PRIMARY_SHADE_ERROR)

    expect(() =>
      mergeCckTheme(getFreshTheme(), { primaryShade: { light: 10 as any, dark: 0 } })
    ).toThrow(INVALID_PRIMARY_SHADE_ERROR)
  })

  it('merges theme and override correctly', () => {
    const result = mergeCckTheme(DEFAULT_THEME, {
      primaryShade: 9,
      radius: {
        md: 'test-radius',
      },
      headings: {
        fontFamily: 'test-font-family',
        sizes: {
          h1: { fontSize: 'test-font-size' },
        },
      },
    })

    expect(result).toStrictEqual({
      ...DEFAULT_THEME,
      primaryShade: 9,
      radius: {
        ...DEFAULT_THEME.radius,
        md: 'test-radius',
      },
      headings: {
        ...DEFAULT_THEME.headings,
        fontFamily: 'test-font-family',
        sizes: {
          ...DEFAULT_THEME.headings.sizes,
          h1: {
            ...DEFAULT_THEME.headings.sizes.h1,
            fontSize: 'test-font-size',
          },
        },
      },
    })
  })

  it('assigns fontFamily to headings.fontFamily if it is not defined', () => {
    const result = mergeCckTheme(DEFAULT_THEME, {
      fontFamily: 'test-font-family',
    })

    expect(result).toStrictEqual({
      ...DEFAULT_THEME,
      fontFamily: 'test-font-family',
      headings: {
        ...DEFAULT_THEME.headings,
        fontFamily: 'test-font-family',
      },
    })
  })

  it('merges theme and override correctly when override is undefined', () => {
    expect(mergeCckTheme(DEFAULT_THEME, undefined)).toBe(DEFAULT_THEME)
  })

  it('does not mutate currentTheme.headings when only fontFamily is overridden', () => {
    const originalFontFamily = DEFAULT_THEME.headings.fontFamily
    const originalHeadings = DEFAULT_THEME.headings

    mergeCckTheme(DEFAULT_THEME, { fontFamily: 'mutation-canary' })

    expect(DEFAULT_THEME.headings.fontFamily).toBe(originalFontFamily)
    expect(DEFAULT_THEME.headings).toBe(originalHeadings)
  })

  it('does not leak fontFamily across successive merges', () => {
    const originalFontFamily = DEFAULT_THEME.headings.fontFamily

    mergeCckTheme(DEFAULT_THEME, { fontFamily: 'first-tenant-font' })
    const subsequent = mergeCckTheme(DEFAULT_THEME, { defaultRadius: 'sm' })

    expect(subsequent.headings.fontFamily).toBe(originalFontFamily)
    expect(subsequent.headings.fontFamily).not.toBe('first-tenant-font')
  })
})
