import { inject, InjectionKey, provide, Ref } from 'vue'
import { Sizes } from '../scroll-area.types'

export interface ScrollbarContextValue {
  scrollbar: Ref<HTMLDivElement | null>
  hasThumb: Ref<boolean>
  sizes: Ref<Sizes>
  onSizesChange: (sizes: Sizes) => void
  onThumbChange: (thumb: HTMLDivElement | null) => void
  onThumbPositionChange: () => void
  onDragScroll: (pointerPos: number) => void
  onWheelScroll: (scrollPos: number) => void
}

export const SCROLLBAR_KEY: InjectionKey<ScrollbarContextValue> = Symbol('ScrollbarContext')

export function provideScrollbarContext(value: ScrollbarContextValue) {
  provide(SCROLLBAR_KEY, value)
}

export function useScrollbarContext() {
  const ctx = inject(SCROLLBAR_KEY)
  if (!ctx) {
    throw new Error('[CScrollArea] Scrollbar context was not found')
  }
  return ctx
}
