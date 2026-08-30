import { onMounted, onUnmounted, Ref, ref } from 'vue'

export interface UseWindowScrollPosition {
  x: number
  y: number
}

export type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void

export type UseWindowScrollReturnValue = {
  x: Ref<number>
  y: Ref<number>
  scrollTo: UseWindowScrollTo
}

export function useWindowScroll(): UseWindowScrollReturnValue {
  const x = ref(0)
  const y = ref(0)

  const updatePosition = () => {
    if (typeof window !== 'undefined') {
      x.value = window.scrollX
      y.value = window.scrollY
    }
  }

  const scrollTo: UseWindowScrollTo = ({ x: left, y: top }) => {
    if (typeof window !== 'undefined') {
      const options: ScrollToOptions = { behavior: 'smooth' }
      if (typeof left === 'number') {
        options.left = left
      }
      if (typeof top === 'number') {
        options.top = top
      }
      window.scrollTo(options)
    }
  }

  onMounted(() => {
    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updatePosition)
    window.removeEventListener('resize', updatePosition)
  })

  return { x, y, scrollTo }
}
