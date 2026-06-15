import { NumberLikeString, StyleProp } from '../../box'
import { CBreakpoint } from '../../config-provider'
import { numberLikeStringToNumber } from '../../utils'

export function normalizeNumberLikeStringProp(
  prop: StyleProp<NumberLikeString | undefined>
): StyleProp<number> | undefined {
  if (prop === undefined || prop === null) return undefined

  if (typeof prop === 'number' || typeof prop === 'string')
    return numberLikeStringToNumber(prop)

  const normalized: Partial<Record<CBreakpoint | (string & {}), number>> = {}
  for (const [key, value] of Object.entries(prop)) {
    if (value !== undefined) {
      normalized[key] = numberLikeStringToNumber(value as NumberLikeString)
    }
  }
  return normalized
}
