export interface DigitColumnProps {
  digit: string
  previousDigit: string | null
  empty?: boolean
  valueDirection: 'up' | 'down'
}
