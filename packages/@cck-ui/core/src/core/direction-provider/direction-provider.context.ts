import { computed, ComputedRef, inject, InjectionKey, provide } from 'vue'
import { Direction } from './direction-provider.types'

export interface DirectionContextValue {
  dir: ComputedRef<Direction>
  toggleDirection: () => void
  setDirection: (dir: Direction) => void
}

const defaultContext: DirectionContextValue = {
  dir: computed(() => 'ltr'),
  toggleDirection: () => {},
  setDirection: () => {},
}

export const DIRECTION_KEY: InjectionKey<DirectionContextValue> = Symbol('DirectionContext')

export function provideDirectionContext(value: DirectionContextValue) {
  provide(DIRECTION_KEY, value)
}

export function useDirectionContext() {
  return inject(DIRECTION_KEY, defaultContext)
}
