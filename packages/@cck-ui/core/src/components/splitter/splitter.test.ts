import { defineComponent, h, ref } from 'vue'
import CSplitter, { CSplitterPane } from '.'
import { SplitterProps, SplitterStylesNames } from './splitter.types'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'

type SplitterInstance = InstanceType<typeof CSplitter>

const createPanes = (
  panes: Array<{
    defaultSize: number | string
    min?: number | string
    content: string
    key?: string
  }>
) => {
  return panes.map((pane, index) =>
    h(
      CSplitterPane,
      {
        defaultSize: pane.defaultSize as any,
        min: pane.min as any,
        key: pane.key || `pane-${index}`,
      },
      () => pane.content
    )
  )
}

const defaultSlots = {
  default: () =>
    createPanes([
      { defaultSize: 50, min: 10, content: 'Left pane', key: '1' },
      { defaultSize: 50, min: 10, content: 'Right pane', key: '2' },
    ]),
}

describe('@cck-ui/core/splitter', () => {
  tests.axe([
    {
      component: CSplitter,
      options: {
        slots: defaultSlots,
      },
    },
  ])

  tests.itSupportsSystemProps<SplitterProps, SplitterStylesNames>({
    component: CSplitter,
    props: {
      withHandle: true,
    },
    slots: defaultSlots,
    varsResolver: true,
    name: 'CSplitter',
    staticName: 'Splitter',
    stylesApiSelectors: ['root', 'pane', 'handle', 'thumb'],
  })

  it('renders panes with correct content', () => {
    const { wrapper } = render(CSplitter, {
      slots: defaultSlots,
    })
    expect(wrapper.text()).toContain('Left pane')
    expect(wrapper.text()).toContain('Right pane')
  })

  it('renders separator handles between panes', () => {
    const { wrapper } = render(CSplitter, {
      slots: defaultSlots,
    })
    const handles = wrapper.findAll('[role="separator"]')
    expect(handles).toHaveLength(1)
  })

  it('renders correct number of handles for 3 panes', () => {
    const { wrapper } = render(CSplitter, {
      slots: {
        default: () =>
          createPanes([
            { defaultSize: 33, min: 10, content: 'First' },
            { defaultSize: 34, min: 10, content: 'Second' },
            { defaultSize: 33, min: 10, content: 'Third' },
          ]),
      },
    })
    const handles = wrapper.findAll('[role="separator"]')
    expect(handles).toHaveLength(2)
  })

  it('sets data-orientation on handles', () => {
    const { wrapper } = render(CSplitter, {
      props: { orientation: 'horizontal' },
      slots: defaultSlots,
    })
    const handle = wrapper.find('[role="separator"]')
    expect(handle.attributes('data-orientation')).toBe('horizontal')
  })

  it('sets vertical orientation on handles', () => {
    const { wrapper } = render(CSplitter, {
      props: { orientation: 'vertical' },
      slots: defaultSlots,
    })
    const handle = wrapper.find('[role="separator"]')
    expect(handle.attributes('data-orientation')).toBe('vertical')
  })

  it('sets aria-orientation on handles', () => {
    const { wrapper } = render(CSplitter, {
      props: { orientation: 'horizontal' },
      slots: defaultSlots,
    })
    const handle = wrapper.find('[role="separator"]')
    expect(handle.attributes('aria-orientation')).toBe('horizontal')
  })

  it('renders percentage panes with percent flex-basis', () => {
    const { wrapper } = render(CSplitter, {
      slots: {
        default: () =>
          createPanes([
            { defaultSize: 30, content: 'Left' },
            { defaultSize: 70, content: 'Right' },
          ]),
      },
    })
    const panes = wrapper.findAll('.c-Splitter-pane')
    expect((panes[0].element as HTMLElement).style.flexBasis).toBe('30%')
    expect((panes[1].element as HTMLElement).style.flexBasis).toBe('70%')
  })

  it('renders fixed pixel pane with pixel flex-basis and flexible neighbor with flex-grow', () => {
    const { wrapper } = render(CSplitter, {
      slots: {
        default: () =>
          createPanes([
            { defaultSize: '240px', content: 'Sidebar' },
            { defaultSize: 60, content: 'Content' },
          ]),
      },
    })
    const panes = wrapper.findAll('.c-Splitter-pane')
    const sidebar = panes[0]
    const content = panes[1]
    expect((sidebar.element as HTMLElement).style.flexGrow).toBe('0')
    expect((sidebar.element as HTMLElement).style.flexBasis).toBe('240px')
    expect((content.element as HTMLElement).style.flexGrow).toBe('60')
  })

  it('renders fixed rem pane with rem flex-basis', () => {
    const { wrapper } = render(CSplitter, {
      slots: {
        default: () =>
          createPanes([
            { defaultSize: '15rem', content: 'Sidebar' },
            { defaultSize: 60, content: 'Content' },
          ]),
      },
    })
    const panes = wrapper.findAll('.c-Splitter-pane')
    const sidebar = panes[0]
    expect((sidebar.element as HTMLElement).style.flexGrow).toBe('0')
    expect((sidebar.element as HTMLElement).style.flexBasis).toBe('15rem')
  })

  it('uses pixel-mode flex styles when only the step uses a fixed unit (matches the hook)', () => {
    const { wrapper } = render(CSplitter, {
      props: { step: '10px' },
      slots: {
        default: () =>
          createPanes([
            { defaultSize: 1, content: 'Left' },
            { defaultSize: 1, content: 'Right' },
          ]),
      },
    })
    const panes = wrapper.findAll('.c-Splitter-pane')
    expect((panes[0].element as HTMLElement).style.flexGrow).toBe('1')
    expect((panes[1].element as HTMLElement).style.flexGrow).toBe('1')
  })

  it('uses pixel-mode flex styles when only a min uses a fixed unit (matches the hook)', () => {
    const { wrapper } = render(CSplitter, {
      slots: {
        default: () =>
          createPanes([
            { defaultSize: 1, min: '100px', content: 'Left' },
            { defaultSize: 1, content: 'Right' },
          ]),
      },
    })
    const panes = wrapper.findAll('.c-Splitter-pane')
    expect((panes[0].element as HTMLElement).style.flexGrow).toBe('1')
    expect((panes[1].element as HTMLElement).style.flexGrow).toBe('1')
  })

  it('resets adjacent panes to their default ratio when their handle is double-clicked', async () => {
    const splitterRef = ref<SplitterInstance | null>(null)

    const { wrapper } = render(
      defineComponent({
        setup() {
          return () =>
            h(
              CSplitter,
              {
                ref: splitterRef,
                resetOnDoubleClick: true,
              },
              {
                default: () =>
                  createPanes([
                    { defaultSize: 20, content: 'A' },
                    { defaultSize: 30, content: 'B' },
                    { defaultSize: 50, content: 'C' },
                  ]),
              }
            )
        },
      })
    )

    const instance = splitterRef.value
    if (instance?.setSizes) {
      instance.setSizes([10, 20, 70])
    }

    await wrapper.vm.$nextTick()

    const handles = wrapper.findAll('[role="separator"]')
    await handles[0].trigger('dblclick')

    const sizes = (instance as any)?.sizes
    expect(sizes).toEqual([12, 18, 70])
  })

  it('does not reset on double click when resetOnDoubleClick is false', async () => {
    const splitterRef = ref<SplitterInstance | null>(null)

    const { wrapper } = render(
      defineComponent({
        setup() {
          return () =>
            h(
              CSplitter,
              {
                ref: splitterRef,
                resetOnDoubleClick: false,
              },
              {
                default: () =>
                  createPanes([
                    { defaultSize: 20, content: 'A' },
                    { defaultSize: 30, content: 'B' },
                    { defaultSize: 50, content: 'C' },
                  ]),
              }
            )
        },
      })
    )

    const instance = splitterRef.value
    if (instance?.setSizes) {
      instance.setSizes([10, 20, 70])
    }

    await wrapper.vm.$nextTick()

    const handles = wrapper.findAll('[role="separator"]')
    await handles[0].trigger('dblclick')

    const sizes = (instance as any)?.sizes
    expect(sizes).toEqual([10, 20, 70])
  })
})
