import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
}

export function itSupportsHiddenVisible<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports hiddenFrom and visibleFrom props'
) {
  it(`${name}: hiddenFrom`, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      attrs: { hiddenFrom: 'lg' },
    })

    expect(wrapper.find('.c-hidden-from-lg').exists()).toBe(true)
  })
}
