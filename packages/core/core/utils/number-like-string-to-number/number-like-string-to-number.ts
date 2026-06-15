import { NumberLikeString } from '../../box'

export function numberLikeStringToNumber(
  value: NumberLikeString,
  fallback: number = 0
): number {
  if (typeof value === 'number') return value
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}
