import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, ref, nextTick, type PropType } from 'vue'
import { mount } from '@vue/test-utils'
import { useClickOutside } from './use-click-outside'

interface TargetProps {
  handler: (event: Event) => void
  events?: string[] | null
  nodes?: (HTMLElement | null)[]
  enabled?: boolean
}

const Target = defineComponent({
  name: 'TestTarget',
  props: {
    handler: { type: Function as PropType<(event: Event) => void>, required: true },
    events: { type: Array as PropType<string[] | null>, default: undefined },
    nodes: { type: Array as PropType<(HTMLElement | null)[]>, default: undefined },
    enabled: { type: Boolean, default: true },
  },
  setup(props) {
    const refEl = useClickOutside<HTMLDivElement>((event) => props.handler(event), {
      events: () => props.events,
      nodes: () => props.nodes,
      enabled: () => props.enabled,
    })
    return () => h('div', { 'data-testid': 'target', ref: refEl })
  },
})

function renderApp(
  targetProps: Partial<TargetProps> & { handler: (event: Event) => void },
  extra?: () => any
) {
  return mount(
    defineComponent({
      setup() {
        return () =>
          h('div', [
            h(Target, targetProps as any),
            extra ? extra() : h('div', { 'data-testid': 'outside-target' }),
          ])
      },
    }),
    { attachTo: document.body }
  )
}

function mousedown(el: Element) {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, composed: true }))
}

function keydown(key = 'Enter') {
  document.body.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, composed: true })
  )
}

describe('@cck-ui/hooks/use-click-outside', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('calls handler function when clicked outside target (no events given)', () => {
    const handler = vi.fn()
    const wrapper = renderApp({ handler })

    const target = wrapper.find('[data-testid="target"]').element
    const outside = wrapper.find('[data-testid="outside-target"]').element

    expect(handler).toHaveBeenCalledTimes(0)

    mousedown(target)
    expect(handler).toHaveBeenCalledTimes(0)

    mousedown(outside)
    expect(handler).toHaveBeenCalledTimes(1)

    mousedown(outside)
    expect(handler).toHaveBeenCalledTimes(2)

    mousedown(target)
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('calls handler only on given events', () => {
    const handler = vi.fn()
    const wrapper = renderApp({ handler, events: ['keydown'] })

    const target = wrapper.find('[data-testid="target"]').element
    const outside = wrapper.find('[data-testid="outside-target"]').element

    mousedown(target)
    mousedown(outside)
    expect(handler).toHaveBeenCalledTimes(0)

    keydown('Enter')
    keydown('Enter')
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('ignores clicks outside the given nodes', () => {
    const handler = vi.fn()
    const ignoreEl = document.createElement('div')
    ignoreEl.setAttribute('data-testid', 'ignore-clicks')
    document.body.appendChild(ignoreEl)

    const wrapper = renderApp({ handler, nodes: [ignoreEl] }, () => null)

    mousedown(ignoreEl)
    expect(handler).toHaveBeenCalledTimes(0)

    const target = wrapper.find('[data-testid="target"]').element
    mousedown(target)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('calls the latest handler after rerender (no stale closure)', async () => {
    const first = vi.fn()
    const second = vi.fn()

    const handlerRef = ref<(event: Event) => void>(first)

    const Host = defineComponent({
      setup() {
        return () =>
          h('div', [
            h(Target, { handler: handlerRef.value } as any),
            h('div', { 'data-testid': 'outside-target' }),
          ])
      },
    })

    const wrapper = mount(Host, { attachTo: document.body })

    handlerRef.value = second
    await nextTick()

    mousedown(wrapper.find('[data-testid="outside-target"]').element)

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('does not re-register listeners when handler identity changes', async () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')

    const handlerRef = ref<(event: Event) => void>(vi.fn())

    const Host = defineComponent({
      setup() {
        return () =>
          h('div', [
            h(Target, { handler: handlerRef.value } as any),
            h('div', { 'data-testid': 'outside-target' }),
          ])
      },
    })

    mount(Host, { attachTo: document.body })
    await nextTick()

    const initialAdds = addSpy.mock.calls.filter(([t]) => t === 'mousedown').length
    const initialRemoves = removeSpy.mock.calls.filter(([t]) => t === 'mousedown').length

    handlerRef.value = vi.fn()
    await nextTick()

    expect(addSpy.mock.calls.filter(([t]) => t === 'mousedown').length).toBe(initialAdds)
    expect(removeSpy.mock.calls.filter(([t]) => t === 'mousedown').length).toBe(initialRemoves)
  })

  it('does not call handler when enabled is false', () => {
    const handler = vi.fn()
    const wrapper = renderApp({ handler, enabled: false })

    mousedown(wrapper.find('[data-testid="outside-target"]').element)
    expect(handler).not.toHaveBeenCalled()
  })

  it('starts calling handler when enabled changes from false to true', async () => {
    const handler = vi.fn()
    const enabledRef = ref(false)

    const Host = defineComponent({
      setup() {
        return () =>
          h('div', [
            h(Target, { handler, enabled: enabledRef.value } as any),
            h('div', { 'data-testid': 'outside-target' }),
          ])
      },
    })

    const wrapper = mount(Host, { attachTo: document.body })

    mousedown(wrapper.find('[data-testid="outside-target"]').element)
    expect(handler).not.toHaveBeenCalled()

    enabledRef.value = true
    await nextTick()

    mousedown(wrapper.find('[data-testid="outside-target"]').element)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('stops calling handler when enabled changes from true to false', async () => {
    const handler = vi.fn()
    const enabledRef = ref(true)

    const Host = defineComponent({
      setup() {
        return () =>
          h('div', [
            h(Target, { handler, enabled: enabledRef.value } as any),
            h('div', { 'data-testid': 'outside-target' }),
          ])
      },
    })

    const wrapper = mount(Host, { attachTo: document.body })

    mousedown(wrapper.find('[data-testid="outside-target"]').element)
    expect(handler).toHaveBeenCalledTimes(1)

    enabledRef.value = false
    await nextTick()

    mousedown(wrapper.find('[data-testid="outside-target"]').element)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('propagates event to handler', () => {
    const handler = vi.fn()
    const wrapper = renderApp({ handler })

    const outside = wrapper.find('[data-testid="outside-target"]').element

    mousedown(outside)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent))

    const event = handler.mock.calls[0][0] as MouseEvent
    expect(event.type).toBe('mousedown')
    expect(event.target).toBe(outside)
  })
})
