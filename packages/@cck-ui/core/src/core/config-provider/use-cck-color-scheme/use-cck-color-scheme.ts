import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useConfigContext } from '../config-provider.context'
import { CColorScheme } from '../theme.types'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function watchSystemTheme(callback: (theme: 'light' | 'dark') => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const listener = (e: MediaQueryListEvent) => callback(e.matches ? 'dark' : 'light')
  mql.addEventListener('change', listener)
  return () => mql.removeEventListener('change', listener)
}

function disableTransitions(nonce?: string): () => void {
  if (typeof document === 'undefined') {
    return () => {}
  }

  const style = document.createElement('style')
  style.setAttribute('data-color-scheme-transition', 'inline')
  style.innerHTML = '*, *::before, *::after { transition: none !important; }'
  if (nonce) {
    style.setAttribute('nonce', nonce)
  }
  document.head.appendChild(style)
  return () => {
    document.querySelectorAll('[data-color-scheme-transition]').forEach((el) => el.remove())
  }
}

export function useCckColorScheme({ keepTransition }: { keepTransition?: boolean } = {}) {
  const ctx = useConfigContext()

  const colorScheme = ctx.colorScheme

  const systemTheme = ref<'light' | 'dark'>('light')

  const computedColorScheme = computed<'light' | 'dark'>(() => {
    const scheme = colorScheme.value
    return scheme === 'auto' ? systemTheme.value : scheme
  })

  let clearStyles: (() => void) | null = null
  let timeoutId: number | null = null

  function disableTransitionsTemporarily() {
    if (keepTransition) {
      return
    }
    clearStyles?.()
    const nonce = ctx.getStyleNonce?.()
    clearStyles = disableTransitions(nonce)
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      clearStyles?.()
      clearStyles = null
    }, 10)
  }

  const setColorScheme = (value: CColorScheme) => {
    ctx.setColorScheme(value)
    disableTransitionsTemporarily()
  }

  const clearColorScheme = () => {
    ctx.clearColorScheme()
    disableTransitionsTemporarily()
  }

  const toggleColorScheme = () => {
    const current = computedColorScheme.value
    setColorScheme(current === 'light' ? 'dark' : 'light')
  }

  onMounted(() => {
    systemTheme.value = getSystemTheme()
    const unwatch = watchSystemTheme((theme) => {
      systemTheme.value = theme
    })

    onUnmounted(() => {
      unwatch()
      if (timeoutId) {
        window.clearTimeout(timeoutId)
        clearStyles?.()
      }
    })
  })

  return {
    colorScheme,
    computedColorScheme,
    setColorScheme,
    clearColorScheme,
    toggleColorScheme,
  }
}
