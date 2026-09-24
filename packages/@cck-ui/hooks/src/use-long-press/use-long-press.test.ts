import { defineComponent, h } from 'vue'
import { useLongPress, UseLongPressOptions } from './use-long-press'
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

if ((typeof globalThis as any).TouchEvent === 'undefined') {
  ;(globalThis as any).TouchEvent = class TouchEvent extends Event {
    touches: any[]
    changedTouches: any[]
    targetTouches: any[]

    constructor(type: string, params: any = {}) {
      super(type, params)
      this.touches = params.touches ?? []
      this.changedTouches = params.changedTouches ?? []
      this.targetTouches = params.targetTouches ?? []
    }
  }
}

interface TestComponentProps {
  onLongPress: (event: MouseEvent | TouchEvent) => void
  options?: UseLongPressOptions
  testId?: string
}

const TestComponent = defineComponent({
  props: {
    onLongPress: { type: Function, required: true },
    options: { type: Object as () => UseLongPressOptions, default: () => ({}) },
    testId: { type: String, default: 'test-element' },
  },
  setup(props: TestComponentProps) {
    const handlers = useLongPress(props.onLongPress, props.options)
    return () =>
      h(
        'div',
        {
          'data-testid': props.testId ?? 'test-element',
          ...handlers,
          style: { width: '100px', height: '100px', background: 'gray' },
        },
        'Press Me'
      )
  },
})

const getElement = (wrapper: ReturnType<typeof mount>) =>
  wrapper.get('[data-testid="test-element"]')

describe('useLongPress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should call onLongPress after default threshold', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    expect(onLongPress).not.toHaveBeenCalled()

    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('mouseup')
    wrapper.unmount()
  })

  it('should call onLongPress after custom threshold', async () => {
    const onLongPress = vi.fn()
    const customThreshold = 1000
    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { threshold: customThreshold } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')

    vi.advanceTimersByTime(500)
    expect(onLongPress).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('mouseup')
    wrapper.unmount()
  })

  it('should not call onLongPress if released before threshold', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('mousedown')

    vi.advanceTimersByTime(300)
    await element.trigger('mouseup')

    vi.advanceTimersByTime(100)
    expect(onLongPress).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should call onStart callback on press start', async () => {
    const onLongPress = vi.fn()
    const onStart = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { onStart } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    expect(onStart).toHaveBeenCalledTimes(1)

    await element.trigger('mouseup')
    wrapper.unmount()
  })

  it('should call onFinish callback after long press is completed', async () => {
    const onLongPress = vi.fn()
    const onFinish = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { onFinish } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    vi.advanceTimersByTime(400)
    await element.trigger('mouseup')

    expect(onLongPress).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should call onCancel callback if press is canceled before threshold', async () => {
    const onLongPress = vi.fn()
    const onCancel = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { onCancel } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    await element.trigger('mouseup')

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should cancel long press when mouse leaves element', async () => {
    const onLongPress = vi.fn()
    const onCancel = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { onCancel } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    await element.trigger('mouseleave')

    vi.advanceTimersByTime(400)

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should handle touch events', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    vi.advanceTimersByTime(400)

    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })

  it('should handle touch events being canceled', async () => {
    const onLongPress = vi.fn()
    const onCancel = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { onCancel } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchend')

    vi.advanceTimersByTime(400)

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should render without crashing if onLongPress is not a function', () => {
    expect(() => {
      mount(TestComponent, {
        props: { onLongPress: 'not a function' as any },
      })
    }).not.toThrow()
  })

  it('should clean up timeout on unmount', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    wrapper.unmount()

    vi.advanceTimersByTime(400)
    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('should handle multiple presses correctly', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    vi.advanceTimersByTime(400)
    await element.trigger('mouseup')

    await element.trigger('mousedown')
    vi.advanceTimersByTime(400)
    await element.trigger('mouseup')

    expect(onLongPress).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('only triggers on touch when events is ["touch"]', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { events: ['touch'] } },
    })
    const element = getElement(wrapper)

    await element.trigger('mousedown')
    vi.advanceTimersByTime(400)
    expect(onLongPress).not.toHaveBeenCalled()

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })

  it('only triggers on mouse when events is ["mouse"]', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { events: ['mouse'] } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    vi.advanceTimersByTime(400)
    expect(onLongPress).not.toHaveBeenCalled()

    await element.trigger('mousedown')
    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('mouseup')
    wrapper.unmount()
  })

  it('cancels long press when touch moves beyond threshold with cancelOnMove', async () => {
    const onLongPress = vi.fn()
    const onCancel = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { cancelOnMove: true, onCancel } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchmove', { touches: [{ clientX: 0, clientY: 40 }] })

    vi.advanceTimersByTime(400)

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('does not cancel long press when touch moves within threshold with cancelOnMove', async () => {
    const onLongPress = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { cancelOnMove: true } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchmove', { touches: [{ clientX: 3, clientY: 3 }] })

    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })

  it('respects a custom numeric cancelOnMove threshold', async () => {
    const onLongPress = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { cancelOnMove: 50 } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchmove', { touches: [{ clientX: 0, clientY: 30 }] })

    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })

  it('cancels on any movement when cancelOnMove is 0', async () => {
    const onLongPress = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { cancelOnMove: 0 } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchmove', { touches: [{ clientX: 2, clientY: 0 }] })

    vi.advanceTimersByTime(400)
    expect(onLongPress).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  it('still fires with cancelOnMove 0 when there is no movement', async () => {
    const onLongPress = vi.fn()

    const wrapper = mount(TestComponent, {
      props: { onLongPress, options: { cancelOnMove: 0 } },
    })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 5, clientY: 5 }] })

    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })

  it('does not cancel on move when cancelOnMove is not set', async () => {
    const onLongPress = vi.fn()

    const wrapper = mount(TestComponent, { props: { onLongPress } })
    const element = getElement(wrapper)

    await element.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    await element.trigger('touchmove', { touches: [{ clientX: 0, clientY: 200 }] })

    vi.advanceTimersByTime(400)
    expect(onLongPress).toHaveBeenCalledTimes(1)

    await element.trigger('touchend')
    wrapper.unmount()
  })
})
