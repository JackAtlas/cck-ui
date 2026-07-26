import { Component } from 'vue'
import { render } from '../render'
import { getTarget } from '../utils/get-target'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  selector?: string
}

export function itSupportsFontsProps<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports ff, fz, lts, ta, lh, fs, tt and td props'
) {
  const { selector } = options

  it(name, () => {
    const { wrapper: wrapperTheme } = render(options.component, {
      props: { ...options.props, fz: 'xs' },
    })
    const targetTheme = getTarget(wrapperTheme, selector)
    const elTheme = targetTheme.element as HTMLElement
    expect(elTheme.style.fontSize).toBe('var(--c-font-size-xs)')

    const { wrapper: wrapperFz } = render(options.component, {
      props: { ...options.props, fz: 32 },
    })
    const targetFz = getTarget(wrapperFz, selector)
    const elFz = targetFz.element as HTMLElement
    expect(elFz.style.fontSize).toBe('calc(2rem * var(--c-scale))')

    const { wrapper: wrapperFw } = render(options.component, {
      props: { ...options.props, fw: 700 },
    })
    const targetFw = getTarget(wrapperFw, selector)
    const elFw = targetFw.element as HTMLElement
    expect(elFw.style.fontWeight).toBe('700')

    const { wrapper: wrapperFf } = render(options.component, {
      props: { ...options.props, ff: 'sans-serif' },
    })
    const targetFf = getTarget(wrapperFf, selector)
    const elFf = targetFf.element as HTMLElement
    expect(elFf.style.fontFamily).toBe('sans-serif')

    const { wrapper: wrapperLts } = render(options.component, {
      props: { ...options.props, lts: 16 },
    })
    const targetLts = getTarget(wrapperLts, selector)
    const elLts = targetLts.element as HTMLElement
    expect(elLts.style.letterSpacing).toBe('calc(1rem * var(--c-scale))')

    const { wrapper: wrapperTa } = render(options.component, {
      props: { ...options.props, ta: 'right' },
    })
    const targetTa = getTarget(wrapperTa, selector)
    const elTa = targetTa.element as HTMLElement
    expect(elTa.style.textAlign).toBe('right')

    const { wrapper: wrapperLh } = render(options.component, {
      props: { ...options.props, lh: 2.25 },
    })
    const targetLh = getTarget(wrapperLh, selector)
    const elLh = targetLh.element as HTMLElement
    expect(elLh.style.lineHeight).toBe('2.25')

    const { wrapper: wrapperFs } = render(options.component, {
      props: { ...options.props, fs: 'italic' },
    })
    const targetFs = getTarget(wrapperFs, selector)
    const elFs = targetFs.element as HTMLElement
    expect(elFs.style.fontStyle).toBe('italic')

    const { wrapper: wrapperTt } = render(options.component, {
      props: { ...options.props, tt: 'uppercase' },
    })
    const targetTt = getTarget(wrapperTt, selector)
    const elTt = targetTt.element as HTMLElement
    expect(elTt.style.textTransform).toBe('uppercase')

    const { wrapper: wrapperTd } = render(options.component, {
      props: { ...options.props, td: 'underline' },
    })
    const targetTd = getTarget(wrapperTd, selector)
    const elTd = targetTd.element as HTMLElement
    expect(elTd.style.textDecoration).toBe('underline')
  })
}
