import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { GroupProps, GroupStylesNames } from './group.types'
import CGroup from '.'
import { h } from 'vue'

const defaultProps: GroupProps = {}

describe('@cck-ui/core/group', () => {
  tests.itSupportsSystemProps<GroupProps, GroupStylesNames>({
    component: CGroup,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    name: 'CGroup',
    staticName: 'Group',
    stylesApiSelectors: ['root'],
  })

  it('sets data-grow attributes based on grow prop', async () => {
    const { wrapper, rerender } = render(CGroup, {
      props: { grow: true },
      slots: { default: () => 'test' },
    })

    let root = wrapper.find('.c-Group-root')
    expect(root.attributes('data-grow')).toBeDefined()

    await rerender({ props: { grow: false } })
    root = wrapper.find('.c-Group-root')
    expect(root.attributes('data-grow')).toBeUndefined()
  })

  it('does not render falsy children', () => {
    const { wrapper } = render(CGroup, {
      slots: {
        default: () => [undefined, null, h('div', { key: '1' }, 'Valid child')],
      },
    })

    const root = wrapper.find('.c-Group-root')
    expect(root.element.children.length).toBe(1)
    expect(root.element.children[0]?.tagName).toBe('DIV')
  })
})
