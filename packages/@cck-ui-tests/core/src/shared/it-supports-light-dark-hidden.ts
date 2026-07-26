import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itSupportsLightDarkHidden<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports lightHidden and darkHidden props'
) {
  it(`${name}: lightHidden`, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { lightHidden: true },
    })

    expect(wrapper.find('.c-light-hidden').exists()).toBe(true)
  })

  it(`${name}: darkHidden`, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { darkHidden: true },
    })

    expect(wrapper.find('.c-dark-hidden').exists()).toBe(true)
  })
}
