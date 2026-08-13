import { describe, it, expect } from 'vitest'
import { render, tests } from '@cck-ui-tests/core'
import CSemiCircleProgress from '.'
import {
  SemiCircleProgressProps,
  SemiCircleProgressStylesNames,
} from './semi-circle-progress.types'

const defaultProps: SemiCircleProgressProps = {
  size: 200,
  thickness: 12,
  value: 40,
}

const defaultSlots = {
  label: () => 'Test label',
}

describe('@cck-ui/core/semi-circle-progress', () => {
  tests.itSupportsSystemProps<SemiCircleProgressProps, SemiCircleProgressStylesNames>({
    component: CSemiCircleProgress,
    props: defaultProps,
    slots: defaultSlots,
    varsResolver: true,
    name: 'CSemiCircleProgress',
    staticName: 'SemiCircleProgress',
    stylesApiSelectors: ['root', 'svg', 'emptySegment', 'filledSegment', 'label'],
    size: false,
  })

  it('renders given label', () => {
    const { wrapper } = render(CSemiCircleProgress, {
      props: defaultProps,
      slots: { label: () => 'test-label' },
    })
    expect(wrapper.text()).toContain('test-label')
  })

  it('assigns labelPosition prop to label data-position attribute', () => {
    const { wrapper } = render(CSemiCircleProgress, {
      props: { ...defaultProps, labelPosition: 'center' },
      slots: { label: () => 'test-label' },
    })
    const label = wrapper.find('.c-SemiCircleProgress-label')
    expect(label.attributes('data-position')).toBe('center')
  })

  it('clamps value between 0 and 100', async () => {
    const { wrapper, rerender } = render(CSemiCircleProgress, {
      props: { ...defaultProps, value: -10 },
      slots: { label: () => 'test' },
    })

    let filledSegment = wrapper.find('.c-SemiCircleProgress-filledSegment')
    console.log(filledSegment.html())
    const styleAttr = filledSegment.attributes('style')
    expect(styleAttr).toBeDefined()
    expect(styleAttr).toContain('stroke-dashoffset: 0')

    await rerender({ value: 150 })
    filledSegment = wrapper.find('.c-SemiCircleProgress-filledSegment')
    const circumference = Math.PI * ((200 - 2 * 12) / 2)
    expect(filledSegment.attributes('style')).toContain(String(circumference))
  })

  it('hides the filled segment when value is 0 to avoid a sliver', async () => {
    const { wrapper, rerender } = render(CSemiCircleProgress, {
      props: { ...defaultProps, value: 0 },
      slots: { label: () => 'test' },
    })

    let filledSegment = wrapper.find('.c-SemiCircleProgress-filledSegment')
    expect(filledSegment.attributes('style')).toContain('stroke-opacity: 0')

    await rerender({ value: 40 })
    filledSegment = wrapper.find('.c-SemiCircleProgress-filledSegment')
    expect(filledSegment.attributes('style')).not.toContain('stroke-opacity: 0')
  })

  it('assigns orientation to label data-orientation attribute', () => {
    const { wrapper } = render(CSemiCircleProgress, {
      props: { ...defaultProps, orientation: 'down' },
      slots: { label: () => 'test-label' },
    })
    const label = wrapper.find('.c-SemiCircleProgress-label')
    expect(label.attributes('data-orientation')).toBe('down')
  })

  it('sets svg dimensions based on size prop', () => {
    const { wrapper } = render(CSemiCircleProgress, {
      props: { ...defaultProps, size: 240 },
      slots: { label: () => 'test' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('240')
    expect(svg.attributes('height')).toBe('120')
    expect(svg.attributes('viewBox')).toBe('0 0 240 120')
  })
})
