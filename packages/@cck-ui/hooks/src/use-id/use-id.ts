import { useId as vueUseId, ref, onMounted } from 'vue'
import { randomId } from '../utils'

export function useId(staticId?: string) {
  if (staticId) {
    return ref(staticId)
  }

  const vueId = vueUseId()
  const id = ref(vueId)
  const initialized = ref(false)

  onMounted(() => {
    if (!initialized.value) {
      initialized.value = true
      id.value = randomId()
    }
  })

  return id
}
