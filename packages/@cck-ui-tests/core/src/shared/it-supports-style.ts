import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils'
import { CTheme, DEFAULT_THEME, rgb } from '@cck-ui/core'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsStyle<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports style'
) {
  const testColor = 'rgb(250, 128, 114)'
  it(`${name}: object`, () => {
    const { wrapper } = render(options.component, {
      props: { ...options.props, style: { color: testColor } },
    })
    const target = getTarget(wrapper, options.selector)
    const el = target.element as HTMLElement
    expect(el.style.color).toBe(testColor)
  })

  it(`${name}: theme function`, () => {
    const { wrapper } = render(options.component, {
      props: {
        ...options.props,
        style: (theme: CTheme) => ({ color: theme.colors.pink[4] }),
      },
    })
    const target = getTarget(wrapper, options.selector)
    const el = target.element as HTMLElement
    expect(el.style.color).toBe(rgb(DEFAULT_THEME.colors.pink[4]))
  })

  it(`${name}: array of objects`, () => {
    const { wrapper } = render(options.component, {
      props: {
        ...options.props,
        style: [{ color: testColor }, { fontFamily: 'serif' }],
      },
    })
    const target = getTarget(wrapper, options.selector)
    const el = target.element as HTMLElement
    expect(el.style.color).toBe(testColor)
    expect(el.style.fontFamily).toBe('serif')
  })

  // Vue will convert array of function prop to an empty object
  // it(`${name}: array of theme function`, () => {
  //   const { wrapper } = render(options.component, {
  //     props: {
  //       ...options.props,
  //       style: [
  //         (theme: CTheme) => ({ color: theme.colors.pink[4] }),
  //         (theme: CTheme) => ({ background: theme.colors.orange[9] }),
  //       ],
  //     },
  //   })
  //   const target = getTarget(wrapper, options.selector)
  //   const el = target.element as HTMLElement
  //   expect(el.style.color).toBe('rgb(247, 131, 172)')
  // })
}
