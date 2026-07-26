import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsPaddingsProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports p, px, py, pt, pb, pr, pl, pe, ps props'
) {
  const { selector } = options

  it(name, () => {
    const { wrapper: wrapperP } = render(options.component, {
      props: { ...options.props, p: '10%' },
    })
    const targetP = getTarget(wrapperP, selector)
    const elP = targetP.element as HTMLElement
    expect(elP.style.padding).toBe('10%')

    const { wrapper: wrapperPx } = render(options.component, {
      props: { ...options.props, px: '20%' },
    })
    const targetPx = getTarget(wrapperPx, selector)
    const elPx = targetPx.element as HTMLElement
    expect(elPx.style.paddingInline).toBe('20%')

    const { wrapper: wrapperPy } = render(options.component, {
      props: { ...options.props, py: '30%' },
    })
    const targetPy = getTarget(wrapperPy, selector)
    const elPy = targetPy.element as HTMLElement
    expect(elPy.style.paddingBlock).toBe('30%')

    const { wrapper: wrapperPt } = render(options.component, {
      props: { ...options.props, pt: '40%' },
    })
    const targetPt = getTarget(wrapperPt, selector)
    const elPt = targetPt.element as HTMLElement
    expect(elPt.style.paddingTop).toBe('40%')

    const { wrapper: wrapperPb } = render(options.component, {
      props: { ...options.props, pb: '50%' },
    })
    const targetPb = getTarget(wrapperPb, selector)
    const elPb = targetPb.element as HTMLElement
    expect(elPb.style.paddingBottom).toBe('50%')

    const { wrapper: wrapperPr } = render(options.component, {
      props: { ...options.props, pr: '60%' },
    })
    const targetPr = getTarget(wrapperPr, selector)
    const elPr = targetPr.element as HTMLElement
    expect(elPr.style.paddingRight).toBe('60%')

    const { wrapper: wrapperPl } = render(options.component, {
      props: { ...options.props, pl: '70%' },
    })
    const targetPl = getTarget(wrapperPl, selector)
    const elPl = targetPl.element as HTMLElement
    expect(elPl.style.paddingLeft).toBe('70%')

    const { wrapper: wrapperPe } = render(options.component, {
      props: { ...options.props, pe: '80%' },
    })
    const targetPe = getTarget(wrapperPe, selector)
    const elPe = targetPe.element as HTMLElement
    expect(elPe.style.paddingInlineEnd).toBe('80%')

    const { wrapper: wrapperPs } = render(options.component, {
      props: { ...options.props, ps: '90%' },
    })
    const targetPs = getTarget(wrapperPs, selector)
    const elPs = targetPs.element as HTMLElement
    expect(elPs.style.paddingInlineStart).toBe('90%')
  })
}
