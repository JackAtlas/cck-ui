import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: any
  props: Props
  selector?: string
}

export function itSupportsFocusEvent<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name: string = 'supports focus event'
) {
  it(name, async () => {
    const { wrapper } = render(options.component, {
      props: options.props,
    })

    const target = options.selector ? wrapper.find(options.selector) : wrapper.find('*:not(style)')

    expect(target.exists()).toBe(true)

    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const element = target.element

    element.addEventListener('focus', onFocus)
    element.addEventListener('blur', onBlur)

    const focusEvent = new Event('focus', { bubbles: true })
    const blurEvent = new Event('blur', { bubbles: true })
    element.dispatchEvent(focusEvent)
    element.dispatchEvent(blurEvent)

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledTimes(1)

    element.removeEventListener('focus', onFocus)
    element.removeEventListener('blur', onBlur)
  })
}
