import { describe, expect, it } from 'vitest'
import { cssVariablesObjectToString } from './css-variables-object-to-string'

describe('@cck-ui/core/css-variables-object-to-string', () => {
  it('converts object to css variables string', () => {
    expect(
      cssVariablesObjectToString({
        '--c-color-white': '#fff',
        '--c-color-black': '#000',
      })
    ).toBe('--c-color-white: #fff;--c-color-black: #000;')
  })
})
