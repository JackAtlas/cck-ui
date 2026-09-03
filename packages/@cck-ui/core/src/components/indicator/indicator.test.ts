import { describe, expect, it } from 'vitest'
import { IndicatorProps, IndicatorStylesNames } from './indicator.types'
import { render, tests } from '@cck-ui-tests/core'
import CIndicator from '.'

const defaultProps: IndicatorProps = { showZero: true }

describe('@cck-ui/core/indicator', () => {
  tests.itSupportsSystemProps<IndicatorProps, IndicatorStylesNames>({
    component: CIndicator,
    props: defaultProps,
    varsResolver: true,
    children: true,
    name: 'CIndicator',
    staticName: 'Indicator',
    stylesApiSelectors: ['root', 'indicator'],
  })

  it('renders given label', () => {
    const { wrapper } = render(CIndicator, {
      props: defaultProps,
      slots: { label: () => 'test-label' },
    })

    const root = wrapper.find('.c-Indicator-root')
    expect(root.text()).contains('test-label')
  })

  it('does not render indicator if component is disabled', () => {
    const { wrapper } = render(CIndicator, {
      props: { ...defaultProps, label: 'test-label', disabled: true },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.exists()).toBeFalsy()
  })

  it('applies processing data attribute', () => {
    const { wrapper } = render(CIndicator, {
      props: { ...defaultProps, label: 'test', processing: true },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.attributes('data-processing')).toBeDefined()
  })

  it('applies with-border data attribute', () => {
    const { wrapper } = render(CIndicator, {
      props: { ...defaultProps, label: 'test', withBorder: true },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.attributes('data-with-border')).toBeDefined()
  })

  it('applies inline data attribute', () => {
    const { wrapper } = render(CIndicator, {
      props: { ...defaultProps, label: 'test', inline: true },
    })

    const root = wrapper.find('.c-Indicator-root')
    expect(root.attributes('data-inline')).toBeDefined()
  })

  it('formats label with maxValue prop', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        ...defaultProps,
        label: 200,
        maxValue: 99,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.text()).contains('99+')
  })

  it('does not format label when below maxValue', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        ...defaultProps,
        label: 50,
        maxValue: 99,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.text()).contains('50')
  })

  it('does not format non-numeric labels with maxValue', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        ...defaultProps,
        label: 'test',
        maxValue: 99,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.text()).contains('test')
  })

  it('hides indicator when label is 0 and showZero is false', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        label: 0,
        showZero: false,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.exists()).toBeFalsy()
  })

  it('hides indicator when label is "0" string and showZero is false', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        label: '0',
        showZero: false,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.exists()).toBeFalsy()
  })

  it('shows indicator when label is 0 and showZero is true', () => {
    const { wrapper } = render(CIndicator, {
      props: {
        ...defaultProps,
        label: 0,
      },
    })

    const indicator = wrapper.find('.c-Indicator-indicator')
    expect(indicator.exists()).toBeTruthy()
  })
})
