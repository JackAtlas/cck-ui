import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useDisclosure } from './use-disclosure'

function renderHook<T>(hook: () => T) {
  let result: T | undefined
  const wrapper = mount(
    defineComponent({
      setup() {
        const data = hook()
        result = data
        return { data }
      },
      render: () => null,
    })
  )
  return {
    get result() {
      return result!
    },
    rerender: async () => {
      await wrapper.setProps({})
    },
    unmount: () => wrapper.unmount(),
  }
}

describe('@cck-ui/hooks/use-disclosure', () => {
  it('handles close correctly', () => {
    const hook = renderHook(() => useDisclosure(true))
    expect(hook.result.state.value).toBe(true)

    hook.result.handlers.close()
    expect(hook.result.state.value).toBe(false)
  })

  it('handles open correctly', () => {
    const hook = renderHook(() => useDisclosure(false))
    expect(hook.result.state.value).toBe(false)

    hook.result.handlers.open()
    expect(hook.result.state.value).toBe(true)
  })

  it('handles toggle correctly', () => {
    const hook = renderHook(() => useDisclosure(false))
    expect(hook.result.state.value).toBe(false)

    hook.result.handlers.toggle()
    expect(hook.result.state.value).toBe(true)

    hook.result.handlers.toggle()
    expect(hook.result.state.value).toBe(false)
  })

  it('handles onClose when close is called', () => {
    const spy = vi.fn()
    const hook = renderHook(() => useDisclosure(true, { onClose: spy }))
    expect(spy).toHaveBeenCalledTimes(0)

    hook.result.handlers.close()
    expect(spy).toHaveBeenCalledTimes(1)

    hook.result.handlers.close()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('handles onOpen when open is called', () => {
    const spy = vi.fn()
    const hook = renderHook(() => useDisclosure(false, { onOpen: spy }))
    expect(spy).toHaveBeenCalledTimes(0)

    hook.result.handlers.open()
    expect(spy).toHaveBeenCalledTimes(1)

    hook.result.handlers.open()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls onOpen and onClose correctly when toggle is called', () => {
    const onClose = vi.fn()
    const onOpen = vi.fn()
    const hook = renderHook(() => useDisclosure(false, { onOpen, onClose }))
    expect(onOpen).toHaveBeenCalledTimes(0)
    expect(onClose).toHaveBeenCalledTimes(0)

    hook.result.handlers.toggle()
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(0)

    hook.result.handlers.toggle()
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)

    hook.result.handlers.toggle()
    expect(onOpen).toHaveBeenCalledTimes(2)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
