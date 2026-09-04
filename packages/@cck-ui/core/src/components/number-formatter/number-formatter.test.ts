import { render, tests } from '@cck-ui-tests/core'
import { describe, expect, it } from 'vitest'
import CNumberFormatter from '.'

describe('@cck-ui/core/number-formatter', () => {
  tests.itHasExtend({ component: CNumberFormatter })

  it('renders null when value is undefined or null', () => {
    const { wrapper: wrapperUndefined } = render(CNumberFormatter, {
      props: { value: undefined },
    })
    expect(wrapperUndefined.find('span').exists()).toBeFalsy()
    expect(wrapperUndefined.text()).toBe('')

    const { wrapper: wrapperNull } = render(CNumberFormatter, {
      props: { value: null as any },
    })
    expect(wrapperNull.find('span').exists()).toBeFalsy()
    expect(wrapperNull.text()).toBe('')
  })

  it('renders non-numeric values as-is', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { value: 'abc' },
    })

    expect(wrapper.text()).toBe('abc')
  })

  it('formats basic numbers', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 1234567.89 },
    })

    expect(wrapper.text()).toBe('1,234,567.89')
  })

  it('respects thousandSeparator as boolean false', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: false, value: 1234567 },
    })

    expect(wrapper.text()).toBe('1234567')
  })

  it('uses string thousandSeparator', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: '.', value: 1234567 },
    })

    expect(wrapper.text()).toBe('1.234.567')
  })

  it('handles empty string thousandSeparator by falling back to comma', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: '', value: 1234567 },
    })

    expect(wrapper.text()).toBe('1,234,567')
  })

  it('applies decimalScale', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 1234.567, decimalScale: 2 },
    })

    expect(wrapper.text()).toBe('1,234.57')
  })

  it('applies fixedDecimalScale', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 1234.5, decimalScale: 3, fixedDecimalScale: true },
    })

    expect(wrapper.text()).toBe('1,234.500')
  })

  it('adds prefix and suffix', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 1234, prefix: '$ ', suffix: ' USD' },
    })

    expect(wrapper.text()).toBe('$ 1,234 USD')
  })

  it('handles allowNegative false', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: -123, allowNegative: false },
    })

    expect(wrapper.text()).toBe('123')
  })

  it('handles allowNegative true', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: -123, allowNegative: true },
    })

    expect(wrapper.text()).toBe('-123')
  })

  it('supports thousandsGroupStyle "wan"', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 123456789, thousandsGroupStyle: 'wan' },
    })

    expect(wrapper.text()).toBe('1,2345,6789')
  })

  it('supports thousandsGroupStyle "lakh"', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 123456789, thousandsGroupStyle: 'lakh' },
    })

    expect(wrapper.text()).toBe('1,23,45,67,89')
  })

  it('supports thousandsGroupStyle "none"', () => {
    const { wrapper } = render(CNumberFormatter, {
      props: { thousandSeparator: true, value: 1234567, thousandsGroupStyle: 'none' },
    })

    expect(wrapper.text()).toBe('1234567')
  })
})
