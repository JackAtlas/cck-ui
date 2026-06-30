import { useId } from 'vue'

export function useRandomClassName() {
  const id = useId()
  return `__c__-${id}`
}
