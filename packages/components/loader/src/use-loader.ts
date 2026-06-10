import { ref } from 'vue'

export const useLoader = () => {
  const _ref = ref<HTMLElement | SVGElement>()

  return { _ref }
}
