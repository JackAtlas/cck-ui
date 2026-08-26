import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsSize<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports size'
) {
  it(name, async () => {
    const { wrapper, rerender } = render(options.component, {
      props: { ...options.props, size: '__test-size' },
    })

    const target = getTarget(wrapper, options.selector)
    expect(target.attributes('data-size')).toBe('__test-size')

    await rerender({ props: { size: '5rem' } as any })
    const targetAfterRerender = getTarget(wrapper, options.selector)
    expect(targetAfterRerender.attributes('data-size')).toBeUndefined()
  })
}
