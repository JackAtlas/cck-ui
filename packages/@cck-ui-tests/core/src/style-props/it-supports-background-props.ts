import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
  slots?: Record<string, any>
}

export function itSupportsBackgroundProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports bd, bgsz, bgp, bgr and bga props'
) {
  const { selector, slots } = options

  it(name, () => {
    const { wrapper: wrapperBgsz } = render(options.component, {
      props: { ...options.props, bgsz: 32 },
      slots,
    })
    const targetBgsz = getTarget(wrapperBgsz, selector)
    const elBgsz = targetBgsz.element as HTMLElement
    expect(elBgsz.style.backgroundSize).toBe('calc(2rem * var(--c-scale))')

    const { wrapper: wrapperBgp } = render(options.component, {
      props: { ...options.props, bgp: 'center' },
      slots,
    })
    const targetBgp = getTarget(wrapperBgp, selector)
    const elBgp = targetBgp.element as HTMLElement
    expect(elBgp.style.backgroundPosition).toBe('center center')

    const { wrapper: wrapperBgr } = render(options.component, {
      props: { ...options.props, bgr: 'repeat' },
      slots,
    })
    const targetBgr = getTarget(wrapperBgr, selector)
    const elBgr = targetBgr.element as HTMLElement
    expect(elBgr.style.backgroundRepeat).toBe('repeat')

    const { wrapper: wrapperBga } = render(options.component, {
      props: { ...options.props, bga: 'fixed' },
      slots,
    })
    const targetBga = getTarget(wrapperBga, selector)
    const elBga = targetBga.element as HTMLElement
    expect(elBga.style.backgroundAttachment).toBe('fixed')
  })
}
