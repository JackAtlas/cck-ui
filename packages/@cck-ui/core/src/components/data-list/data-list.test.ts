import { h } from 'vue'
import CDataList, {
  CDataListItem,
  CDataListItemLabel,
  CDataListItemValue,
  DataListProps,
  DataListStylesNames,
} from '.'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'

const defaultSlots = {
  default: () =>
    h(CDataListItem, {}, () => [
      h(CDataListItemLabel, {}, () => 'Label'),
      h(CDataListItemValue, {}, () => 'Value'),
    ]),
}

describe('@cck-ui/core/data-list', () => {
  tests.itSupportsSystemProps<DataListProps, DataListStylesNames>({
    component: CDataList,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CDataList',
    staticName: 'DataList',
    stylesApiSelectors: ['root', 'item', 'itemLabel', 'itemValue'],
  })

  it('renders dl element', () => {
    const { wrapper } = render(CDataList, { slots: defaultSlots })

    const root = wrapper.find('.c-DataList-root')
    expect(root.element.tagName).toBe('DL')
  })

  it('renders dt and dd elements', () => {
    const { wrapper } = render(CDataList, { slots: defaultSlots })

    expect(wrapper.find('dt')).not.toBe(null)
    expect(wrapper.find('dd')).not.toBe(null)
  })

  it('sets data-orientation attribute', async () => {
    const { wrapper, rerender } = render(CDataList, { slots: defaultSlots })

    let root = wrapper.find('.c-DataList-root')
    expect(root.attributes('data-orientation')).toBe('horizontal')

    await rerender({ props: { orientation: 'vertical' } })
    root = wrapper.find('.c-DataList-root')
    expect(root.attributes('data-orientation')).toBe('vertical')
  })

  it('sets data-with-divider attribute', async () => {
    const { wrapper, rerender } = render(CDataList, {
      props: { withDivider: true },
      slots: defaultSlots,
    })

    let root = wrapper.find('.c-DataList-root')
    expect(root.attributes('data-with-divider')).toBeDefined()

    await rerender({ props: { withDivider: undefined } })
    root = wrapper.find('.c-DataList-root')
    expect(root.attributes('data-with-divider')).toBeUndefined()
  })
})
