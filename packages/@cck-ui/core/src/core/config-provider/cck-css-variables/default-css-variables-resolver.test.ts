import { expect, test } from 'vitest'
import { defaultCssVariablesResolver } from './default-css-variables-resolver'
import { DEFAULT_THEME } from '../default-theme'

test('default-css-variables-resolver', () => {
  expect(defaultCssVariablesResolver(DEFAULT_THEME)).toMatchSnapshot()
})
