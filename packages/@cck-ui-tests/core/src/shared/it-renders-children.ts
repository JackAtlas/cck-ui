import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itRendersChildren<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'renders children'
) {
  it(name, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      slots: {
        default: () => 'test-children',
      },
    })

    expect(wrapper.text()).toContain('test-children')
  })
}
