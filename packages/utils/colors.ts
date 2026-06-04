import { TinyColor } from '@ctrl/tinycolor'

const SATURATIONS = [8, 15, 30, 55, 78, 95, 95, 92, 88, 85]

const LIGHTNESSES = [95, 88, 75, 62, 50, 40, 32, 27, 22, 18]

const shadeCache = new Map<string, string[]>()

function getNormalizedKey(colorStr: string): string | null {
  const tc = new TinyColor(colorStr)
  if (!tc.isValid) return null
  return tc.toHexString()
}

function getFormat(colorStr: string): string {
  const tc = new TinyColor(colorStr)
  const fmt = tc.format
  return fmt === 'name' ? 'hex' : fmt
}

/**
 * Generates 10 shades (index 0~9, 0 lightest, 9 darkest) from a given color.
 * The output format matches the input format (hex / rgb / rgba / hsl / hsla).
 * Results are cached so repeated calls with the same color (even different formats) return instantly.
 * @param originalColor - Any valid CSS color string
 * @returns An array of 10 color strings representing the shades
 * @throws If the input color is invalid
 */
export function generateColorShades(originalColor: string): string[] {
  const normKey = getNormalizedKey(originalColor)
  if (!normKey) {
    throw new Error(`Invalid color: ${originalColor}`)
  }

  const targetFormat = getFormat(originalColor)
  const cacheKey = `${normKey}|${targetFormat}`

  if (shadeCache.has(cacheKey)) {
    return shadeCache.get(cacheKey)!
  }

  const base = new TinyColor(originalColor)
  if (!base.isValid) {
    throw new Error(`Invalid color: ${originalColor}`)
  }

  const { h } = base.toHsl()

  const shades: string[] = []

  for (let i = 0; i < 10; i++) {
    const color = new TinyColor({
      h,
      s: SATURATIONS[i] / 100,
      l: LIGHTNESSES[i] / 100
    })

    let output: string
    switch (targetFormat) {
      case 'hex':
        output = color.toHexString()
        break
      case 'rgb':
        output = color.toRgbString()
        break
      case 'hsl':
        output = color.toHslString()
        break
      default:
        output = color.toHexString()
    }
    shades.push(output)
  }

  shadeCache.set(cacheKey, shades)
  return shades
}

export function clearShadeCache(): void {
  shadeCache.clear()
}
