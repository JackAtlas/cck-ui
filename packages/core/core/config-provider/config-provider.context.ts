import { CColorScheme, CTheme } from '@cck-ui/core'
import { ConvertCSSVariablesInput } from './convert-css-variables'
import { inject } from 'vue'
import { CONFIG_KEY } from './config-provider.types'

export interface CStylesTransform {
  sx?: () => (sx: any) => string
  styles?: () => (styles: any, payload: any) => Record<string, string>
}

interface CContextValue {
  colorScheme: CColorScheme
  setColorScheme: (colorScheme: CColorScheme) => void
  clearColorScheme: () => void
  getRootElement: () => HTMLElement | undefined
  classNamesPrefix: string
  getStyleNonce?: () => string | undefined
  cssVariablesResolver?: (theme: CTheme) => ConvertCSSVariablesInput
  cssVariablesSelector: string
  withStaticClasses: boolean
  headless?: boolean
  stylesTransform?: CStylesTransform
  env?: 'default' | 'test'
}

export function useConfigContext() {
  const ctx = inject<CContextValue>(CONFIG_KEY)

  if (!ctx) {
    throw new Error('[@cck-ui/core] ConfigProvider was not found in tree')
  }

  return ctx
}

export function useCckCssVariablesResolver() {
  return useConfigContext().cssVariablesResolver
}

export function useCckClassNamesPrefix() {
  return useConfigContext().classNamesPrefix
}

export function useCckStyleNonce() {
  return useConfigContext().getStyleNonce
}

export function useCckWithStaticClasses() {
  return useConfigContext().withStaticClasses
}

export function useCckIsHeadless() {
  return useConfigContext().headless
}

export function useCckSxTransform() {
  return useConfigContext().stylesTransform?.sx
}

export function useCckStylesTransform() {
  return useConfigContext().stylesTransform?.styles
}

export function useCckEnv() {
  return useConfigContext().env || 'default'
}
