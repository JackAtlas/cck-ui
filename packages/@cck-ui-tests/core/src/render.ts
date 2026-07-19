import { Component, defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { CckConfigProvider } from '@cck-ui/core'

export interface RenderOptions<
  Props extends Record<string, any> = Record<string, any>,
  Slots extends Record<string, any> = Record<string, any>,
> {
  props?: Props
  slots?: Slots
  attrs?: Record<string, unknown>
  global?: Record<string, unknown>
}

export function render<
  Props extends Record<string, any> = Record<string, any>,
  Slots extends Record<string, any> = Record<string, any>,
>(ui: Component, options: RenderOptions<Props, Slots> = {}) {
  const {
    props = {} as Props,
    slots = {} as Slots,
    attrs = {},
    global = { stubs: { transition: false, Transition: false } },
  } = options

  const Wrapper = defineComponent({
    props: {
      componentProps: { type: Object, default: () => ({}) },
      componentAttrs: { type: Object, default: () => ({}) },
      componentSlots: { type: Object, default: () => ({}) },
    },
    render() {
      const child = h(ui, { ...this.componentProps, ...this.componentAttrs }, this.componentSlots)
      return h(
        CckConfigProvider,
        { env: 'test', withGlobalClasses: false },
        { default: () => child }
      )
    },
  })

  const wrapper = mount(Wrapper, {
    props: {
      componentProps: props,
      componentAttrs: attrs,
      componentSlots: slots,
    },
    attachTo: document.body,
    global,
  })

  const container = wrapper.element

  const rerender = async (newProps: Partial<Props>) => {
    const currentProps = wrapper.props('componentProps') || {}
    await wrapper.setProps({ componentProps: { ...currentProps, ...newProps } })
  }

  return {
    wrapper,
    container,
    rerender,
  }
}

export async function renderWithAct<
  Props extends Record<string, any> = Record<string, any>,
  Slots extends Record<string, any> = Record<string, any>,
>(ui: Component, options: RenderOptions<Props, Slots> = {}) {
  const result = render(ui, options)
  await nextTick()
  return result
}
