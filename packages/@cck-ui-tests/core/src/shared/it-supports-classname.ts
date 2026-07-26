import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itSupportsClassName<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports className prop'
) {
  it(name, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { class: 'test-class-name' },
    })

    expect(wrapper.find('.test-class-name').exists()).toBe(true)
  })
}
