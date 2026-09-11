import { h } from 'vue'
import CTimeline, { CTimelineItem, TimelineProps, TimelineStylesNames } from '.'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'

const defaultSlots = {
  default: () => [
    h(
      CTimelineItem,
      { key: '1' },
      {
        bullet: () => '$',
        default: () => '1',
        opposite: () => 'Opposite 1',
        title: () => 'First',
      }
    ),
    h(
      CTimelineItem,
      { key: '2' },
      {
        bullet: () => '$',
        default: () => '2',
        opposite: () => 'Opposite 2',
        title: () => 'Second',
      }
    ),
    h(
      CTimelineItem,
      { key: '3' },
      {
        bullet: () => '$',
        default: () => '3',
        opposite: () => 'Opposite 3',
        title: () => 'Third',
      }
    ),
  ],
}

describe('@cck-ui/core/timeline', () => {
  tests.itSupportsSystemProps<TimelineProps, TimelineStylesNames>({
    component: CTimeline,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    name: 'CTimeline',
    staticName: 'Timeline',
    stylesApiSelectors: [
      'root',
      'item',
      'itemBody',
      'itemBullet',
      'itemContent',
      'itemOpposite',
      'itemTitle',
    ],
  })

  it('handles active item correctly', async () => {
    const props = {
      active: 1,
    } satisfies Partial<TimelineProps>
    const { wrapper, rerender } = render(CTimeline, { props, slots: defaultSlots })

    expect(wrapper.findAll('.c-Timeline-item[data-active]')).toHaveLength(2)
    expect(wrapper.findAll('.c-Timeline-item[data-line-active]')).toHaveLength(1)

    await rerender({ props: { active: 2 }, slots: defaultSlots })

    expect(wrapper.findAll('.c-Timeline-item[data-active]')).toHaveLength(3)
    expect(wrapper.findAll('.c-Timeline-item[data-line-active]')).toHaveLength(2)
  })

  it('sets data-opposite attribute when any item has opposite prop', () => {
    const { wrapper: wrapper1 } = render(CTimeline, {
      slots: [
        h(
          CTimelineItem,
          {},
          {
            default: () => '1',
            opposite: () => 'test',
          }
        ),
        h(
          CTimelineItem,
          {},
          {
            default: () => '2',
          }
        ),
      ],
    })

    const root1 = wrapper1.find('.c-Timeline-root')
    expect(root1.attributes('data-opposite')).toBeDefined()

    const { wrapper: wrapper2 } = render(CTimeline, {
      slots: [
        h(
          CTimelineItem,
          {},
          {
            default: () => '1',
          }
        ),
        h(
          CTimelineItem,
          {},
          {
            default: () => '2',
          }
        ),
      ],
    })
    const root2 = wrapper2.find('.c-Timeline-root')
    expect(root2.attributes('data-opposite')).toBeUndefined()
  })
})
