import { ElementProps, Factory } from '../../core'

export interface NumberFormatterProps extends /* @vue-ignore */ ElementProps<'div'> {
  /** Value to format */
  value?: number | string

  /**
   * If set, negative values are allowed
   * @default true
   */
  allowNegative?: boolean

  /**
   * Limits the number of digits that are displayed after the decimal point
   * @default Infinity
   */
  decimalScale?: number

  /** Character used as a decimal separator, `'.'` by default */
  decimalSeparator?: string

  /**
   * If set, zeros are added after `decimalSeparator` to match given `decimalScale`.
   * @default false
   */
  fixedDecimalScale?: boolean

  /** Prefix added before the value */
  prefix?: string

  /** Suffix added after the value */
  suffix?: string

  /** Defines the thousand grouping style */
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none'

  /** A character used to separate thousands
   * @default ','
   */
  thousandSeparator?: string | boolean
}

export type NumberFormatterFactory = Factory<{
  props: NumberFormatterProps
  ref: HTMLDivElement
}>
