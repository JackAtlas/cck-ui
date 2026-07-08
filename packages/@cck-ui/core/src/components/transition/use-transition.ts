import { usePreferredReducedMotion } from '@vueuse/core'
import { useCckTheme } from '../../core'
import { nextTick, onUnmounted, ref, watch } from 'vue'

export type TransitionStatus =
  | 'entered'
  | 'exited'
  | 'entering'
  | 'exiting'
  | 'pre-entering'
  | 'pre-exiting'

interface UseTransitionOptions {
  duration: number
  exitDuration: number
  timingFunction: string
  mounted: boolean
  onEnter?: () => void
  onExit?: () => void
  onEntered?: () => void
  onExited?: () => void
  enterDelay?: number
  exitDelay?: number
}

export function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onEntered,
  onExit,
  onExited,
  enterDelay,
  exitDelay,
}: UseTransitionOptions) {
  const theme = useCckTheme().value
  const shouldReduceMotion = usePreferredReducedMotion()
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false

  const transitionDuration = ref(reduceMotion ? 0 : duration)
  const transitionStatus = ref<TransitionStatus>(mounted ? 'entered' : 'exited')

  let transitionTimeout: number | null = null
  let delayTimeout: number | null = null
  let rafId: number | null = null

  const clearAllTimeouts = () => {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout)
      transitionTimeout = null
    }
    if (delayTimeout) {
      clearTimeout(delayTimeout)
      delayTimeout = null
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  const handleStateChange = (shouldMount: boolean) => {
    clearAllTimeouts()
    const preHandler = shouldMount ? onEnter : onExit
    const handler = shouldMount ? onEntered : onExited
    const newDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration
    transitionDuration.value = newDuration

    if (newDuration === 0) {
      preHandler?.()
      handler?.()
      transitionStatus.value = shouldMount ? 'entered' : 'exited'
    } else {
      rafId = requestAnimationFrame(() => {
        nextTick(() => {
          transitionStatus.value = shouldMount ? 'pre-entering' : 'pre-exiting'
          rafId = requestAnimationFrame(() => {
            preHandler?.()
            transitionStatus.value = shouldMount ? 'entering' : 'exiting'
            transitionTimeout = window.setTimeout(() => {
              handler?.()
              transitionStatus.value = shouldMount ? 'entered' : 'exited'
            }, newDuration)
          })
        })
      })
    }
  }

  const handleTransitionWithDelay = (shouldMount: boolean) => {
    clearAllTimeouts()
    const delay = shouldMount ? enterDelay : exitDelay
    if (delay === null) {
      handleStateChange(shouldMount)
      return
    }
    delayTimeout = window.setTimeout(() => {
      handleStateChange(shouldMount)
    }, delay)
  }

  watch(
    () => mounted,
    (newVal) => {
      handleTransitionWithDelay(newVal)
    },
    { immediate: false }
  )

  onUnmounted(() => {
    clearAllTimeouts()
  })

  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || 'ease',
  }
}
