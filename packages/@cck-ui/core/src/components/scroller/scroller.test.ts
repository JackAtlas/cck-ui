import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { ScrollerProps, ScrollerStylesNames } from './scroller.types'
import CScroller from '.'

const defaultSlots = {
  default: () => h('div', { style: { width: '1000px' } }, 'Test content'),
}

describe('@cck-ui/core/scroller', () => {
  tests.itSupportsSystemProps<ScrollerProps, ScrollerStylesNames>({
    component: CScroller,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CScroller',
    staticName: 'Scroller',
    stylesApiSelectors: ['root', 'container', 'content'],
  })

  it('renders children inside content element', () => {
    const { wrapper } = render(CScroller, { slots: () => 'test-children' })

    const content = wrapper.find('.c-Scroller-content')
    expect(content.text()).toContain('test-children')
  })

  it('supports custom scrollAmount prop', () => {
    const props = { scrollAmount: 500 } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Scroller-root')
    expect(root.exists()).toBeTruthy()
  })

  it('renders start control when showStartControl is true', () => {
    const props = { showStartControl: true } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const left = wrapper.find('[aria-label="Scroll left"]')
    expect(left.exists()).toBeTruthy()
  })

  it('renders end control when showEndControl is true', () => {
    const props = { showEndControl: true } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const right = wrapper.find('[aria-label="Scroll right"]')
    expect(right.exists()).toBeTruthy()
  })

  it('renders both controls when both show props are true', () => {
    const props = { showStartControl: true, showEndControl: true } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const left = wrapper.find('[aria-label="Scroll left"]')
    expect(left.exists()).toBeTruthy()

    const right = wrapper.find('[aria-label="Scroll right"]')
    expect(right.exists()).toBeTruthy()
  })

  it('applies startControlProps to start control', () => {
    const props = {
      startControlProps: { 'aria-label': 'Custom start label' },
    } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const left = wrapper.find('[aria-label="Custom start label"]')
    expect(left.exists()).toBeTruthy()
  })

  it('applies endControlProps to end control', () => {
    const props = {
      endControlProps: { 'aria-label': 'Custom end label' },
    } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const right = wrapper.find('[aria-label="Custom end label"]')
    expect(right.exists()).toBeTruthy()
  })

  it('renders custom start control icon', () => {
    const { wrapper } = render(CScroller, {
      slots: {
        ...defaultSlots,
        'start-control-icon': h('span', { 'data-testid': 'custom-start-icon' }),
      },
    })

    const icon = wrapper.find('[data-testid="custom-start-icon"]')
    expect(icon.exists()).toBeTruthy()
  })

  it('renders custom end control icon', () => {
    const { wrapper } = render(CScroller, {
      slots: {
        ...defaultSlots,
        'end-control-icon': h('span', { 'data-testid': 'custom-end-icon' }),
      },
    })

    const icon = wrapper.find('[data-testid="custom-end-icon"]')
    expect(icon.exists()).toBeTruthy()
  })

  it('sets data-position attribute on controls', () => {
    const props = {
      showStartControl: true,
      showEndControl: true,
    } satisfies ScrollerProps
    const { wrapper } = render(CScroller, { props, slots: defaultSlots })

    const left = wrapper.find('[aria-label="Scroll left"]')
    expect(left.attributes('data-position')).toBe('start')

    const right = wrapper.find('[aria-label="Scroll right"]')
    expect(right.attributes('data-position')).toBe('end')
  })
})
