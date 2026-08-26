import { describe, expect, it } from 'vitest'
import { BoxProps } from './box.types'
import { render, tests } from '@cck-ui-tests/core'
import CBox from '.'

const defaultProps: BoxProps = {}

describe('@cck-ui/core/Box', () => {
  tests.itSupportsSystemProps<BoxProps>({
    component: CBox,
    props: defaultProps,
    polymorphic: true,
    children: true,
    withProps: false,
    extend: false,
    classes: false,
    providerName: null,
    staticName: 'Box',
  })

  it('sets data-variant attribute based on variant prop', () => {
    const { wrapper } = render(CBox, {
      props: { variant: 'test' },
      slots: { default: () => 'test' },
    })

    const el = wrapper.find('[data-variant="test"]')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe('test')
  })

  it('sets data-size based on size prop', async () => {
    const { wrapper, rerender } = render(CBox, {
      props: { size: 'xs' },
      slots: { default: () => 'test' },
    })

    let el = wrapper.find('[data-size="xs"]')
    expect(el.exists()).toBe(true)

    await rerender({ props: { size: '5rem' } })
    el = wrapper.find('[data-size="5rem"]')
    expect(el.exists()).toBe(false)
    expect(wrapper.find('[data-size]').exists()).toBe(false)

    await rerender({ props: { size: '5' } })
    el = wrapper.find('[data-size="5"]')
    expect(el.exists()).toBe(false)
    expect(wrapper.find('[data-size]').exists()).toBe(false)
  })

  it('supports mod prop', async () => {
    const { wrapper, rerender } = render(CBox, {
      props: { mod: { 'data-test': 'test' } },
      slots: { default: () => 'test' },
    })

    let el = wrapper.find('[data-test="test"]')
    expect(el.exists()).toBe(true)

    await rerender({
      props: {
        mod: [
          'test',
          { 'data-test-2': 'test-2' },
          [[[[[[{ 'data-test-2': false, 'data-test-3': null }]]]]]],
        ] as any,
      },
    })

    el = wrapper.find('[data-test]')
    expect(el.exists()).toBe(true)

    el = wrapper.find('[data-test-2="test-2"]')
    expect(el.exists()).toBe(true)

    el = wrapper.find('[data-test-3]')
    expect(el.exists()).toBe(false)
  })
})
