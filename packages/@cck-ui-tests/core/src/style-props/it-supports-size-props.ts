import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsSizeProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports w, miw, maw, h, mih and mah props'
) {
  const { selector } = options

  it(name, () => {
    const { wrapper: wrapperTheme } = render(options.component, {
      props: { ...options.props, w: 'xl' },
    })
    const targetTheme = getTarget(wrapperTheme, selector)
    const elTheme = targetTheme.element as HTMLElement
    expect(elTheme.style.width).toBe('var(--c-spacing-xl)')

    const { wrapper: wrapperW } = render(options.component, {
      props: { ...options.props, w: '10%' },
    })
    const targetW = getTarget(wrapperW, selector)
    const elW = targetW.element as HTMLElement
    expect(elW.style.width).toBe('10%')

    const { wrapper: wrapperMiw } = render(options.component, {
      props: { ...options.props, miw: '10vh' },
    })
    const targetMiw = getTarget(wrapperMiw, selector)
    const elMiw = targetMiw.element as HTMLElement
    expect(elMiw.style.minWidth).toBe('10vh')

    const { wrapper: wrapperMaw } = render(options.component, {
      props: { ...options.props, maw: '20%' },
    })
    const targetMaw = getTarget(wrapperMaw, selector)
    const elMaw = targetMaw.element as HTMLElement
    expect(elMaw.style.maxWidth).toBe('20%')

    const { wrapper: wrapperH } = render(options.component, {
      props: { ...options.props, h: '10%' },
    })
    const targetH = getTarget(wrapperH, selector)
    const elH = targetH.element as HTMLElement
    expect(elH.style.height).toBe('10%')

    const { wrapper: wrapperMih } = render(options.component, {
      props: { ...options.props, mih: '10vh' },
    })
    const targetMih = getTarget(wrapperMih, selector)
    const elMih = targetMih.element as HTMLElement
    expect(elMih.style.minHeight).toBe('10vh')

    const { wrapper: wrapperMah } = render(options.component, {
      props: { ...options.props, mah: '20%' },
    })
    const targetMah = getTarget(wrapperMah, selector)
    const elMah = targetMah.element as HTMLElement
    expect(elMah.style.maxHeight).toBe('20%')
  })
}
