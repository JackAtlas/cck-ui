import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import { h } from 'vue'
import { EmptyStateProps, EmptyStateStylesNames } from './empty-state.types'
import {
  CEmptyState,
  CEmptyStateActions,
  CEmptyStateDescription,
  CEmptyStateIndicator,
  CEmptyStateTitle,
} from '.'

const defaultSlots = {
  icon: () => h('svg', { 'data-testid': 'icon' }),
  title: () => 'No results found',
  description: () => 'Try adjusting your filters.',
  actions: () => h('button', {}, 'Reset'),
}

const defaultProps: EmptyStateProps = {}

describe('@cck-ui/core/empty-state', () => {
  tests.itSupportsSystemProps<EmptyStateProps, EmptyStateStylesNames>({
    component: CEmptyState,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    refType: HTMLDivElement,
    name: 'CEmptyState',
    staticName: 'EmptyState',
    stylesApiSelectors: ['root', 'body', 'indicator', 'title', 'description', 'actions'],
  })

  it('exposes sub-components as static properties', () => {
    expect(CEmptyState.Actions).toBe(CEmptyStateActions)
    expect(CEmptyState.Description).toBe(CEmptyStateDescription)
    expect(CEmptyState.Indicator).toBe(CEmptyStateIndicator)
    expect(CEmptyState.Title).toBe(CEmptyStateTitle)
  })

  it('renders content from named slots', () => {
    const { wrapper } = render(CEmptyState, {
      slots: {
        icon: () => h('svg', { 'data-testid': 'icon' }),
        title: () => 'No results found',
        description: () => 'Try adjusting your filters.',
      },
    })

    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('No results found')
    expect(wrapper.text()).toContain('Try adjusting your filters.')
  })

  it('does not render parts when corresponding slot is not provided', () => {
    const { wrapper } = render(CEmptyState, {
      slots: {
        title: () => 'Only title',
      },
    })

    expect(wrapper.find('.c-EmptyState-indicator').exists()).toBe(false)
    expect(wrapper.find('.c-EmptyState-description').exists()).toBe(false)
    expect(wrapper.text()).toContain('Only title')
  })

  it('sets data-with-background on indicator when withIndicatorBackground is set', async () => {
    const { wrapper, rerender } = render(CEmptyState, {
      props: { withIndicatorBackground: true },
      slots: { icon: () => h('svg', { 'data-testid': 'icon' }) },
    })

    const indicator = wrapper.find('.c-EmptyState-indicator')
    expect(indicator.attributes('data-with-background')).toBeDefined()

    await rerender({ props: { withIndicatorBackground: false } })
    expect(indicator.attributes('data-with-background')).toBeUndefined()
  })

  it('sets data-align attribute on root', async () => {
    const { wrapper, rerender } = render(CEmptyState, {
      slots: { title: () => 'Title' },
    })

    let root = wrapper.find('.c-EmptyState-root')
    expect(root.attributes('data-align')).toBe('center')

    await rerender({ props: { align: 'left' } })
    root = wrapper.find('.c-EmptyState-root')
    expect(root.attributes('data-align')).toBe('left')

    await rerender({ props: { align: 'right' } })
    root = wrapper.find('.c-EmptyState-root')
    expect(root.attributes('data-align')).toBe('right')
  })

  it('does not render body when there is no body content', async () => {
    const { wrapper } = render(CEmptyState, {
      slots: { icon: () => h('svg', { 'data-testid': 'icon' }) },
    })
    expect(wrapper.find('.c-EmptyState-body').exists()).toBe(false)

    const { wrapper: wrapper2 } = render(CEmptyState, {
      slots: { icon: () => h('svg'), title: () => 'Title' },
    })
    expect(wrapper2.find('.c-EmptyState-body').exists()).toBe(true)
  })

  it('sets data-variant on root and forces indicator background when variant is set', () => {
    const { wrapper } = render(CEmptyState, {
      props: { variant: 'filled', color: 'red' },
      slots: { icon: () => h('svg', { 'data-testid': 'icon' }) },
    })

    const root = wrapper.find('.c-EmptyState-root')
    expect(root.attributes('data-variant')).toBe('filled')

    const indicator = wrapper.find('.c-EmptyState-indicator')
    expect(indicator.attributes('data-with-background')).toBeDefined()
  })

  it('renders title as a heading when order is set', () => {
    const { wrapper } = render(CEmptyState, {
      slots: {
        title: () => h(CEmptyStateTitle, { order: 2 }, () => 'Heading title'),
      },
    })

    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Heading title')
  })
})
