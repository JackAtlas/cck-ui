import { isCckColorScheme } from './is-cck-color-scheme'
import type { CColorSchemeManager } from './types'

export interface LocalStorageColorSchemeManagerOptions {
  key?: string
}

export function localStorageColorSchemeManager({
  key = 'c-color-scheme-value',
}: LocalStorageColorSchemeManagerOptions = {}): CColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue
      }

      try {
        const storedColorScheme = window.localStorage.getItem(key)
        return isCckColorScheme(storedColorScheme) ? storedColorScheme : defaultValue
      } catch {
        return defaultValue
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value)
      } catch (error) {
        console.warn(
          '[@cck-ui/core] Local storage color scheme manager was unable to save color scheme.',
          error
        )
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isCckColorScheme(event.newValue) && onUpdate(event.newValue)
        }
      }

      window.addEventListener('storage', handleStorageEvent)
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent)
    },

    clear: () => {
      window.localStorage.removeItem(key)
    },
  }
}
