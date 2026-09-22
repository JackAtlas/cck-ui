import { inject, InjectionKey, MaybeRefOrGetter, provide, VNode } from 'vue'
import { GetStylesApi } from '../../core'
import {
  AccordionChevronPosition,
  AccordionFactory,
  AccordionHeadingOrder,
} from './accordion.types'

export interface AccordionContextValue {
  loop: MaybeRefOrGetter<boolean | undefined>
  transitionDuration: MaybeRefOrGetter<number | undefined>
  disableChevronRotation: MaybeRefOrGetter<boolean | undefined>
  chevron: VNode | VNode[]
  chevronPosition: MaybeRefOrGetter<AccordionChevronPosition | undefined>
  order: MaybeRefOrGetter<AccordionHeadingOrder | undefined>
  onChange: (value: string) => void
  isItemActive: (value: string) => boolean
  getControlId: (value: string) => string
  getRegionId: (value: string) => string
  getStyles: GetStylesApi<AccordionFactory>
  variant: MaybeRefOrGetter<string | undefined>
  unstyled: MaybeRefOrGetter<boolean | undefined>
  keepMounted: MaybeRefOrGetter<boolean | undefined>
  keepMountedMode: MaybeRefOrGetter<'activity' | 'display-none' | undefined>
}

export const ACCORDION_KEY: InjectionKey<AccordionContextValue> = Symbol('AccordionContext')

export function provideAccordionContext(value: AccordionContextValue) {
  provide(ACCORDION_KEY, value)
}

export function useAccordionContext() {
  const ctx = inject(ACCORDION_KEY)
  if (!ctx) {
    throw new Error('[Accordion] Root component was not found in tree')
  }
  return ctx
}

export interface AccordionItemContextValue {
  value: MaybeRefOrGetter<string>
}

export const ACCORDION_ITEM_KEY: InjectionKey<AccordionItemContextValue> =
  Symbol('AccordionItemContext')

export function provideAccordionItemContext(value: AccordionItemContextValue) {
  provide(ACCORDION_ITEM_KEY, value)
}

export function useAccordionItemContext() {
  const ctx = inject(ACCORDION_ITEM_KEY)
  if (!ctx) {
    throw new Error('[AccordionItem] component was not found in the tree')
  }
  return ctx
}
