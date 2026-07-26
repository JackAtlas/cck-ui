import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
  slots?: Record<string, any>
}

export function itSupportsVariant<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports variant'
) {
  it(name, () => {
    const testVariant = '__test-variant'
    const { wrapper } = render(options.component, {
      props: { ...options.props, variant: testVariant },
      slots: options.slots,
    })

    const target = getTarget(wrapper, options.selector)
    expect(target.attributes('data-variant')).toBe(testVariant)
  })
}
