<template>
  <template v-if="isInstant">
    <c-box
      ref="_root"
      v-bind="attrs"
      v-if="props.keepMounted"
      :style="instantKeepMountedStyle"
      :class-name="props.className ?? ''"
    >
      <slot />
    </c-box>
    <c-box
      ref="_root"
      v-bind="attrs"
      v-else-if="props.expanded"
      :class-name="props.className ?? ''"
      :style="instantBaseStyle"
    >
      <slot />
    </c-box>
  </template>

  <div
    ref="_root"
    v-bind="attrs"
    v-else
    :aria-hidden="!props.expanded"
    :inert="!props.expanded"
    :style="collapseProps.style"
    @transitionend="collapseProps.onTransitionend"
  >
    <slot v-if="shouldRenderContent" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watchEffect } from 'vue'
import { CBox, CStyleProp, useCckTheme, useComponentProps } from '../../core'
import { CollapseProps } from './collapse.types'
import { useDimensionCollapse, useReducedMotion } from '@cck-ui/hooks'

defineOptions({
  name: 'CCollapse',
  inheritAttrs: false,
})

const _root = ref<HTMLElement | null>(null)

const rawProps = defineProps<CollapseProps>()

const defaultProps = {
  orientation: 'vertical',
  transitionDuration: 200,
  transitionTimingFunction: 'ease',
  animateOpacity: true,
  keepMounted: true,
  keepMountedMode: 'activity',
} satisfies Partial<CollapseProps>

const props = useComponentProps<CollapseProps>({
  component: 'CCollapse',
  defaultProps,
  props: rawProps,
  booleanProps: ['expanded', 'animateOpacity', 'keepMounted'],
})

const emit = defineEmits<{
  transitionEnd: []
  transitionStart: []
}>()

const attrs = useAttrs()

const theme = useCckTheme()
const shouldReduceMotion = useReducedMotion()
const reduceMotion = computed(() => (theme.value.respectReducedMotion ? shouldReduceMotion : false))

const duration = computed(() => (reduceMotion.value ? 0 : props.value.transitionDuration))
const isInstant = computed(() => duration.value === 0)

const dimension = computed(() => (props.value.orientation === 'horizontal' ? 'width' : 'height'))

const collapse = useDimensionCollapse(dimension.value, {
  expanded: () => props.value.expanded,
  transitionDuration: duration.value,
  transitionTimingFunction: props.value.transitionTimingFunction,
  onTransitionEnd: () => emit('transitionEnd'),
  onTransitionStart: () => emit('transitionStart'),
  keepMounted: false,
})

watchEffect(() => {
  collapse.elementRef.value = _root.value
})

const isExited = computed(() => collapse.state.value === 'exited')

const shouldRenderContent = computed(() => {
  if (props.value.keepMounted) {
    return true
  }
  return !isExited.value
})

const collapseProps = computed(() =>
  collapse.getCollapseProps({
    style: {
      opacity: props.value.expanded || !props.value.animateOpacity ? 1 : 0,
      transition: props.value.animateOpacity
        ? `opacity ${duration.value}ms ${props.value.transitionTimingFunction}`
        : 'none',
      ...(props.value.keepMounted &&
      props.value.keepMountedMode === 'display-none' &&
      isExited.value
        ? { display: 'none' }
        : {}),
    },
  })
)

const instantKeepMountedStyle = computed<CStyleProp>(() => ({
  boxSizing: 'border-box',
  ...props.value.style,
  ...(!props.value.expanded ? { display: 'none' } : {}),
}))

const instantBaseStyle = computed<CStyleProp>(() => ({
  boxSizing: 'border-box',
  ...props.value.style,
}))
</script>
