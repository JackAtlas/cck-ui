import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useDebouncedCallback } from './use-debounced-callback'

function renderHook<T>(composable: () => T) {
  let resultValue: T | null = null

  const TestComponent = defineComponent({
    setup() {
      resultValue = composable()
      return () => null
    },
  })

  const wrapper = mount(TestComponent)

  return {
    result: {
      get current() {
        return resultValue!
      },
    },
    async rerender() {
      await nextTick()
    },
    unmount() {
      wrapper.unmount()
    },
  }
}

describe('@cck-ui/hooks/use-debounced-callback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces callback with given delay', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current()
    result.current()
    result.current()
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalled()
  })

  it('calls callback with correct arguments', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current(2)
    result.current(3)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('can be flushed immediately', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current(2)
    result.current(3)
    result.current.flush()
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('can be flushed immediately after rerender', async () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    await rerender()
    result.current.flush()
    expect(callback).toHaveBeenCalledWith(1)
  })

  it('does not flush twice', async () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.flush()
    expect(callback).toHaveBeenCalledWith(1)
    callback.mockClear()
    await rerender()
    result.current.flush()
    expect(callback).not.toHaveBeenCalled()
  })

  it('does not flush after being called if not called since', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledWith(1)
    callback.mockClear()
    result.current.flush()
    expect(callback).not.toHaveBeenCalled()
  })

  it('does not still call after flush if not called since', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.flush()
    expect(callback).toHaveBeenCalledWith(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('can flush on unmount', () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true })
    )
    result.current(1)
    result.current(2)
    result.current(3)
    unmount()
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('flushes on option changes', async () => {
    const callback = vi.fn()
    const delay = ref(100)
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, () => ({ flushOnUnmount: true, delay: delay.value }))
    )
    result.current(1)
    delay.value = 200
    await nextTick()
    expect(callback).toHaveBeenCalledWith(1)
  })

  it('cancels on option changes', async () => {
    const callback = vi.fn()
    const delay = ref(100)
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, () => ({ flushOnUnmount: false, delay: delay.value }))
    )
    result.current(1)
    delay.value = 200
    await nextTick()
    vi.advanceTimersByTime(200)
    expect(callback).not.toHaveBeenCalled()
  })

  it('can flush on unmount after rerender', async () => {
    const callback = vi.fn()
    const { result, unmount, rerender } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true })
    )
    result.current(1)
    result.current(2)
    result.current(3)
    await rerender()
    unmount()
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('does not call after unmount if timer lapsed', () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: false })
    )
    result.current(1)
    unmount()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
  })

  it('does not call on unmount if never called', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true })
    )
    unmount()
    expect(callback).not.toHaveBeenCalled()
  })

  it('does not call on unmount if already called and not called since', () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, flushOnUnmount: true })
    )
    result.current(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalled()
    callback.mockClear()
    unmount()
    expect(callback).not.toHaveBeenCalled()
  })

  it('debounces callback with leading=true', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )
    result.current(1)
    expect(callback).toHaveBeenCalledWith(1)

    callback.mockClear()
    result.current(2)
    result.current(3)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
  })

  it('resets leading after delay with leading=true', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )

    result.current('a')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('a')

    result.current('b')
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('c')
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenNthCalledWith(2, 'c')
  })

  it('does not call on leading edge if leading changes from true to false', async () => {
    const callback = vi.fn()
    const leading = ref(true)
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, () => ({ delay: 100, leading: leading.value }))
    )
    leading.value = false
    await nextTick()
    result.current(1)
    result.current(2)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does call again on leading edge if options change and it was already called before the change', async () => {
    const callback = vi.fn()
    const delay = ref(100)
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, () => ({ delay: delay.value, leading: true }))
    )
    result.current(1)
    expect(callback).toHaveBeenCalledTimes(1)

    delay.value = 200
    await nextTick()

    result.current(2)
    expect(callback).toHaveBeenCalledTimes(2)

    result.current(3)
    expect(callback).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('can cancel debounced callback', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current(2)
    result.current(3)
    result.current.cancel()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
  })

  it('can cancel after second render', async () => {
    const callback = vi.fn()
    const { result, rerender } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    await rerender()
    result.current.cancel()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
  })

  it('can cancel multiple times without error', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.cancel()
    result.current.cancel()
    result.current.cancel()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
  })

  it('can cancel and then call again', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.cancel()
    result.current(2)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it('cancel does not affect already executed callback', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledWith(1)
    result.current.cancel()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('cancel resets leading flag for leading=true', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )

    result.current('a')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('a')

    result.current('b')
    expect(callback).toHaveBeenCalledTimes(1)

    result.current.cancel()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('c')
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('c')
  })

  it('cancel prevents flush from working after cancel', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.cancel()
    result.current.flush()
    expect(callback).not.toHaveBeenCalled()
  })

  it('flush works after cancel if new call is made', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    result.current.cancel()
    result.current(2)
    result.current.flush()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it('isPending returns true when a call is pending', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    expect(result.current.isPending()).toBe(false)
    result.current(1)
    expect(result.current.isPending()).toBe(true)
    vi.advanceTimersByTime(100)
    expect(result.current.isPending()).toBe(false)
  })

  it('isPending returns false after cancel', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    expect(result.current.isPending()).toBe(true)
    result.current.cancel()
    expect(result.current.isPending()).toBe(false)
  })

  it('isPending returns false after leading-edge call', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )
    expect(result.current.isPending()).toBe(false)
    result.current(1)
    expect(result.current.isPending()).toBe(false)
  })

  it('isPending returns true for subsequent calls in leading mode', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )
    result.current(1)
    result.current(2)
    expect(result.current.isPending()).toBe(true)
    vi.advanceTimersByTime(100)
    expect(result.current.isPending()).toBe(false)
  })

  it('isPending returns false after flush', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current(1)
    expect(result.current.isPending()).toBe(true)
    result.current.flush()
    expect(result.current.isPending()).toBe(false)
  })

  it('maxWait fires callback after max wait time during continuous calls', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, maxWait: 250 })
    )

    result.current(1)
    vi.advanceTimersByTime(80)
    result.current(2)
    vi.advanceTimersByTime(80)
    result.current(3)
    vi.advanceTimersByTime(80)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(10)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('maxWait does not fire if delay fires first', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, maxWait: 500 })
    )

    result.current(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    callback.mockClear()
    vi.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()
  })

  it('maxWait is cleared by cancel', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, maxWait: 200 })
    )

    result.current(1)
    vi.advanceTimersByTime(50)
    result.current.cancel()
    vi.advanceTimersByTime(200)
    expect(callback).not.toHaveBeenCalled()
  })

  it('maxWait with leading fires trailing after maxWait during continuous calls', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true, maxWait: 200 })
    )

    result.current(1)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    vi.advanceTimersByTime(50)
    result.current(2)

    vi.advanceTimersByTime(70)
    result.current(3)

    vi.advanceTimersByTime(70)
    result.current(4)

    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(10)
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(4)
  })

  it('leading=true should suppress trailing execution', () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 100, leading: true })
    )
    result.current('first')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('first')

    result.current('second')
    expect(callback).toHaveBeenCalledTimes(1)

    callback.mockClear()
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()

    result.current('third')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('third')
  })
})
