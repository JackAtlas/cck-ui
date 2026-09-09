import { describe, expect, it } from 'vitest'
import { RollingNumberProps, RollingNumberStylesNames } from './rolling-number.types'
import { render, tests } from '@cck-ui-tests/core'
import CRollingNumber from '.'

const defaultProps: RollingNumberProps = {
  value: 1,
  prefix: '$',
  tabularNumbers: true,
}

describe('@cck-ui/core/rolling-number', () => {
  tests.itSupportsSystemProps<RollingNumberProps, RollingNumberStylesNames>({
    component: CRollingNumber,
    props: defaultProps,
    varsResolver: true,
    children: false,
    name: 'CRollingNumber',
    staticName: 'RollingNumber',
    stylesApiSelectors: ['root', 'char', 'copyValue', 'digit', 'digitColumn'],
  })

  it('renders digits for the given value', () => {
    const props = {
      value: 42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const digits = wrapper.findAll('.c-RollingNumber-digit')
    expect(digits).toHaveLength(2)
  })

  it('renders prefix', () => {
    const props = {
      prefix: '$ ',
      value: 5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains('$')
    expect(charTexts).contains(' ')
  })

  it('renders suffix', () => {
    const props = {
      suffix: '%',
      value: 5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains('%')
  })

  it('renders thousand separator', () => {
    const props = {
      thousandSeparator: true,
      value: 1000,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains(',')
  })

  it('renders custom thousand separator', () => {
    const props = {
      thousandSeparator: ' ',
      value: 1000,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains(' ')
  })

  it('renders decimal places with decimalScale', () => {
    const props = {
      decimalScale: 2,
      fixedDecimalScale: true,
      value: 1.5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const digits = wrapper.findAll('.c-RollingNumber-digit')
    expect(digits).toHaveLength(3)
  })

  it('renders custom decimal separator', () => {
    const props = {
      decimalScale: 1,
      decimalSeparator: ',',
      fixedDecimalScale: true,
      value: 1.5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains(',')
  })

  it('sets data-tabular-numbers attribute by prop', () => {
    const props = {
      tabularNumbers: true,
      value: 1,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('data-tabular-numbers')).toBeDefined()
  })

  it('does not set data-tabular-numbers when tabularNumbers is false', () => {
    const props = {
      tabularNumbers: false,
      value: 1,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('data-tabular-numbers')).toBeUndefined()
  })

  it('sets role="img" on root element by default', () => {
    const props = {
      value: 42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('role')).toBe('img')
  })

  it('sets role="status" on root element when withLiveRegion is true', () => {
    const props = {
      value: 42,
      withLiveRegion: true,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('role')).toBe('status')
  })

  it('sets aria-label with formatted value', () => {
    const props = {
      prefix: '$ ',
      value: 42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('aria-label')).toBe('$ 42')
  })

  it('supports animationDuration CSS variable', () => {
    const props = {
      animationDuration: 1000,
      value: 1,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--rn-duration')).toBe('1000ms')
  })

  it('supports timingFunction CSS variable', () => {
    const props = {
      timingFunction: 'linear',
      value: 1,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect((root.element as HTMLElement).style.getPropertyValue('--rn-timing-function')).toBe(
      'linear'
    )
  })

  it('renders digit columns with correct transform', () => {
    const props = {
      value: 35,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const columns = wrapper.findAll('.c-RollingNumber-digitColumn')
    expect((columns[0].element as HTMLElement).style.getPropertyValue('transform')).toBe(
      'translateY(-3em)'
    )
    expect((columns[1].element as HTMLElement).style.getPropertyValue('transform')).toBe(
      'translateY(-5em)'
    )
  })

  it('renders a 12-cell wraparound strip in each column', () => {
    const props = {
      value: 5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const column = wrapper.find('.c-RollingNumber-digitColumn')
    expect(column.element.children).toHaveLength(12)
    const cells = Array.from(column.element.children).map((c) => c.textContent)
    expect(cells).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1'])
  })

  it('uses the wraparound cell when a digit rolls forward through 9 -> 0', async () => {
    const props = {
      value: 9,
    } satisfies Partial<RollingNumberProps>
    const { wrapper, rerender } = render(CRollingNumber, { props })
    await rerender({ props: { value: 9 } })
    await rerender({ props: { value: 10 } })
    const columns = wrapper.findAll('.c-RollingNumber-digitColumn')
    const onesColumn = columns[columns.length - 1].element as HTMLElement
    expect(onesColumn.style.getPropertyValue('--rn-roll-from')).toBe('translateY(-9em)')
    expect(onesColumn.style.getPropertyValue('--rn-roll-to')).toBe('translateY(-10em)')
    expect(onesColumn.style.transform).toBe('translateY(0em)')
  })

  it('does not use the wraparound cell on a normal forward step', async () => {
    const props = {
      value: 3,
    } satisfies Partial<RollingNumberProps>
    const { wrapper, rerender } = render(CRollingNumber, { props })
    await rerender({ props: { value: 3 } })
    await rerender({ props: { value: 5 } })
    const onesColumn = wrapper.find('.c-RollingNumber-digitColumn').element as HTMLElement
    expect(onesColumn.style.getPropertyValue('--rn-roll-from')).toBe('translateY(-3em)')
    expect(onesColumn.style.getPropertyValue('--rn-roll-to')).toBe('translateY(-5em)')
    expect(onesColumn.style.transform).toBe('translateY(-5em)')
  })

  it('does not wrap when value direction is down', async () => {
    const props = {
      value: 10,
    } satisfies Partial<RollingNumberProps>
    const { wrapper, rerender } = render(CRollingNumber, { props })
    await rerender({ props: { value: 10 } })
    await rerender({ props: { value: 9 } })
    const columns = wrapper.findAll('.c-RollingNumber-digitColumn')
    const onesColumn = columns[columns.length - 1].element as HTMLElement
    expect(onesColumn.style.getPropertyValue('--rn-roll-to')).toBe('translateY(-9em)')
    expect(onesColumn.style.transform).toBe('translateY(-9em)')
  })

  it('handles negative values', () => {
    const props = {
      value: -42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const chars = wrapper.findAll('.c-RollingNumber-char')
    const charTexts = Array.from(chars).map((el) => el.element.textContent)
    expect(charTexts).contains('-')
  })

  it('right-aligns integer digits for stable transitions', () => {
    const props = {
      value: 99,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const digitsBefore = wrapper.findAll('.c-RollingNumber-digit')
    expect(digitsBefore).toHaveLength(2)
    expect(Array.from(digitsBefore).every((d) => !d.attributes('data-empty'))).toBeTruthy()
  })

  it('marks leading digit as empty on the first render after shrinking (1000 → 999)', async () => {
    const props = {
      value: 999,
    } satisfies Partial<RollingNumberProps>
    const { wrapper, rerender } = render(CRollingNumber, { props })

    await rerender({ props: { value: 1000 } })
    await rerender({ props: { value: 999 } })

    const digits = wrapper.findAll('.c-RollingNumber-digit')
    expect(digits).toHaveLength(4)
    expect(digits[0].attributes('data-empty')).toBeDefined()
  })

  it('renders the formatted value in a single selectable node for copying', () => {
    const props = {
      prefix: '$ ',
      suffix: ' USD',
      thousandSeparator: true,
      value: 1234.56,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const copyValue = wrapper.find('.c-RollingNumber-copyValue')
    expect(copyValue.text()).toBe('$ 1,234.56 USD')
  })

  it('keeps the copy value in sync with the current value', async () => {
    const props = {
      thousandSeparator: true,
      value: 1000,
    } satisfies Partial<RollingNumberProps>
    const { wrapper, rerender } = render(CRollingNumber, { props })

    await rerender({ props: { value: 999 } })
    const copyValue = wrapper.find('.c-RollingNumber-copyValue')
    expect(copyValue.text()).toBe('999')
  })

  it('renders a copy value that matches the accessible label exactly', () => {
    const props = {
      decimalScale: 2,
      fixedDecimalScale: true,
      prefix: '  $  ',
      suffix: '  USD  ',
      thousandSeparator: '  ',
      value: 1234.5,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    const copyValue = wrapper.find('.c-RollingNumber-copyValue')
    expect(copyValue.element.textContent).toBe(root.attributes('aria-label'))
  })

  it('hides the copy value from assistive technology', () => {
    const props = {
      value: 42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const copyValue = wrapper.find('.c-RollingNumber-copyValue')
    expect(copyValue.attributes('aria-hidden')).toBeDefined()
  })

  it('hides animated digits and chars from assistive technology', () => {
    const props = {
      value: 42,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const animated = wrapper.findAll('.c-RollingNumber-digit, .c-RollingNumber-char')
    expect(animated.length).toBeGreaterThan(0)
    animated.forEach((el) => expect(el.attributes('aria-hidden')).toBeDefined())
  })

  it('includes aira-label with thousand separators', () => {
    const props = {
      prefix: '$ ',
      suffix: ' USD',
      thousandSeparator: '',
      value: 1000000,
    } satisfies Partial<RollingNumberProps>
    const { wrapper } = render(CRollingNumber, { props })

    const root = wrapper.find('.c-RollingNumber-root')
    expect(root.attributes('aria-label')).toBe('$ 1,000,000 USD')
  })
})
