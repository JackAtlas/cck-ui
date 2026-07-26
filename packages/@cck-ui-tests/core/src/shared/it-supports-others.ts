import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itSupportsOthers<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports ...others props'
) {
  it(name, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { 'data-test-attribute': true },
    })

    expect(wrapper.find('[data-test-attribute]').exists()).toBe(true)
  })
}
