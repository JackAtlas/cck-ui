import { inject, InjectionKey, provide, ref, Ref } from 'vue'

export interface TooltipGroupContextValue {
  withinGroup: true
  openDelay: Ref<number>
  closeDelay: Ref<number>
  activeId: Ref<string | null>
  registerActive: (id: string) => void
  unregisterActive: (id: string) => void
}

export const TOOLTIP_GROUP_KEY: InjectionKey<TooltipGroupContextValue> = Symbol('TooltipGroup')

export function provideTooltipGroupContext(value: TooltipGroupContextValue) {
  provide(TOOLTIP_GROUP_KEY, value)
}

export function useTooltipGroupContext() {
  return inject(TOOLTIP_GROUP_KEY, null)
}

export function createTooltipGroupContext(
  openDelay: number,
  closeDelay: number
): TooltipGroupContextValue {
  const activeIds = ref<Set<string>>(new Set())
  const activeId = ref<string | null>(null)

  return {
    withinGroup: true,
    openDelay: ref(openDelay),
    closeDelay: ref(closeDelay),
    activeId,
    registerActive: (id) => {
      activeIds.value.add(id)
      activeId.value = id
    },
    unregisterActive: (id) => {
      activeIds.value.delete(id)
      if (activeId.value === id) {
        const next = activeIds.value.values().next()
        activeId.value = next.done ? null : next.value
      }
    },
  }
}
