import { describe, expect, it } from 'vitest'
import { convertCssVariables } from './convert-css-variables'

const result = [
  '.cck-test{--c-color-white: #fff;--c-color-black: #000;}',
  '.cck-test[data-c-color-scheme="dark"]{--c-color-filled: red;}',
  '.cck-test[data-c-color-scheme="light"]{--c-color-filled: blue;}',
]

describe('@cck-ui/core/convert-css-variables', () => {
  it('converts object to css variables string', () => {
    expect(
      convertCssVariables(
        {
          variables: {
            '--c-color-white': '#fff',
            '--c-color-black': '#000',
          },

          dark: {
            '--c-color-filled': 'red',
          },

          light: {
            '--c-color-filled': 'blue',
          },
        },
        '.cck-test'
      )
    ).toBe(result.join('\n\n'))
  })
})
