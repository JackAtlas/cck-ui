import { h, nextTick } from 'vue'
import { AccordionProps, AccordionStylesNames } from './accordion.types'
import CAccordion, { CAccordionControl, CAccordionItem, CAccordionPanel } from '.'
import { describe, expect, it } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'

function getControls(wrapper: VueWrapper<any>) {
  return wrapper.findAll('button')
}

function getPanels(wrapper: VueWrapper<any>) {
  return wrapper.findAll('[role="region"]')
}

function isPanelOpen(panel: DOMWrapper<Element>): boolean {
  return (panel.element as HTMLElement).style.display !== 'none'
}

function expectPanelsOpen(wrapper: VueWrapper<any>, expected: number[]) {
  const panels = getPanels(wrapper)
  panels.forEach((panel, i) => {
    expect(isPanelOpen(panel)).toBe(expected.includes(i))
  })
}

const defaultProps = {
  transitionDuration: 0,
  defaultValue: 'item-1',
} satisfies AccordionProps

const defaultSlots = {
  default: () => [
    h(CAccordionItem, { value: 'item-1' }, () => [
      h(
        CAccordionControl,
        {},
        {
          default: () => 'Label 1',
          icon: () => '$$',
        }
      ),
      h(CAccordionPanel, {}, () => 'test-item-1'),
    ]),
    h(CAccordionItem, { value: 'item-2' }, () => [
      h(
        CAccordionControl,
        {},
        {
          default: () => 'Label 2',
          icon: () => '$$',
        }
      ),
      h(CAccordionPanel, {}, () => 'test-item-2'),
    ]),
    h(CAccordionItem, { value: 'item-3' }, () => [
      h(
        CAccordionControl,
        {},
        {
          default: () => 'Label 3',
          icon: () => '$$',
        }
      ),
      h(CAccordionPanel, {}, () => 'test-item-3'),
    ]),
  ],
}

function slotsWithDisabled(disabled: [boolean, boolean, boolean]) {
  return {
    default: () => [
      h(CAccordionItem, { value: 'item-1' }, () => [
        h(CAccordionControl, { disabled: disabled[0] }, () => 'Label 1'),
        h(CAccordionPanel, {}, () => 'test-item-1'),
      ]),
      h(CAccordionItem, { value: 'item-2' }, () => [
        h(CAccordionControl, { disabled: disabled[1] }, () => 'Label 2'),
        h(CAccordionPanel, {}, () => 'test-item-2'),
      ]),
      h(CAccordionItem, { value: 'item-3' }, () => [
        h(CAccordionControl, { disabled: disabled[2] }, () => 'Label 3'),
        h(CAccordionPanel, {}, () => 'test-item-3'),
      ]),
    ],
  }
}

describe('@cck-ui/core/accordion', () => {
  tests.axe([
    h(CAccordion, defaultProps, defaultSlots),
    h(CAccordion, { ...defaultProps, order: 3 }, defaultSlots),
  ])

  tests.itSupportsSystemProps<AccordionProps, AccordionStylesNames>({
    component: CAccordion,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    name: 'CAccordion',
    staticName: 'Accordion',
    stylesApiSelectors: ['root', 'chevron', 'content', 'control', 'icon', 'item', 'label'],
  })

  it('renders correct amount of items', () => {
    const { wrapper } = render(CAccordion, { props: defaultProps, slots: defaultSlots })

    expect(wrapper.findAll('.c-Accordion-item')).toHaveLength(3)
  })

  it('supports uncontrolled state (multiple: false, default)', async () => {
    const props = {
      ...defaultProps,
      defaultValue: 'item-2',
    } satisfies AccordionProps
    const { wrapper } = render(CAccordion, {
      props,
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [1])

    await getControls(wrapper)[0].trigger('click')
    await nextTick()
    expectPanelsOpen(wrapper, [0])
  })

  it('supports uncontrolled state (multiple: true)', async () => {
    const props = {
      ...defaultProps,
      multiple: true,
      defaultValue: ['item-2'],
    } satisfies AccordionProps<true>
    const { wrapper } = render<AccordionProps<true>>(CAccordion, {
      props,
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [1])

    await getControls(wrapper)[0].trigger('click')
    await nextTick()
    expectPanelsOpen(wrapper, [0, 1])
  })

  it('opens items initially based on defaultValue prop (multiple: false, default)', async () => {
    const props = {
      ...defaultProps,
      defaultValue: 'item-3',
    } satisfies AccordionProps
    const { wrapper } = render(CAccordion, {
      props,
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [2])
  })

  it('opens items initially based on defaultValue prop (multiple: true)', async () => {
    const props = {
      ...defaultProps,
      multiple: true,
      defaultValue: ['item-3', 'item-1'],
    } satisfies AccordionProps<true>
    const { wrapper } = render<AccordionProps<true>>(CAccordion, {
      props,
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [0, 2])
  })

  it('supports controlled state (multiple: false, default)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, value: 'item-2' },
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [1])

    await getControls(wrapper)[0].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['item-1'])
    expect(wrapper.emitted('update:value')?.[0]).toEqual(['item-1'])

    expectPanelsOpen(wrapper, [1])
  })

  it('supports controlled state (multiple: true)', async () => {
    const slots = {
      default: () => [
        h(CAccordionItem, { value: 'item-1' }, () => [
          h(CAccordionControl, {}, () => 'Label 1'),
          h(CAccordionPanel, {}, () => 'test-item-1'),
        ]),
        h(CAccordionItem, { value: 'item-2' }, () => [
          h(CAccordionControl, {}, () => 'Label 2'),
          h(CAccordionPanel, {}, () => 'test-item-2'),
        ]),
      ],
    }
    const { wrapper } = render(CAccordion, {
      props: { multiple: true, value: ['item-1'], transitionDuration: 0 },
      slots,
    })

    await getControls(wrapper)[1].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([['item-1', 'item-2']])

    await getControls(wrapper)[0].trigger('click')
    expect(wrapper.emitted('change')?.[1]).toEqual([[]])
  })

  it('supports navigating between items with up and down arrows (loop: true, default)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1' },
      slots: defaultSlots,
    })
    const buttons = getControls(wrapper)

    await buttons[0].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons[1].element)

    await buttons[2].trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(buttons[1].element)

    await buttons[2].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons[0].element)

    await buttons[0].trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(buttons[2].element)
  })

  it('supports navigating between items with up and down arrows (loop: false)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1', loop: false },
      slots: defaultSlots,
    })
    const buttons = getControls(wrapper)

    await buttons[0].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons[1].element)

    await buttons[2].trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(buttons[1].element)

    await buttons[2].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(buttons[2].element)

    await buttons[0].trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(buttons[0].element)
  })

  it('moves focus to the first enabled control on Home when the first control is disabled', async () => {
    const { wrapper } = render(CAccordion, {
      props: { defaultValue: 'item-2', transitionDuration: 0 },
      slots: slotsWithDisabled([true, false, false]),
    })
    const buttons = getControls(wrapper)
    buttons[2].element.focus()
    await buttons[2].trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(buttons[1].element)
  })

  it('moves focus to the last enabled control on End when the last control is disabled', async () => {
    const { wrapper } = render(CAccordion, {
      props: { defaultValue: 'item-2', transitionDuration: 0 },
      slots: slotsWithDisabled([false, false, true]),
    })
    const buttons = getControls(wrapper)
    buttons[0].element.focus()
    await buttons[0].trigger('keydown', { key: 'End' })
    expect(document.activeElement).toBe(buttons[1].element)
  })

  it('controls are focusable', () => {
    const { wrapper } = render(CAccordion, { props: defaultProps, slots: defaultSlots })
    const buttons = getControls(wrapper)
    expect(buttons).toHaveLength(3)

    buttons[0].element.focus()
    expect(document.activeElement).toBe(buttons[0].element)

    buttons[1].element.focus()
    expect(document.activeElement).toBe(buttons[1].element)

    buttons[2].element.focus()
    expect(document.activeElement).toBe(buttons[2].element)
  })

  it('does not toggle a disabled control and sets disabled attributes', async () => {
    const slots = {
      default: () => [
        h(CAccordionItem, { value: 'item-1' }, () => [
          h(CAccordionControl, { disabled: true }, () => 'Label 1'),
          h(CAccordionPanel, {}, () => 'test-item-1'),
        ]),
      ],
    }
    const { wrapper } = render(CAccordion, {
      props: { transitionDuration: 0 },
      slots,
    })

    const control = getControls(wrapper)[0]
    expect(control.element.hasAttribute('disabled')).toBe(true)
    expect(control.attributes('data-disabled')).toBeDefined()

    await control.trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('sets data-rotate on the chevron of the opened item', () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1' },
      slots: defaultSlots,
    })
    const chevrons = wrapper.findAll('.c-Accordion-chevron')
    expect(chevrons[0].attributes('data-rotate')).toBeDefined()
    expect(chevrons[1].attributes('data-rotate')).toBeUndefined()
  })

  it('does not set data-rotate when disableChevronRotation is set', () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1', disableChevronRotation: true },
      slots: defaultSlots,
    })
    wrapper.findAll('.c-Accordion-chevron').forEach((chevron) => {
      expect(chevron.attributes('data-rotate')).toBeUndefined()
    })
  })

  it('sets chevron position data attributes based on chevronPosition prop', () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, chevronPosition: 'left' },
      slots: defaultSlots,
    })
    expect(getControls(wrapper)[0].attributes('data-chevron-position')).toBe('left')
    expect(wrapper.find('.c-Accordion-chevron').attributes('data-position')).toBe('left')
  })

  it('renders a custom chevron via the chevron slot', () => {
    const { wrapper } = render(CAccordion, {
      props: defaultProps,
      slots: {
        ...defaultSlots,
        chevron: () => h('span', { 'data-testid': 'custom-chevron' }),
      },
    })
    expect(wrapper.findAll('[data-testid="custom-chevron"]')).toHaveLength(3)
  })

  it('wraps controls in heading tags based on the order prop', () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, order: 3 },
      slots: defaultSlots,
    })
    expect(wrapper.findAll('h3.c-Accordion-itemTitle')).toHaveLength(3)
  })

  it('does not wrap controls in heading tags when order is not set', () => {
    const { wrapper } = render(CAccordion, { props: defaultProps, slots: defaultSlots })
    expect(wrapper.find('.c-Accordion-itemTitle').exists()).toBe(false)
  })

  it('does not collapse the open item when disableCollapse is set (uncontrolled, multiple: false)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1', disableCollapse: true },
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [0])

    await getControls(wrapper)[0].trigger('click')
    expectPanelsOpen(wrapper, [0])
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('does not collapse the open item when disableCollapse is set (controlled, multiple: false)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, value: 'item-1', disableCollapse: true },
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [0])

    await getControls(wrapper)[0].trigger('click')
    expectPanelsOpen(wrapper, [0])
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('switches to a different item when disableCollapse is set (multiple: false)', async () => {
    const { wrapper } = render(CAccordion, {
      props: { ...defaultProps, defaultValue: 'item-1', disableCollapse: true },
      slots: defaultSlots,
    })

    await getControls(wrapper)[1].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual('item-2')
    expectPanelsOpen(wrapper, [1])
  })

  it('ignores disableCollapse in multiple mode', async () => {
    const { wrapper } = render(CAccordion, {
      props: {
        ...defaultProps,
        multiple: true,
        defaultValue: ['item-1'],
        disableCollapse: true,
      },
      slots: defaultSlots,
    })
    expectPanelsOpen(wrapper, [0])

    await getControls(wrapper)[0].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([])
    expectPanelsOpen(wrapper, [])
  })

  it('exposes internal components as static properties', () => {
    expect(CAccordion.Item).toBeDefined()
    expect(CAccordion.Control).toBeDefined()
    expect(CAccordion.Panel).toBeDefined()
    expect(CAccordion.Chevron).toBeDefined()
  })

  it('supports keepMountedMode="display-none" on Accordion level', () => {
    const slots = {
      default: () => [
        h(CAccordionItem, { value: 'item-1' }, () => [
          h(CAccordionControl, {}, () => 'Label 1'),
          h(CAccordionPanel, {}, () => 'test-item-1'),
        ]),
      ],
    }
    const { wrapper } = render(CAccordion, {
      props: { keepMounted: true, keepMountedMode: 'display-none', transitionDuration: 0 },
      slots,
    })
    const panel = getPanels(wrapper)[0]
    expect(panel.exists()).toBe(true)
    expect(isPanelOpen(panel)).toBe(false)
  })

  it('supports keepMountedMode="display-none" override on AccordionPanel level', () => {
    const slots = {
      default: () => [
        h(CAccordionItem, { value: 'item-1' }, () => [
          h(CAccordionControl, {}, () => 'Label 1'),
          h(CAccordionPanel, { keepMountedMode: 'display-none' }, () => 'test-item-1'),
        ]),
      ],
    }
    const { wrapper } = render(CAccordion, {
      props: { keepMounted: true, keepMountedMode: 'activity', transitionDuration: 0 },
      slots,
    })
    const panel = getPanels(wrapper)[0]
    expect(panel.exists()).toBe(true)
    expect(isPanelOpen(panel)).toBe(false)
  })
})
