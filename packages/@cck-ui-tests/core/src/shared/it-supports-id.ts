import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itSupportsId<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports id'
) {
  it(name, () => {
    const TEST_ID = 'test-cck-id'

    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { id: TEST_ID },
    })

    expect(wrapper.find(`#${TEST_ID}`).exists()).toBe(true)
  })
}
