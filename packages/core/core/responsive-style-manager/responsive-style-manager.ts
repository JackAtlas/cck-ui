export interface StyleManagerEntry {
  refCount: number
  styleEl: HTMLStyleElement
  cssText: string
}

function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = Math.trunc(hash)
  }
  return `rsp_${Math.abs(hash)}`
}

class ResponsiveStyleManager {
  private styleMap: Map<string, StyleManagerEntry> = new Map()

  public register(cssText: string, key?: string): string {
    const finalKey = key || hashString(cssText)
    const existing = this.styleMap.get(finalKey)

    if (existing) {
      existing.refCount++
      return finalKey
    }

    if (typeof document !== 'undefined') {
      const styleEl = document.createElement('style')
      styleEl.textContent = cssText
      document.head.appendChild(styleEl)

      this.styleMap.set(finalKey, {
        refCount: 1,
        styleEl,
        cssText
      })
    } else {
      this.styleMap.set(finalKey, {
        refCount: 1,
        styleEl: null as any,
        cssText
      })
    }

    return finalKey
  }

  public unregister(styleKey: string): void {
    const entry = this.styleMap.get(styleKey)
    if (!entry) return

    entry.refCount--
    if (entry.refCount === 0) {
      if (typeof document !== 'undefined' && entry.styleEl.parentNode) {
        entry.styleEl.parentNode.removeChild(entry.styleEl)
      }
      this.styleMap.delete(styleKey)
    }
  }
}

export const responsiveStyleManager = new ResponsiveStyleManager()
