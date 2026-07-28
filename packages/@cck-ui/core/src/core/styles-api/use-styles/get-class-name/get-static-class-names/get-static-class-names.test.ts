import { describe, expect, it } from 'vitest'
import { getStaticClassNames } from './get-static-class-names'

describe('@cck-ui/core/get-static-class-names', () => {
  it('returns correct static class names for single themeName', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input'],
        selector: 'wrapper',
        classNamesPrefix: 'cck',
      })
    ).toStrictEqual(['cck-Input-wrapper'])
  })

  it('returns correct static class names for multiple themeNames', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input', 'Select'],
        selector: 'wrapper',
        classNamesPrefix: 'cck',
      })
    ).toStrictEqual(['cck-Input-wrapper', 'cck-Select-wrapper'])
  })

  it('returns empty array if withStaticClass is false', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input', 'Select'],
        selector: 'wrapper',
        classNamesPrefix: 'cck',
        withStaticClass: false,
      })
    ).toStrictEqual([])
  })
})
