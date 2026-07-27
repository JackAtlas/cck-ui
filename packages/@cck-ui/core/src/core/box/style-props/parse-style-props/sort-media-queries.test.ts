import { describe, expect, it } from 'vitest'
import { sortMediaQueries } from './sort-media-queries'
import { DEFAULT_THEME } from '../../../config-provider'

describe('@cck-ui/core/Box/sort-media-queries', () => {
  it('sorts media queries correctly', () => {
    expect(
      sortMediaQueries({
        hasResponsiveStyles: true,
        inlineStyles: {},
        styles: {
          padding: '1.5vh',
          marginLeft: '2vh',
          marginRight: '2vh',
          color: 'var(--c-color-red-5)',
          opacity: 0.65,
        },
        media: {
          [`(min-width: ${DEFAULT_THEME.breakpoints.sm})`]: {
            padding: '3vh',
            marginLeft: '6vh',
            marginRight: '6vh',
            color: 'var(--c-color-red-7)',
            opacity: 0.95,
          },

          [`(min-width: ${DEFAULT_THEME.breakpoints.xl})`]: {
            padding: '4vh',
            marginLeft: '8vh',
            marginRight: '8vh',
            color: 'var(--c-color-red-9)',
            opacity: 0.95,
          },

          [`(min-width: ${DEFAULT_THEME.breakpoints.xs})`]: {
            padding: '2vh',
            marginLeft: '4vh',
            marginRight: '4vh',
            color: 'var(--c-color-red-6)',
            opacity: 0.85,
          },
        },
      })
    ).toStrictEqual({
      hasResponsiveStyles: true,
      inlineStyles: {},
      styles: {
        padding: '1.5vh',
        marginLeft: '2vh',
        marginRight: '2vh',
        color: 'var(--c-color-red-5)',
        opacity: 0.65,
      },
      media: [
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.xs})`,
          styles: {
            padding: '2vh',
            marginLeft: '4vh',
            marginRight: '4vh',
            color: 'var(--c-color-red-6)',
            opacity: 0.85,
          },
        },
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.sm})`,
          styles: {
            padding: '3vh',
            marginLeft: '6vh',
            marginRight: '6vh',
            color: 'var(--c-color-red-7)',
            opacity: 0.95,
          },
        },
        {
          query: `(min-width: ${DEFAULT_THEME.breakpoints.xl})`,
          styles: {
            padding: '4vh',
            marginLeft: '8vh',
            marginRight: '8vh',
            color: 'var(--c-color-red-9)',
            opacity: 0.95,
          },
        },
      ],
    })
  })
})
