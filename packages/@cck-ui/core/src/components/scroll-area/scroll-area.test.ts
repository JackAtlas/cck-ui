import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScrollAreaProps, ScrollAreaStylesNames } from './scroll-area.types'
import { render, tests } from '@cck-ui-tests/core'
import CScrollArea from '.'
import { h, nextTick } from 'vue'

const defaultProps: ScrollAreaProps = {
  type: 'always',
}

const defaultSlots = {
  default: () => 'test',
}

function getViewport(container: HTMLElement) {
  const elements = container.querySelectorAll('div')
  const viewport = Array.from(elements).find((el) => {
    const style = window.getComputedStyle(el)
    return style.overflowX === 'scroll' || style.overflowY === 'scroll'
  })

  if (!viewport) {
    throw new Error('Viewport not found')
  }

  return viewport
}

describe('@cck-ui/core/scroll-area', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  tests.itSupportsSystemProps<ScrollAreaProps, ScrollAreaStylesNames>({
    component: CScrollArea,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CScrollArea',
    staticName: 'ScrollArea',
    stylesApiSelectors: ['root', 'viewport'],
  })

  it('calls onScrollPositionChange when scrolled', async () => {
    const spy = vi.fn()
    const props = {
      h: '100px',
      w: '100px',
      onScrollPositionChange: spy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px', width: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollTop', { value: 50, configurable: true })
    Object.defineProperty(viewport, 'scrollLeft', { value: 25, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    expect(spy).toHaveBeenCalledWith({ x: 25, y: 50 })
  })

  it('calls onBottomReached when scrolled to bottom', async () => {
    const spy = vi.fn()
    const props = {
      h: '100px',
      onBottomReached: spy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollHeight', { value: 500, configurable: true })
    Object.defineProperty(viewport, 'clientHeight', { value: 100, configurable: true })
    Object.defineProperty(viewport, 'scrollTop', { value: 400, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls onTopReached when scrolled to top', async () => {
    const spy = vi.fn()
    const props = {
      h: '100px',
      onTopReached: spy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollTop', { value: 50, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    Object.defineProperty(viewport, 'scrollTop', { value: 0, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls onLeftReached when scrolled to left', async () => {
    const spy = vi.fn()
    const props = {
      w: '100px',
      onLeftReached: spy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { width: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollLeft', { value: 50, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    Object.defineProperty(viewport, 'scrollLeft', { value: 0, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls onRightReached when scrolled to right', async () => {
    const spy = vi.fn()
    const props = {
      w: '100px',
      onRightReached: spy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { width: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollWidth', { value: 500, configurable: true })
    Object.defineProperty(viewport, 'clientWidth', { value: 100, configurable: true })
    Object.defineProperty(viewport, 'scrollLeft', { value: 400, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls scrollTo with startScrollPosition on mount', async () => {
    const scrollToSpy = vi.fn()
    const originalScrollTo = Element.prototype.scrollTo
    Element.prototype.scrollTo = scrollToSpy

    try {
      const props = {
        h: '100px',
        w: '100px',
        startScrollPosition: { x: 50, y: 100 },
      } satisfies Partial<ScrollAreaProps>
      render(CScrollArea, {
        props,
        slots: {
          default: () => h('div', { style: { height: '500px', width: '500px' } }, 'Content'),
        },
      })

      await nextTick()
      await new Promise((r) => requestAnimationFrame(() => r(null)))
      await nextTick()

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 50, top: 100 })
    } finally {
      Element.prototype.scrollTo = originalScrollTo
    }
  })

  it('does not call scrollTo when startScrollPosition is not provided', async () => {
    const scrollToSpy = vi.fn()
    const originalScrollTo = Element.prototype.scrollTo
    Element.prototype.scrollTo = scrollToSpy

    try {
      const props = {
        h: '100px',
        w: '100px',
      } satisfies Partial<ScrollAreaProps>
      render(CScrollArea, {
        props,
        slots: {
          default: () => h('div', { style: { height: '500px', width: '500px' } }, 'Content'),
        },
      })

      await nextTick()
      await new Promise((r) => requestAnimationFrame(() => r(null)))
      await nextTick()

      expect(scrollToSpy).not.toHaveBeenCalled()
    } finally {
      Element.prototype.scrollTo = originalScrollTo
    }
  })

  it('does not call boundary callbacks multiple times when at boundary', async () => {
    const topSpy = vi.fn()
    const bottomSpy = vi.fn()
    const props = {
      h: '100px',
      onTopReached: topSpy,
      onBottomReached: bottomSpy,
    } satisfies Partial<ScrollAreaProps>
    const { container } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    const viewport = getViewport(container)

    Object.defineProperty(viewport, 'scrollTop', { value: 200, configurable: true })
    Object.defineProperty(viewport, 'scrollHeight', { value: 500, configurable: true })
    Object.defineProperty(viewport, 'clientHeight', { value: 100, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    Object.defineProperty(viewport, 'scrollTop', { value: 0, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))
    viewport.dispatchEvent(new Event('scroll'))
    viewport.dispatchEvent(new Event('scroll'))

    expect(topSpy).toHaveBeenCalledTimes(1)
    expect(bottomSpy).toHaveBeenCalledTimes(0)

    Object.defineProperty(viewport, 'scrollTop', { value: 200, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))

    Object.defineProperty(viewport, 'scrollTop', { value: 400, configurable: true })
    viewport.dispatchEvent(new Event('scroll'))
    viewport.dispatchEvent(new Event('scroll'))

    expect(bottomSpy).toHaveBeenCalledTimes(1)
  })

  it('observes viewport when offsetScrollbars is present', async () => {
    const observeSpy = vi.spyOn(ResizeObserver.prototype, 'observe')

    const props = {
      h: '100px',
      offsetScrollbars: 'present',
    } satisfies Partial<ScrollAreaProps>

    try {
      render(CScrollArea, {
        props,
        slots: {
          default: () => h('div', { style: { height: '500px' } }, 'Content'),
        },
      })
      await nextTick()
      await nextTick()

      expect(observeSpy).toHaveBeenCalled()
    } finally {
      observeSpy.mockRestore()
    }
  })

  it('sets data-vertical-scrollbar-position on viewport and scrollbars when verticalScrollbarPosition is set', async () => {
    const props = {
      h: '100px',
      type: 'always',
      verticalScrollbarPosition: 'right',
    } satisfies Partial<ScrollAreaProps>
    const { wrapper } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px', width: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    expect(
      wrapper.find('[data-scrollarea-viewport]').attributes('data-vertical-scrollbar-position')
    ).toBe('right')
    expect(
      wrapper.find('[data-orientation="vertical"]').attributes('data-vertical-scrollbar-position')
    ).toBe('right')
    expect(
      wrapper.find('[data-orientation="horizontal"]').attributes('data-vertical-scrollbar-position')
    ).toBe('right')
  })

  it('does not set data-vertical-scrollbar-position when verticalScrollbarPosition is omitted', async () => {
    const props = {
      h: '100px',
      type: 'always',
    } satisfies Partial<ScrollAreaProps>
    const { wrapper } = render(CScrollArea, {
      props,
      slots: {
        default: () => h('div', { style: { height: '500px', width: '500px' } }, 'Content'),
      },
    })
    await nextTick()

    expect(
      wrapper.find('[data-scrollarea-viewport]').attributes('data-vertical-scrollbar-position')
    ).toBeUndefined()
    expect(
      wrapper.find('[data-orientation="vertical"]').attributes('data-vertical-scrollbar-position')
    ).toBeUndefined()
  })
})
