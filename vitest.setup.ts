import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import ResizeObserver from 'resize-observer-polyfill'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.stubGlobal('ResizeObserver', ResizeObserver)

const originalWarn = console.warn
console.warn = (...args) => {
  const msg = args[0]
  if (
    typeof msg === 'string' &&
    msg.includes('Avoid app logic that relies on enumerating keys on a component instance')
  ) {
    return
  }
  originalWarn(...args)
}

config.global.stubs = {}
