import { describe, expect, it } from 'vitest'
import { BadgeProps, BadgeStylesNames } from './badge.types'
import { render, tests } from '@cck-ui-tests/core'
import CBadge from '.'

const defaultProps: BadgeProps = {
  leftSection: 'L',
  rightSection: 'R',
}

describe('@cck-ui/core/badge', () => {
  tests.itSupportsSystemProps<BadgeProps, BadgeStylesNames>({
    component: CBadge,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    children: true,
    name: 'CBadge',
    staticName: 'Badge',
    stylesApiSelectors: ['root', 'label', 'section'],
  })

  it('sets data-block attribute on root element if fullWidth prop is set', async () => {
    const { wrapper, rerender } = render(CBadge, { props: { ...defaultProps, fullWidth: true } })

    let root = wrapper.find('.c-Badge-root')
    expect(root.attributes('data-block')).toBeDefined()

    await rerender({ props: { ...defaultProps, fullWidth: false } })
    root = wrapper.find('.c-Badge-root')
    expect(root.attributes('data-block')).toBeUndefined()
  })

  it('renders given left and right sections via props', () => {
    const { wrapper } = render(CBadge, { props: defaultProps })

    const leftSection = wrapper.find('.c-Badge-section[data-position="left"]')
    expect(leftSection.text()).toBe('L')

    const rightSection = wrapper.find('.c-Badge-section[data-position="right"]')
    expect(rightSection.text()).toBe('R')
  })

  it('renders given left and right sections via slots', () => {
    const { wrapper } = render(CBadge, {
      slots: {
        'left-section': () => 'L',
        'right-section': () => 'R',
      },
    })

    const leftSection = wrapper.find('.c-Badge-section[data-position="left"]')
    expect(leftSection.text()).toBe('L')

    const rightSection = wrapper.find('.c-Badge-section[data-position="right"]')
    expect(rightSection.text()).toBe('R')
  })
})
