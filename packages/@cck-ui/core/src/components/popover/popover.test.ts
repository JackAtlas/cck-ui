import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import { flushPromises, type VueWrapper, type DOMWrapper } from '@vue/test-utils'
import { render, tests } from '@cck-ui-tests/core'
import CPopover, { CPopoverDropdown, CPopoverTarget, CPopoverContextMenu } from '.'
import type { PopoverProps } from './popover.types'

const defaultPopoverProps: Partial<PopoverProps> = {
  transitionProps: { duration: 0 },
  withinPortal: false,
  withArrow: true,
}

const defaultSlots = {
  default: () => [
    h(
      CPopoverTarget,
      {},
      {
        default: () => h('button', { type: 'button' }, 'test-target'),
      }
    ),
    h(
      CPopoverDropdown,
      {},
      {
        default: () => [
          h('div', 'test-dropdown'),
          h('input', { 'aria-label': '1' }),
          h('input', { 'aria-label': '2', 'data-autofocus': true }),
          h('input', { 'aria-label': '3' }),
        ],
      }
    ),
  ],
}

function renderPopover(
  props: Partial<PopoverProps> = {},
  slots: Record<string, any> = defaultSlots
) {
  return render(CPopover, {
    props: { ...defaultPopoverProps, ...props },
    slots,
  })
}

function getTarget(wrapper: VueWrapper<any>): DOMWrapper<Element> {
  return wrapper.find('[aria-haspopup]')
}

function isDropdownVisible(wrapper: VueWrapper<any>): boolean {
  const target = getTarget(wrapper)
  if (!target.exists()) {
    return false
  }
  return target.attributes('aria-expanded') === 'true'
}

function isContextMenuExpanded(wrapper: VueWrapper<any>): boolean {
  const area = wrapper.find('[data-testid="context-area"]')
  if (!area.exists()) {
    return false
  }
  return area.attributes('data-expanded') === 'true'
}

function fireContextMenu(el: Element, options: { clientX?: number; clientY?: number } = {}) {
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    composed: true,
    clientX: options.clientX,
    clientY: options.clientY,
  })
  el.dispatchEvent(event)
  return event
}

function fireMousedown(
  el: Element,
  options: { button?: number; clientX?: number; clientY?: number } = {}
) {
  const event = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    composed: true,
    button: options.button ?? 0,
    clientX: options.clientX,
    clientY: options.clientY,
  })
  el.dispatchEvent(event)
  return event
}

function fireTouchStart(el: Element, touches: Array<{ clientX: number; clientY: number }>) {
  const event = new Event('touchstart', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: touches, writable: false })
  Object.defineProperty(event, 'changedTouches', { value: touches, writable: false })
  el.dispatchEvent(event)
  return event
}

function fireTouchEnd(el: Element, changedTouches: Array<{ clientX: number; clientY: number }>) {
  const event = new Event('touchend', { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: [], writable: false })
  Object.defineProperty(event, 'changedTouches', {
    value: changedTouches,
    writable: false,
  })
  el.dispatchEvent(event)
  return event
}

describe('@cck-ui/core/popover', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  tests.axe([
    h(CPopover, { ...defaultPopoverProps, opened: true }, defaultSlots),
    h(CPopover, { ...defaultPopoverProps, opened: false }, defaultSlots),
  ])

  tests.itHasExtend({ component: CPopover })

  it('supports uncontrolled mode', async () => {
    const { wrapper } = renderPopover()
    await flushPromises()

    expect(isDropdownVisible(wrapper)).toBeFalsy()

    await wrapper.find('button[type="button"]').trigger('click')
    await flushPromises()
    expect(isDropdownVisible(wrapper)).toBeTruthy()

    await wrapper.find('button[type="button"]').trigger('click')
    await flushPromises()
    expect(isDropdownVisible(wrapper)).toBeFalsy()
  })

  it('correctly handles defaultOpened prop', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true })
    await flushPromises()
    expect(isDropdownVisible(wrapper)).toBeTruthy()
  })

  it('calls onOpen and onClose functions when dropdown state changes', async () => {
    const { wrapper } = renderPopover()
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    await wrapper.find('button[type="button"]').trigger('click')
    await flushPromises()
    expect(popover.emitted('open')).toHaveLength(1)
    expect(popover.emitted('close')).toBeUndefined()

    await wrapper.find('button[type="button"]').trigger('click')
    await flushPromises()
    expect(popover.emitted('open')).toHaveLength(1)
    expect(popover.emitted('close')).toHaveLength(1)
  })

  it('supports controlled mode', async () => {
    const { wrapper } = renderPopover({ opened: true })
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    await wrapper.find('button[type="button"]').trigger('click')
    await flushPromises()
    expect(popover.emitted('update:opened')).toBeUndefined()

    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    await dialog.trigger('keydown', { key: 'Escape' })
    await flushPromises()

    const changeEvents = popover.emitted('update:opened')
    expect(changeEvents).toHaveLength(1)
    expect(changeEvents?.[0]).toEqual([false])
  })

  it('correctly handles closeOnClickOutside={false}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, closeOnClickOutside: false })
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }))
    await flushPromises()

    expect(popover.emitted('close')).toBeUndefined()
  })

  it('correctly handles closeOnClickOutside={true}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, closeOnClickOutside: true })
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }))
    await flushPromises()

    expect(popover.emitted('close')?.length).toBeGreaterThanOrEqual(1)
  })

  it('correctly handles closeOnEscape={false}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, closeOnEscape: false })
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    const dialog = wrapper.find('[role="dialog"]')
    await dialog.trigger('keydown', { key: 'Escape' })
    await flushPromises()

    expect(popover.emitted('close')).toBeUndefined()
  })

  it('correctly handles closeOnEscape={true}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, closeOnEscape: true })
    const popover = wrapper.findComponent({ name: 'CPopover' })
    await flushPromises()

    const dialog = wrapper.find('[role="dialog"]')
    await dialog.trigger('keydown', { key: 'Escape' })
    await flushPromises()

    expect(popover.emitted('close')?.length).toBeGreaterThanOrEqual(1)
  })

  it('sets dropdown z-index based on zIndex prop', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, zIndex: 452 })
    await flushPromises()

    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    const el = dialog.element as HTMLElement
    expect(el.style.getPropertyValue('--popover-z-index')).toBe('452')
  })

  it('correctly handles withArrow={true}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, withArrow: true })
    await flushPromises()
    expect(wrapper.findAll('.c-Popover-arrow')).toHaveLength(1)
  })

  it('correctly handles withArrow={false}', async () => {
    const { wrapper } = renderPopover({ defaultOpened: true, withArrow: false })
    await flushPromises()
    expect(wrapper.findAll('.c-Popover-arrow')).toHaveLength(0)
  })

  it('updates dropdown placement when position prop changes while opened', async () => {
    const offsetHeightSpy = vi
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockReturnValue(100)
    const offsetWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(100)

    try {
      const { wrapper, rerender } = renderPopover({
        opened: true,
        position: 'bottom',
      })
      await flushPromises()
      await nextTick()

      let dialog = wrapper.find('[role="dialog"]')
      expect(dialog.attributes('data-position')).toBe('bottom')

      await rerender({ props: { position: 'top-end' } })
      await flushPromises()
      await nextTick()

      dialog = wrapper.find('[role="dialog"]')
      expect(dialog.attributes('data-position')).toBe('top-end')
    } finally {
      offsetHeightSpy.mockRestore()
      offsetWidthSpy.mockRestore()
    }
  })

  it('exposes PopoverTarget, PopoverDropdown and PopoverContextMenu as named exports', () => {
    expect(CPopoverTarget).toBeDefined()
    expect(CPopoverDropdown).toBeDefined()
    expect(CPopoverContextMenu).toBeDefined()
  })

  describe('Popover.ContextMenu', () => {
    function renderContextMenu(
      props: Partial<PopoverProps> = {},
      contextMenuProps: { disabled?: boolean; longPressDelay?: number } = {},
      childHandler?: (event: MouseEvent) => void
    ) {
      const slots = {
        default: () => [
          h(CPopoverContextMenu, contextMenuProps, {
            default: () =>
              h(
                'div',
                {
                  'data-testid': 'context-area',
                  onContextmenu: childHandler,
                },
                'Right-click me'
              ),
          }),
          h(
            CPopoverDropdown,
            {},
            {
              default: () => h('div', 'test-context-dropdown'),
            }
          ),
        ],
      }
      return render(CPopover, {
        props: { ...defaultPopoverProps, ...props },
        slots,
      })
    }

    it('opens the popover on contextmenu event', async () => {
      const { wrapper } = renderContextMenu()
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(false)

      const area = wrapper.find('[data-testid="context-area"]').element
      fireContextMenu(area, { clientX: 100, clientY: 200 })
      await flushPromises()

      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })

    it('prevents default browser context menu', async () => {
      const { wrapper } = renderContextMenu()
      const area = wrapper.find('[data-testid="context-area"]').element
      const event = fireContextMenu(area)
      expect(event.defaultPrevented).toBe(true)
    })

    it('does not open and does not prevent default when disabled', async () => {
      const { wrapper } = renderContextMenu({}, { disabled: true })
      const area = wrapper.find('[data-testid="context-area"]').element
      const event = fireContextMenu(area)
      expect(event.defaultPrevented).toBe(false)
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(false)
    })

    it('preserves custom onContextmenu handler on the wrapped child', async () => {
      const handler = vi.fn()
      const { wrapper } = renderContextMenu({}, {}, handler)
      const area = wrapper.find('[data-testid="context-area"]').element
      fireContextMenu(area, { clientX: 10, clientY: 10 })
      await flushPromises()

      expect(handler).toHaveBeenCalledTimes(1)
      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })

    it('sets data-expanded on the wrapped child when popover is open', async () => {
      const { wrapper } = renderContextMenu()
      let area = wrapper.find('[data-testid="context-area"]')
      expect(area.attributes('data-expanded')).toBeUndefined()

      fireContextMenu(area.element, { clientX: 10, clientY: 10 })
      await flushPromises()

      area = wrapper.find('[data-testid="context-area"]')
      expect(area.attributes('data-expanded')).toBe('true')
    })

    it('does not intercept right-click when parent Popover is disabled', async () => {
      const { wrapper } = renderContextMenu({ disabled: true })
      const area = wrapper.find('[data-testid="context-area"]').element
      const event = fireContextMenu(area)
      expect(event.defaultPrevented).toBe(false)
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(false)
    })

    it('does not toggle closed when right-clicked again while open', async () => {
      const { wrapper } = renderContextMenu()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireContextMenu(area, { clientX: 10, clientY: 10 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)

      fireContextMenu(area, { clientX: 50, clientY: 50 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })

    it('closes the popover when the trigger is left-clicked while open', async () => {
      const { wrapper } = renderContextMenu()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireContextMenu(area, { clientX: 10, clientY: 10 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)

      await wrapper.find('[data-testid="context-area"]').trigger('click')
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(false)
    })

    it('does not close the popover on the mousedown that precedes a right-click', async () => {
      const { wrapper } = renderContextMenu()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireContextMenu(area, { clientX: 10, clientY: 10 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)

      fireMousedown(area, { button: 2, clientX: 50, clientY: 50 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)

      fireContextMenu(area, { clientX: 50, clientY: 50 })
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })
  })

  describe('Popover.ContextMenu touch support', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    function renderTouchContextMenu(
      contextMenuProps: { disabled?: boolean; longPressDelay?: number } = {}
    ) {
      const slots = {
        default: () => [
          h(CPopoverContextMenu, contextMenuProps, {
            default: () => h('div', { 'data-testid': 'context-area' }, 'Long-press me'),
          }),
          h(
            CPopoverDropdown,
            {},
            {
              default: () => h('div', 'test-context-dropdown'),
            }
          ),
        ],
      }
      return render(CPopover, {
        props: defaultPopoverProps,
        slots,
      })
    }

    it('opens the popover on touch long-press', async () => {
      const { wrapper } = renderTouchContextMenu()
      await flushPromises()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireTouchStart(area, [{ clientX: 30, clientY: 40 }])
      await nextTick()
      expect(isContextMenuExpanded(wrapper)).toBe(false)

      vi.advanceTimersByTime(500)
      await flushPromises()

      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })

    it('does not open on a short tap', async () => {
      const { wrapper } = renderTouchContextMenu()
      await flushPromises()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireTouchStart(area, [{ clientX: 30, clientY: 40 }])
      vi.advanceTimersByTime(200)
      fireTouchEnd(area, [{ clientX: 30, clientY: 40 }])
      vi.advanceTimersByTime(500)
      await flushPromises()

      expect(isContextMenuExpanded(wrapper)).toBe(false)
    })

    it('does not open via touch when disabled', async () => {
      const { wrapper } = renderTouchContextMenu({ disabled: true })
      await flushPromises()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireTouchStart(area, [{ clientX: 30, clientY: 40 }])
      vi.advanceTimersByTime(500)
      await flushPromises()

      expect(isContextMenuExpanded(wrapper)).toBe(false)
    })

    it('respects a custom longPressDelay', async () => {
      const { wrapper } = renderTouchContextMenu({ longPressDelay: 1000 })
      await flushPromises()
      const area = wrapper.find('[data-testid="context-area"]').element

      fireTouchStart(area, [{ clientX: 0, clientY: 0 }])
      vi.advanceTimersByTime(500)
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(false)

      vi.advanceTimersByTime(500)
      await flushPromises()
      expect(isContextMenuExpanded(wrapper)).toBe(true)
    })
  })
})
