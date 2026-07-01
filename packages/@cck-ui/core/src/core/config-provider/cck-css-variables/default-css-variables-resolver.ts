import { keys, rem } from '../../utils'
import { getPrimaryShade } from '../color-functions'
import {
  getPrimaryContrastColor,
  getVirtualColorContrast,
} from '../color-functions/get-contrast-color/get-contrast-color'
import { ConvertCSSVariablesInput } from '../convert-css-variables'
import { CTheme } from '../theme.types'
import { getCSSColorVariables } from './get-css-color-variables'
import { isVirtualColor } from './virtual-color/virtual-color'

export type CSSVariablesResolver = (theme: CTheme) => ConvertCSSVariablesInput

function assignSizeVariables(
  variables: Record<string, string>,
  sizes: Record<string, string>,
  name: string
) {
  keys(sizes).forEach((size) => Object.assign(variables, { [`--c-${name}-${size}`]: sizes[size] }))
}

export const defaultCssVariablesResolver: CSSVariablesResolver = (theme) => {
  const lightPrimaryShade = getPrimaryShade(theme, 'light')
  const defaultRadius =
    theme.defaultRadius in theme.radius
      ? theme.radius[theme.defaultRadius as 'xs']
      : rem(theme.defaultRadius)

  const result: ConvertCSSVariablesInput = {
    variables: {
      '--c-z-index-app': '100',
      '--c-z-index-modal': '200',
      '--c-z-index-popover': '300',
      '--c-z-index-overlay': '400',
      '--c-z-index-max': '9999',
      '--c-scale': theme.scale.toString(),
      '--c-cursor-type': theme.cursorType,
      '--c-webkit-font-smoothing': theme.fontSmoothing ? 'antialiased' : 'unset',
      '--c-moz-font-smoothing': theme.fontSmoothing ? 'grayscale' : 'unset',
      '--c-color-white': theme.white,
      '--c-color-black': theme.black,
      '--c-line-height': theme.lineHeights.md,
      '--c-font-family': theme.fontFamily,
      '--c-font-family-monospace': theme.fontFamilyMonospace,
      '--c-font-family-headings': theme.headings.fontFamily,
      '--c-heading-font-weight': theme.headings.fontWeight,
      '--c-heading-text-wrap': theme.headings.textWrap,
      '--c-radius-default': defaultRadius,

      '--c-primary-color-filled': `var(--c-color-${theme.primaryColor}-filled)`,
      '--c-primary-color-filled-hover': `var(--c-color-${theme.primaryColor}-filled-hover)`,
      '--c-primary-color-light': `var(--c-color-${theme.primaryColor}-light)`,
      '--c-primary-color-light-hover': `var(--c-coloar-${theme.primaryColor}-light-hover)`,
      '--c-primary-color-light-color': `var(--c-coloar-${theme.primaryColor}-light-color)`,
    },
    light: {
      '--c-color-scheme': 'light',
      '--c-primary-color-contrast': getPrimaryContrastColor(theme, 'light'),
      '--c-color-bright': 'var(--c-color-black)',
      '--c-color-text': theme.black,
      '--c-color-body': theme.white,
      '--c-color-error': 'var(--c-color-red-6)',
      '--c-color-success': 'var(--c-color-teal-8)',
      '--c-color-placeholder': 'var(--c-color-gray-5)',
      '--c-color-anchor': `var(--c-color-${theme.primaryColor}-${lightPrimaryShade})`,
      '--c-color-default': 'var(--c-color-white)',
      '--c-color-default-hover': 'var(--c-color-gray-0)',
      '--c-color-default-color': 'var(--c-color-black)',
      '--c-color-default-border': 'var(--c-color-gray-4)',
      '--c-color-dimmed': 'var(--c-color-gray-6)',
      '--c-color-disabled': 'var(--c-color-gray-2)',
      '--c-color-disabled-color': 'var(--c-color-gray-5)',
      '--c-color-disabled-border': 'var(--c-color-gray-3)',
    },
    dark: {
      '--c-color-scheme': 'dark',
      '--c-primary-color-contrast': getPrimaryContrastColor(theme, 'dark'),
      '--c-color-bright': 'var(--c-color-white)',
      '--c-color-text': 'var(--c-color-dark-0)',
      '--c-color-body': 'var(--c-color-dark-7)',
      '--c-color-error': 'var(--c-color-red-8)',
      '--c-color-success': 'var(--c-color-teal-8)',
      '--c-color-placeholder': 'var(--c-color-dark-3)',
      '--c-color-anchor': `var(--c-color-${theme.primaryColor}-4)`,
      '--c-color-default': 'var(--c-color-dark-6)',
      '--c-color-default-hover': 'var(--c-color-dark-5)',
      '--c-color-default-color': 'var(--c-color-white)',
      '--c-color-default-border': 'var(--c-color-dark-4)',
      '--c-color-dimmed': 'var(--c-color-dark-2)',
      '--c-color-disabled': 'var(--c-color-dark-6)',
      '--c-color-disabled-color': 'var(--c-color-dark-3)',
      '--c-color-disabled-border': 'var(--c-color-dark-4)',
    },
  }

  assignSizeVariables(result.variables, theme.breakpoints, 'breakpoint')
  assignSizeVariables(result.variables, theme.spacing, 'spacing')
  assignSizeVariables(result.variables, theme.fontSizes, 'font-size')
  assignSizeVariables(result.variables, theme.lineHeights, 'line-height')
  assignSizeVariables(result.variables, theme.shadows, 'shadow')
  assignSizeVariables(result.variables, theme.radius, 'radius')
  assignSizeVariables(result.variables, theme.fontWeights, 'font-weight')

  theme.colors[theme.primaryColor].forEach((_, index) => {
    result.variables[`--c-primary-color-${index}`] = `var(--c-color-${theme.primaryColor}-${index})`
  })

  keys(theme.colors).forEach((color) => {
    const value = theme.colors[color]

    if (isVirtualColor(value)) {
      Object.assign(
        result.light,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.light,
          colorScheme: 'light',
          withColorValues: true,
        })
      )

      Object.assign(
        result.dark,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.dark,
          colorScheme: 'dark',
          withColorValues: true,
        })
      )

      result.light[`--c-color-${value.name}-contrast`] = getVirtualColorContrast(
        value,
        theme,
        'light'
      )

      result.dark[`--c-color-${value.name}-contrast`] = getVirtualColorContrast(
        value,
        theme,
        'dark'
      )

      return
    }

    value.forEach((shade, index) => {
      result.variables[`--c-color-${color}-${index}`] = shade
    })

    Object.assign(
      result.light,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: 'light',
        withColorValues: false,
      })
    )

    Object.assign(
      result.dark,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: 'dark',
        withColorValues: false,
      })
    )
  })

  const headings = theme.headings.sizes

  keys(headings).forEach((heading) => {
    result.variables[`--c-${heading}-font-size`] = headings[heading].fontSize
    result.variables[`--c-${heading}-line-height`] = headings[heading].lineHeight
    result.variables[`--c-${heading}-font-weight`] =
      headings[heading].fontWeight || theme.headings.fontWeight
  })

  return result
}
