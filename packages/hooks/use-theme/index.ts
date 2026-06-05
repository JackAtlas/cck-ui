import { readonly, ref } from 'vue'

export type ColorScheme = 'light' | 'dark'

const getCurrentScheme = (): ColorScheme => {
  if (typeof document === 'undefined') return 'light'
  const scheme = document.documentElement.dataset.cColorScheme
  return scheme === 'dark' ? 'dark' : 'light'
}

const colorScheme = ref<ColorScheme>(getCurrentScheme())

if (typeof window !== 'undefined') {
  const observer = new MutationObserver(() => {
    const newScheme = getCurrentScheme()
    if (newScheme !== colorScheme.value) {
      colorScheme.value = newScheme
    }
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-c-color-scheme']
  })
}

export const useColorScheme = () => readonly(colorScheme)
