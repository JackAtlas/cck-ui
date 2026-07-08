<template>
  <template v-if="shouldRenderSlot">
    <slot :styles="computedStyles" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCckEnv } from '../../core'
import { TransitionProps } from './transition.types'
import { useTransition } from './use-transition'
import { getTransitionStyles } from './get-transition-styles/get-transition-styles'

defineOptions({
  name: 'CTransition',
})

const props = withDefaults(defineProps<TransitionProps>(), {
  keepMountedMode: 'activity',
  transition: 'fade',
  duration: 250,
  timingFunction: 'ease',
})

const env = useCckEnv()

const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
  mounted: props.mounted,
  exitDuration: props.exitDuration ?? props.duration,
  duration: props.duration,
  timingFunction: props.timingFunction,
  onEnter: props.onEnter,
  onEntered: props.onEntered,
  onExit: props.onExit,
  onExited: props.onExited,
  enterDelay: props.enterDelay,
  exitDelay: props.exitDelay,
})

const shouldRenderSlot = computed(() => {
  if (props.keepMounted) {
    return true
  }
  const status = transitionStatus.value
  return status !== 'exited' && status !== 'pre-exiting'
})

const computedStyles = computed(() => {
  if (env === 'test') {
    return props.mounted ? {} : props.keepMounted ? { display: 'none' } : undefined
  }

  const dur = transitionDuration.value
  const status = transitionStatus.value

  if (dur === 0) {
    if (props.keepMounted) {
      return props.mounted ? {} : { display: 'none' }
    }
    return props.mounted ? {} : undefined
  }

  const isExited = status === 'exited'

  if (props.keepMounted) {
    if (isExited) {
      return { display: 'none' }
    }

    return getTransitionStyles({
      transition: props.transition,
      duration: dur,
      state: status,
      timingFunction: transitionTimingFunction,
    })
  }

  return isExited
    ? undefined
    : getTransitionStyles({
        transition: props.transition,
        duration: dur,
        state: status,
        timingFunction: transitionTimingFunction,
      })
})

const showSlot = computed(() => {
  if (props.keepMounted) {
    return true
  }
  const status = transitionStatus.value
  return status !== 'exited' && status !== 'pre-exiting'
})
</script>
