import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsPositionProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports pos, top, left, bottom, right, inset and display props'
) {
  const { selector } = options

  it(name, () => {
    const { wrapper: wrapperPos } = render(options.component, {
      props: { ...options.props, pos: 'absolute' },
    })
    const targetPos = getTarget(wrapperPos, selector)
    const elPos = targetPos.element as HTMLElement
    expect(elPos.style.position).toBe('absolute')

    const { wrapper: wrapperTop } = render(options.component, {
      props: { ...options.props, top: '1rem' },
    })
    const targetTop = getTarget(wrapperTop, selector)
    const elTop = targetTop.element as HTMLElement
    expect(elTop.style.top).toBe('1rem')

    const { wrapper: wrapperLeft } = render(options.component, {
      props: { ...options.props, left: '2rem' },
    })
    const targetLeft = getTarget(wrapperLeft, selector)
    const elLeft = targetLeft.element as HTMLElement
    expect(elLeft.style.left).toBe('2rem')

    const { wrapper: wrapperBottom } = render(options.component, {
      props: { ...options.props, bottom: '3rem' },
    })
    const targetBottom = getTarget(wrapperBottom, selector)
    const elBottom = targetBottom.element as HTMLElement
    expect(elBottom.style.bottom).toBe('3rem')

    const { wrapper: wrapperRight } = render(options.component, {
      props: { ...options.props, right: '4rem' },
    })
    const targetRight = getTarget(wrapperRight, selector)
    const elRight = targetRight.element as HTMLElement
    expect(elRight.style.right).toBe('4rem')

    const { wrapper: wrapperInset } = render(options.component, {
      props: { ...options.props, inset: '5rem' },
    })
    const targetInset = getTarget(wrapperInset, selector)
    const elInset = targetInset.element as HTMLElement
    expect(elInset.style.inset).toBe('5rem')

    const { wrapper: wrapperDisplay } = render(options.component, {
      props: { ...options.props, display: 'flex' },
    })
    const targetDisplay = getTarget(wrapperDisplay, selector)
    const elDisplay = targetDisplay.element as HTMLElement
    expect(elDisplay.style.display).toBe('flex')

    const { wrapper: wrapperFlex } = render(options.component, {
      props: { ...options.props, flex: '0 0 10px' },
    })
    const targetFlex = getTarget(wrapperFlex, selector)
    const elFlex = targetFlex.element as HTMLElement
    expect(elFlex.style.flex).toBe('0 0 10px')
  })
}
