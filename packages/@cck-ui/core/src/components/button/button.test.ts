import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import { ButtonProps, ButtonStylesNames } from './button.types'
import Button from '.'

const defaultProps: ButtonProps = {
  loading: true,
}

describe('@cck-ui/core/button', () => {
  tests.axe([
    {
      component: Button,
      options: {
        props: { 'aria-label': 'test' },
      },
    },
  ])

  tests.itSupportsFocusEvent<ButtonProps>({
    component: Button,
    props: {},
  })

  tests.itSupportsSystemProps<ButtonProps, ButtonStylesNames>({
    component: Button,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    name: 'CButton',
    stylesApiSelectors: ['root', 'inner', 'label', 'loader', 'section'],
  })

  it('sets disabled and data-loading attribute when loading prop is true', async () => {
    const { wrapper, rerender } = render(Button, {
      props: { loading: true },
    })
    const root = wrapper.find('button.c-Button-root')
    expect(root.exists()).toBe(true)

    expect(root.attributes('disabled')).toBeDefined()
    expect(root.attributes('data-loading')).toBe('true')

    expect(wrapper.find('.c-Button-loader').exists()).toBe(true)
    expect(wrapper.find('.c-Loader-root').exists()).toBe(true)

    await rerender({ loading: false })
    expect(root.attributes('disabled')).toBeUndefined()
    expect(root.attributes('data-loading')).toBeUndefined()
  })

  it('sets data-disabled attribute when disabled prop is true', async () => {
    const { wrapper, rerender } = render(Button, {
      props: { disabled: true },
    })
    const root = wrapper.find('button.c-Button-root')

    expect(root.attributes('disabled')).toBeDefined()
    expect(root.attributes('data-disabled')).toBe('true')

    await rerender({ disabled: false })
    expect(root.attributes('disabled')).toBeUndefined()
    expect(root.attributes('data-disabled')).toBeUndefined()
  })

  it('sets data-disabled attribute when data-disabled prop is true', async () => {
    const { wrapper, rerender } = render(Button, {
      props: { dataDisabled: true },
    })
    const root = wrapper.find('button.c-Button-root')

    expect(root.attributes('data-disabled')).toBe('true')

    await rerender({ dataDisabled: false })
    expect(root.attributes('data-disabled')).toBeUndefined()
  })

  it('renders given left section via slot and right section via props', () => {
    const { wrapper } = render(Button, {
      props: { rightSection: () => h('span', { id: 'right-prop' }, 'R') },
      slots: { 'left-section': () => 'L' },
    })
    const leftSection = wrapper.find('.c-Button-section[data-position="left"]')
    expect(leftSection.exists()).toBe(true)
    expect(leftSection.text()).toBe('L')

    const rightSection = wrapper.find('.c-Button-section[data-position="right"]')
    expect(rightSection.exists()).toBe(true)
    expect(rightSection.text()).toBe('R')
    expect(wrapper.find('#right-prop').exists()).toBe(true)
  })

  it('renders given right section via slot', () => {
    const { wrapper } = render(Button, {
      slots: { 'right-section': () => 'test-right-section' },
    })
    const section = wrapper.find('[data-position="right"]')
    expect(section.exists()).toBe(true)
    expect(section.text()).toBe('test-right-section')
  })
})
