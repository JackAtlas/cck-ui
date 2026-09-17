import { inject, InjectionKey, MaybeRefOrGetter, provide, Ref } from 'vue'
import { GetStylesApi } from '../../core'
import { ScrollAreaFactory } from './scroll-area.types'

export interface ScrollAreaContextValue {
  type: MaybeRefOrGetter<'auto' | 'always' | 'scroll' | 'hover' | 'never'>
  scrollHideDelay: MaybeRefOrGetter<number>
  scrollArea: Ref<HTMLDivElement | null>

  viewport: Ref<HTMLDivElement | null>
  onViewportChange: (viewport: HTMLDivElement | null) => void

  content: Ref<HTMLDivElement | null>
  onContentChange: (content: HTMLDivElement | null) => void

  scrollbarX: Ref<HTMLDivElement | null>
  onScrollbarXChange: (scrollbar: HTMLDivElement | null) => void
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange: (rendered: boolean) => void

  scrollbarY: Ref<HTMLDivElement | null>
  onScrollbarYChange: (scrollbar: HTMLDivElement | null) => void
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange: (rendered: boolean) => void

  onCornerWidthChange: (width: number) => void
  onCornerHeightChange: (height: number) => void

  getStyles: GetStylesApi<ScrollAreaFactory>
}

export const SCROLL_AREA_KEY: InjectionKey<ScrollAreaContextValue> = Symbol('ScrollAreaContext')

export function provideScrollAreaContext(value: ScrollAreaContextValue) {
  provide(SCROLL_AREA_KEY, value)
}

export function useScrollAreaContext() {
  const ctx = inject(SCROLL_AREA_KEY)
  if (!ctx) {
    throw new Error('[CScrollArea] Root component was not found in tree')
  }
  return ctx
}
