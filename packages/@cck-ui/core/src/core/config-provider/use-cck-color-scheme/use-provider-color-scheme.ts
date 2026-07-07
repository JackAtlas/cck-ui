import { computed, type ComputedRef, onMounted, onUnmounted, ref } from 'vue'
import { useIsomorphicEffect } from '@cck-ui/hooks'
import type { CColorSchemeManager } from '../color-scheme-managers'
import type { CColorScheme } from '../theme.types'

function setColorSchemeAttribute(
  colorScheme: CColorScheme,
  getRootElement: () => HTMLElement | undefined
) {
  const hasDarkColorScheme =
    typeof window !== 'undefined' &&
    'matchMedia' in window &&
    window.matchMedia('(prefers-color-scheme: dark)')?.matches

  const computedColorScheme =
    colorScheme !== 'auto' ? colorScheme : hasDarkColorScheme ? 'dark' : 'light'
  getRootElement()?.setAttribute('data-c-color-scheme', computedColorScheme)
}

interface UseProviderColorSchemeOptions {
  manager: CColorSchemeManager
  defaultColorScheme: CColorScheme
  forceColorScheme: 'light' | 'dark' | undefined
  getRootElement: () => HTMLElement | undefined
}

export function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
  forceColorScheme,
}: UseProviderColorSchemeOptions) {
  const value = ref<CColorScheme>(manager.get(defaultColorScheme))
  const colorScheme = computed(() => forceColorScheme || value.value) as ComputedRef<CColorScheme>

  const applyColorScheme = (scheme: CColorScheme) => {
    setColorSchemeAttribute(scheme, getRootElement)
  }

  const setColorScheme = (scheme: CColorScheme) => {
    if (!forceColorScheme) {
      applyColorScheme(scheme)
      value.value = scheme
      manager.set(scheme)
    }
  }

  const clearColorScheme = () => {
    value.value = defaultColorScheme
    applyColorScheme(defaultColorScheme)
    manager.clear()
  }

  let unsubscribeManager: (() => void) | null = null
  let mediaQuery: MediaQueryList | null = null

  const handleMediaChange = (event: MediaQueryListEvent) => {
    if (value.value === 'auto') {
      applyColorScheme(event.matches ? 'dark' : 'light')
    }
  }

  onMounted(() => {
    manager.subscribe((scheme) => {
      if (!forceColorScheme) {
        value.value = scheme
      }
    })
    unsubscribeManager = manager.unsubscribe.bind(manager)

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleMediaChange)
    }
  })

  useIsomorphicEffect(() => {
    applyColorScheme(colorScheme.value)
  }, [colorScheme])

  onUnmounted(() => {
    if (unsubscribeManager) {
      unsubscribeManager()
    }
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  })

  return { colorScheme, setColorScheme, clearColorScheme }
}
