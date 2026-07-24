import { DOMWrapper, VueWrapper } from '@vue/test-utils'

export function getTarget(wrapper: VueWrapper, selector?: string): DOMWrapper<Element> {
  const finalSelector = selector || '*:not(style)'
  const target = wrapper.find(finalSelector)
  if (!target.exists()) {
    throw new Error(`Target element not found with selector: ${finalSelector}`)
  }
  return target
}
