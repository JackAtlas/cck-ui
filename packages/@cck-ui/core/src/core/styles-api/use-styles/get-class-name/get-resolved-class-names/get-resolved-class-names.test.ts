import { describe, expect, it } from 'vitest'
import { getResolvedClassNames } from './get-resolved-class-names'
import { DEFAULT_THEME } from '../../../../config-provider'

const testObjectClassNames = {
  root: 'test-object',
}

const testFunctionClassNames = () => ({
  root: 'test-function',
})

describe('@cck-ui/core/get-resolved-class-names', () => {
  it('returns className at given selector (object)', () => {
    expect(
      getResolvedClassNames({
        theme: DEFAULT_THEME,
        classNames: testObjectClassNames,
        selector: 'root',
        props: {},
        stylesCtx: undefined,
      })
    ).toBe('test-object')
  })

  it('returns className at given selector (function)', () => {
    expect(
      getResolvedClassNames({
        theme: DEFAULT_THEME,
        classNames: testFunctionClassNames,
        selector: 'root',
        props: {},
        stylesCtx: undefined,
      })
    ).toBe('test-function')
  })

  it('returns undefined if selector is not in classNames', () => {
    expect(
      getResolvedClassNames({
        theme: DEFAULT_THEME,
        classNames: testObjectClassNames,
        selector: 'test',
        props: {},
        stylesCtx: undefined,
      })
    ).toBeUndefined()
  })

  it('returns undefined if classNames is undefined', () => {
    expect(
      getResolvedClassNames({
        theme: DEFAULT_THEME,
        classNames: undefined,
        selector: 'root',
        props: {},
        stylesCtx: undefined,
      })
    ).toBeUndefined()
  })
})
