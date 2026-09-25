<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useComponentProps } from '../config-provider'
import { Direction, DirectionProviderProps } from './direction-provider.types'
import { provideDirectionContext } from './direction-provider.context'

defineOptions({
  name: 'DirectionProvider',
})

const rawProps = defineProps<DirectionProviderProps>()

const defaultProps = {
  initialDirection: 'ltr',
  detectDirection: true,
} satisfies Partial<DirectionProviderProps>

const props = useComponentProps<DirectionProviderProps>({
  component: 'CDirectionProvider',
  defaultProps,
  props: rawProps,
  booleanProps: ['detectDirection'],
})

const _dir = ref<Direction>(props.value.initialDirection!)

const setDirection = (direction: Direction) => {
  _dir.value = direction
  if (
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('dir') !== direction
  ) {
    document.documentElement.setAttribute('dir', direction)
  }
}

const toggleDirection = () => {
  setDirection(_dir.value === 'ltr' ? 'rtl' : 'ltr')
}

onMounted(() => {
  if (!props.value.detectDirection || typeof document === 'undefined') {
    return
  }
  const direction = document.documentElement.getAttribute('dir')
  if (direction === 'rtl' || direction === 'ltr') {
    _dir.value = direction
  }
})

let observer: MutationObserver | null = null

onMounted(() => {
  if (!props.value.detectDirection || typeof document === 'undefined') {
    return
  }

  observer = new MutationObserver(() => {
    const direction = document.documentElement.getAttribute('dir')
    if (direction === 'rtl' || direction === 'ltr') {
      if (_dir.value !== direction) {
        _dir.value = direction
      }
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

provideDirectionContext({
  dir: computed(() => _dir.value),
  toggleDirection,
  setDirection,
})
</script>
