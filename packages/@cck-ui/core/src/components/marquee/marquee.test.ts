import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import { MarqueeProps, MarqueeStylesNames } from './marquee.types'
import CMarquee from '.'

const defaultSlots = {
  default: () => 'Test content',
}

describe('@cck-ui/core/marquee', () => {
  tests.itSupportsSystemProps<MarqueeProps, MarqueeStylesNames>({
    component: CMarquee,
    props: {},
    slots: defaultSlots,
    varsResolver: true,
    children: true,
    name: 'CMarquee',
    staticName: 'Marquee',
    stylesApiSelectors: ['root', 'content', 'group'],
  })

  it('renders children in all group elements', () => {
    const props = {
      repeat: 4,
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render(CMarquee, { props, slots: defaultSlots })

    const groups = wrapper.findAll('.c-Marquee-group')
    expect(groups).toHaveLength(4)
    groups.forEach((group) => {
      expect(group.element.textContent).toBe('Test content')
    })
  })

  it('sets data-orientation attribute based on orientation prop', async () => {
    const props = {
      orientation: 'horizontal',
    } satisfies Partial<MarqueeProps>
    const { wrapper, rerender } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect(root.attributes('data-orientation')).toBe('horizontal')

    await rerender({ props: { orientation: 'vertical' } })
    expect(root.attributes('data-orientation')).toBe('vertical')
  })

  it('sets data-reverse attribute when reverse prop is true', async () => {
    const props = {
      reverse: false,
    } satisfies Partial<MarqueeProps>
    const { wrapper, rerender } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect(root.attributes('data-reverse')).toBeUndefined()

    await rerender({ props: { reverse: true } })
    expect(root.attributes('data-reverse')).toBeDefined()
  })

  it('sets data-pause-on-hover attribute when pauseOnHover prop is true', async () => {
    const props = {
      pauseOnHover: false,
    } satisfies Partial<MarqueeProps>
    const { wrapper, rerender } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect(root.attributes('data-pause-on-hover')).toBeUndefined()

    await rerender({ props: { pauseOnHover: true } })
    expect(root.attributes('data-pause-on-hover')).toBeDefined()
  })

  it('renders correct number of groups based on repeat prop', async () => {
    const props = {
      repeat: 4,
    } satisfies Partial<MarqueeProps>
    const { wrapper, rerender } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    let groups = wrapper.findAll('.c-Marquee-group')
    expect(groups).toHaveLength(4)

    await rerender({ props: { repeat: 2 } })
    groups = wrapper.findAll('.c-Marquee-group')
    expect(groups).toHaveLength(2)
  })

  it('supports duration prop', () => {
    const props = {
      duration: 10000,
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--marquee-duration')).toBe(
      '10000ms'
    )
  })

  it('supports gap prop', () => {
    const props = {
      gap: 'xl',
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--marquee-gap')).toBe(
      'var(--c-spacing-xl)'
    )
  })

  it('sets data-fade-edges attribute when pauseOnHover prop is true', () => {
    const { wrapper } = render<MarqueeProps>(CMarquee, { props: {}, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect(root.attributes('data-fade-edges')).toBeDefined()
  })

  it('does not set data-fade-edges attribute when pauseOnHover prop is false', () => {
    const props = {
      fadeEdges: false,
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect(root.attributes('data-fade-edges')).toBeUndefined()
  })

  it('supports fadeEdgeColor prop', () => {
    const props = {
      fadeEdgeColor: 'red',
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--marquee-fade-color')).toBe('red')
  })

  it('supports fadeEdgeSize prop', () => {
    const props = {
      fadeEdgeSize: '10%',
    } satisfies Partial<MarqueeProps>
    const { wrapper } = render<MarqueeProps>(CMarquee, { props, slots: defaultSlots })

    const root = wrapper.find('.c-Marquee-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--marquee-fade-size')).toBe('10%')
  })
})
