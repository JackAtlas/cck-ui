import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'
import { rem } from '@cck-ui/core'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsMarginsProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports m, mx, my, mt, mb, mr, ml, me, ms props'
) {
  const { selector } = options

  it(name, () => {
    const { wrapper: wrapperM } = render(options.component, {
      props: { ...options.props, m: 45 },
    })
    const targetM = getTarget(wrapperM, selector)
    const elM = targetM.element as HTMLElement
    expect(elM.style.margin).toBe(rem(45))

    const { wrapper: wrapperTheme } = render(options.component, {
      props: { ...options.props, m: 'xl' },
    })
    const targetTheme = getTarget(wrapperTheme, selector)
    const elTheme = targetTheme.element as HTMLElement
    expect(elTheme.style.margin).toBe('var(--c-spacing-xl)')

    const { wrapper: wrapperMx } = render(options.component, {
      props: { ...options.props, mx: 34 },
    })
    const targetMx = getTarget(wrapperMx, selector)
    const elMx = targetMx.element as HTMLElement
    expect(elMx.style.marginInline).toBe(rem(34))

    const { wrapper: wrapperMy } = render(options.component, {
      props: { ...options.props, my: 22 },
    })
    const targetMy = getTarget(wrapperMy, selector)
    const elMy = targetMy.element as HTMLElement
    expect(elMy.style.marginBlock).toBe(rem(22))

    const { wrapper: wrapperMt } = render(options.component, {
      props: { ...options.props, mt: 13 },
    })
    const targetMt = getTarget(wrapperMt, selector)
    const elMt = targetMt.element as HTMLElement
    expect(elMt.style.marginTop).toBe(rem(13))

    const { wrapper: wrapperMb } = render(options.component, {
      props: { ...options.props, mb: 43 },
    })
    const targetMb = getTarget(wrapperMb, selector)
    const elMb = targetMb.element as HTMLElement
    expect(elMb.style.marginBottom).toBe(rem(43))

    const { wrapper: wrapperMr } = render(options.component, {
      props: { ...options.props, mr: 98 },
    })
    const targetMr = getTarget(wrapperMr, selector)
    const elMr = targetMr.element as HTMLElement
    expect(elMr.style.marginRight).toBe(rem(98))

    const { wrapper: wrapperMl } = render(options.component, {
      props: { ...options.props, ml: 11 },
    })
    const targetMl = getTarget(wrapperMl, selector)
    const elMl = targetMl.element as HTMLElement
    expect(elMl.style.marginLeft).toBe(rem(11))

    const { wrapper: wrapperMe } = render(options.component, {
      props: { ...options.props, me: 37 },
    })
    const targetMe = getTarget(wrapperMe, selector)
    const elMe = targetMe.element as HTMLElement
    expect(elMe.style.marginInlineEnd).toBe(rem(37))

    const { wrapper: wrapperMs } = render(options.component, {
      props: { ...options.props, ms: 39 },
    })
    const targetMs = getTarget(wrapperMs, selector)
    const elMs = targetMs.element as HTMLElement
    expect(elMs.style.marginInlineStart).toBe(rem(39))
  })
}
