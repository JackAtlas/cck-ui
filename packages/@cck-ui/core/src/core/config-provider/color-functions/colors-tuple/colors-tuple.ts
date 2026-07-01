import { CColorsTuple } from '../../theme.types'

export function colorsTuple(input: string | string[]): CColorsTuple {
  if (Array.isArray(input)) {
    return input as unknown as CColorsTuple
  }

  return Array(10).fill(input) as unknown as CColorsTuple
}
