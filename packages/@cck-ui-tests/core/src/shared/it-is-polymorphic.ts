import { Component, h, markRaw } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itIsPolymorphic<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'is polymorphic'
) {
  it(`${name}: html element`, () => {
    const testProps = {
      ...options.props,
      tag: 'a',
      href: '#test-link',
    }

    const { wrapper } = render(options.component, {
      props: testProps,
    })

    const target = getTarget(wrapper, options.selector)
    expect(target.element.tagName).toBe('A')
    expect(target.attributes('href')).toBe('#test-link')
  })

  it(`${name}: Vue element`, () => {
    const TestComponent = markRaw({
      name: 'TestComponent',
      setup(props: any, { attrs }: any) {
        return () => h('mark', { 'data-child-prop': true, ...props, ...attrs })
      },
    })

    const testProps = {
      ...options.props,
      tag: TestComponent,
      'data-parent-prop': true,
    }

    const { wrapper } = render(options.component, {
      props: testProps,
    })

    const target = getTarget(wrapper, options.selector)
    expect(target.element.tagName).toBe('MARK')
    expect(target.attributes('data-child-prop')).toBeDefined()
    expect(target.attributes('data-parent-prop')).toBeDefined()
  })

  it(`${name}: renderRoot`, () => {
    const renderRoot = (props: any) => h('a', { href: '#test-link', ...props })

    const testProps = {
      ...options.props,
      renderRoot,
    }

    const { wrapper } = render(options.component, {
      props: testProps,
    })

    const target = getTarget(wrapper, options.selector)
    expect(target.element.tagName).toBe('A')
    expect(target.attributes('href')).toBe('#test-link')
  })
}
