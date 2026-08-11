import { inject, InjectionKey, provide } from 'vue'
import { GetStylesApi } from '../../core'
import { EmptyStateFactory } from './empty-state.types'

interface EmptyStateContextValue {
  getStyles: GetStylesApi<EmptyStateFactory>
  withIndicatorBackground: boolean | undefined
}

const EMPTYSTATE_CONTEXT_KEY: InjectionKey<EmptyStateContextValue> = Symbol('EmptyStateContext')

export function provideEmptyStateContext(value: EmptyStateContextValue) {
  provide(EMPTYSTATE_CONTEXT_KEY, value)
}

export function useEmptyStateContext() {
  const ctx = inject(EMPTYSTATE_CONTEXT_KEY)
  if (!ctx) {
    throw new Error('EmptyState component was not found in the tree')
  }
  return ctx
}
