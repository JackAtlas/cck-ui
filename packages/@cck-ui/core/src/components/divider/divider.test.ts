import { describe, expect, it } from 'vitest'
import { DividerProps, DividerStylesNames } from './divider.types'
import { render, tests } from '@cck-ui-tests/core'
import CDivider from '.'

const defaultProps: DividerProps = {}

describe('@cck-ui/core/divider', () => {
  tests.itSupportsSystemProps<DividerProps, DividerStylesNames>({
    component: CDivider,
    props: defaultProps,
    varsResolver: true,
    name: 'CDivider',
    staticName: 'Divider',
    stylesApiSelectors: ['root', 'label'],
    slots: {
      label: () => 'test-label',
    },
  })

  it('sets data-orientation attribute based on orientation prop', async () => {
    const { wrapper, rerender } = render(CDivider, {
      props: { orientation: 'horizontal' },
    })

    const root = wrapper.find('.c-Divider-root')
    expect(root.attributes('data-orientation')).toBe('horizontal')

    await rerender({ props: { orientation: 'vertical' } })
    expect(root.attributes('data-orientation')).toBe('vertical')
  })

  it('sets data-position on label element based on labelPosition prop', () => {
    const { wrapper } = render(CDivider, {
      props: { labelPosition: 'left' },
      slots: { label: () => 'test-label' },
    })

    const label = wrapper.find('.c-Divider-label')
    expect(label.attributes('data-position')).toBe('left')
  })

  it('sets data-with-label attribute when label is present', async () => {
    const { wrapper, rerender } = render(CDivider, {
      slots: { label: () => 'test-label' },
    })

    const root = wrapper.find('.c-Divider-root')
    expect(root.attributes('data-with-label')).toBeDefined()

    await rerender({ slots: {} })
  })
})
