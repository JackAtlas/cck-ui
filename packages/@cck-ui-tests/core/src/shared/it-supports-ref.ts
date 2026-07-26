import { Component, ref } from 'vue'
import { render } from '../render'

interface Options<Props extends Record<string, any> = any> {
  component: Component
  props: Props
  refType: any
  refProp?: string
}

export function itSupportsRef<Props extends Record<string, any> = any>(
  options: Options<Props>,
  name = 'supports ref'
) {
  it(name, () => {
    const elRef = ref<typeof options.refType | null>(null)

    render(options.component, {
      props: { ...options.props, ref: elRef },
    })

    const domElement = elRef.value[options.refProp || 'root'] ?? elRef.value

    expect(domElement).toBeInstanceOf(options.refType)
  })
}
