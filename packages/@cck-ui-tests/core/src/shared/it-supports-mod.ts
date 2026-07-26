import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsMod<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports mod'
) {
  it(`${name}: string`, () => {
    const { wrapper } = render(options.component, {
      props: { ...options.props, mod: 'test' },
    })
    const target = getTarget(wrapper, options.selector)
    expect(target.attributes('data-test')).toBeDefined()
  })

  it(`${name}: object`, () => {
    const { wrapper } = render(options.component, {
      props: { ...options.props, mod: { test: true, test2: false } },
    })
    const target = getTarget(wrapper, options.selector)
    expect(target.attributes('data-test')).toBeDefined()
    expect(target.attributes('data-test2')).toBeUndefined()
  })

  it(`${name}: array with object`, () => {
    const { wrapper } = render(options.component, {
      props: { ...options.props, mod: ['test', { test2: false }] },
    })
    const target = getTarget(wrapper, options.selector)
    expect(target.attributes('data-test')).toBeDefined()
    expect(target.attributes('data-test2')).toBeUndefined()
  })
}
