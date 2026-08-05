import type { SplitterPaneSize } from '@cck-ui/hooks'
import type { GetStylesApi } from '../../core'
import type { SplitterFactory } from './splitter.types'
import { ComputedRef, inject, InjectionKey, provide } from 'vue'

export interface SplitterContextValue {
  getStyles: GetStylesApi<SplitterFactory>
  sizes: ComputedRef<SplitterPaneSize[]>
  collapsed: ComputedRef<boolean[]>
  orientation: ComputedRef<'horizontal' | 'vertical'>
  getPaneStyle: (index: number) => Record<string, any>
}

const SPLITTER_CONTEXT_KEY: InjectionKey<SplitterContextValue> = Symbol('SplitterContext')

export function provideSplitterContext(value: SplitterContextValue) {
  provide(SPLITTER_CONTEXT_KEY, value)
}

export function useSplitterContext() {
  const ctx = inject(SPLITTER_CONTEXT_KEY)
  if (!ctx) {
    throw new Error('Splitter component was not found in the tree')
  }
  return ctx
}
