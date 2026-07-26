import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'
import { rgb } from '@cck-ui/core'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
  slots?: Record<string, any>
}

export function itSupportsColorsProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports c, bg and opacity props'
) {
  const { selector, slots } = options

  it(name, () => {
    const { wrapper: wrapperC } = render(options.component, {
      props: { ...options.props, slots, c: '#FEFEFE' },
    })
    const targetC = getTarget(wrapperC, selector)
    const elC = targetC.element as HTMLElement
    expect(elC.style.color).toBe(rgb('#FEFEFE'))

    const { wrapper: wrapperBg } = render(options.component, {
      props: { ...options.props, slots, bg: '#DCDCDC' },
    })
    const targetBg = getTarget(wrapperBg, selector)
    const elBg = targetBg.element as HTMLElement
    expect(elBg.style.backgroundColor).toBe(rgb('#DCDCDC'))

    const { wrapper: wrapperOpacity } = render(options.component, {
      props: { ...options.props, slots, opacity: 0.85 },
    })
    const targetOpacity = getTarget(wrapperOpacity, selector)
    const elOpacity = targetOpacity.element as HTMLElement
    expect(elOpacity.style.opacity).toBe('0.85')
  })
}
