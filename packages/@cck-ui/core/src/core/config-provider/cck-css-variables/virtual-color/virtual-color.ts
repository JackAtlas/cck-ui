import {} from '../../color-functions'
import { colorsTuple } from '../../color-functions/colors-tuple/colors-tuple'
import { CColor, CColorsTuple } from '../../theme.types'

interface VirtualColorInput {
  dark: CColor
  light: CColor
  name: string
}

type VirtualColor = CColorsTuple & {
  'c-virtual-color': true
  name: string
  dark: CColor
  light: CColor
}

export function virtualColor(input: VirtualColorInput): CColorsTuple {
  const result = colorsTuple(
    Array.from({ length: 10 }).map((_, i) => `var(--c-color-${input.name}-${i})`)
  )

  Object.defineProperty(result, 'c-virtual-color', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: true,
  })

  Object.defineProperty(result, 'dark', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.dark,
  })

  Object.defineProperty(result, 'light', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.light,
  })

  Object.defineProperty(result, 'name', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.name,
  })

  return result
}

export function isVirtualColor(value: unknown): value is VirtualColor {
  return !!value && typeof value === 'object' && 'c-virtual-color' in value
}
