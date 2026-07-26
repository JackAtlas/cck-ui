import { Component } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  providerName: string
}

export function itSupportsProviderDefaultProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports default props on CckConfigProvider'
) {
  it(name, () => {
    const { wrapper } = render(options.component, {
      props: options.props,
      themeOverride: {
        components: {
          [options.providerName]: {
            defaultProps: { 'data-provider-prop': 'test-provider-prop' },
          },
        },
      },
    })

    const element = wrapper.find('[data-provider-prop]')
    expect(element.exists()).toBe(true)
    expect(element.attributes('data-provider-prop')).toBe('test-provider-prop')
  })
}
