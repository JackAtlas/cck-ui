import { h } from 'vue'
import CList, { CListItem, ListProps, ListStylesNames } from '.'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'

const defaultSlots = {
  default: () => [
    h(
      CListItem,
      { key: '1' },
      {
        icon: () => '$',
        default: () => '1',
      }
    ),
    h(
      CListItem,
      { key: '2' },
      {
        icon: () => '$',
        default: () => '2',
      }
    ),
    h(
      CListItem,
      { key: '3' },
      {
        icon: () => '$',
        default: () => '3',
      }
    ),
  ],
}

describe('@cck-ui/core/list', () => {
  tests.itSupportsSystemProps<ListProps, ListStylesNames>({
    component: CList,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CList',
    staticName: 'List',
    stylesApiSelectors: ['root', 'item', 'itemIcon', 'itemLabel', 'itemWrapper'],
  })

  it('changes root element based on type prop', async () => {
    const props = { type: 'ordered' } satisfies Partial<ListProps>
    const { wrapper, rerender } = render<ListProps>(CList, { props, slots: defaultSlots })

    expect(wrapper.find('ul').exists()).toBeFalsy()
    expect(wrapper.find('ol').exists()).toBeTruthy()

    const newProps = { type: 'unordered' } satisfies Partial<ListProps>
    await rerender({ props: newProps })

    expect(wrapper.find('ol').exists()).toBeFalsy()
    expect(wrapper.find('ul').exists()).toBeTruthy()
  })

  it('renders icon for all items when icon prop is set', () => {
    const { wrapper } = render(CList, {
      slots: {
        default: () => [h(CListItem, {}, () => 'Item 1'), h(CListItem, {}, () => 'Item 2')],
        icon: () => h('span', { 'data-testid': 'list-icon' }, () => '→'),
      },
    })

    expect(wrapper.findAll('[data-testid="list-icon"]')).toHaveLength(2)
  })

  it('allows ListItem to override List icon', () => {
    const { wrapper } = render(CList, {
      slots: {
        default: () => [
          h(CListItem, {}, () => 'Item 1'),
          h(
            CListItem,
            {},
            {
              default: () => 'Item 2',
              icon: () => h('span', { 'data-testid': 'item-icon' }, () => '•'),
            }
          ),
        ],
        icon: () => h('span', { 'data-testid': 'list-icon' }, () => '→'),
      },
    })

    expect(wrapper.findAll('[data-testid="list-icon"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-testid="item-icon"]')).toHaveLength(1)
  })

  it('centers items when center prop is true', () => {
    const { wrapper } = render<ListProps>(CList, {
      props: { center: true },
      slots: () => h(CListItem, {}, 'Item'),
    })

    const item = wrapper.find('.c-List-item')
    expect(item.attributes('data-centered')).toBeTruthy()
  })

  it('adds padding when withPadding is true', () => {
    const { wrapper } = render<ListProps>(CList, {
      props: { withPadding: true },
      slots: () => h(CListItem, {}, 'Item'),
    })

    const root = wrapper.find('.c-List-root')
    expect(root.attributes('data-with-padding')).toBeTruthy()
  })

  it('passes start attribute to ordered list', () => {
    const { wrapper } = render<ListProps>(CList, {
      props: { start: 5, type: 'ordered' },
      slots: () => h(CListItem, {}, 'Item'),
    })

    const ol = wrapper.find('ol')
    expect(ol.attributes('start')).toBe('5')
  })

  it('passes reversed attribute to ordered list', () => {
    const { wrapper } = render<ListProps>(CList, {
      props: { reversed: true, type: 'ordered' },
      slots: () => h(CListItem, {}, 'Item'),
    })

    const ol = wrapper.find('ol')
    expect(ol.attributes('reversed')).toBeDefined()
  })

  it('passes value attribute to list item', () => {
    const { wrapper } = render<ListProps>(CList, {
      props: { type: 'ordered' },
      slots: () => h(CListItem, { value: 5 }, 'Item'),
    })

    const li = wrapper.find('li')
    expect(li.attributes('value')).toBe('5')
  })
})
