<template>
  <c-box ref="_root" v-bind="mergedAttrs" :__vars="cornerVars">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { provideScrollAreaContext } from '../scroll-area.context'
import { ScrollAreaRootProps } from './scroll-area-root.types'

defineOptions({
  name: 'CScrollAreaRoot',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ScrollAreaRootProps>()

const props = useComponentProps<ScrollAreaRootProps>({
  component: 'CScrollAreaRoot',
  defaultProps: {
    scrollHideDelay: 1000,
    type: 'hover',
  },
  props: rawProps,
  booleanProps: ['scrollbars'],
})
const scrollArea = ref<HTMLDivElement | null>(null)
const viewport = ref<HTMLDivElement | null>(null)
const content = ref<HTMLDivElement | null>(null)
const scrollbarX = ref<HTMLDivElement | null>(null)
const scrollbarY = ref<HTMLDivElement | null>(null)
const cornerWidth = ref(0)
const cornerHeight = ref(0)
const scrollbarXEnabled = ref(false)
const scrollbarYEnabled = ref(false)

function resolveElement(el: any): HTMLDivElement | null {
  if (!el) {
    return null
  }
  if (el instanceof HTMLDivElement) {
    return el
  }
  const root = el.root
  if (root instanceof HTMLDivElement) {
    return root
  }
  if (root && typeof root === 'object' && 'value' in root) {
    return (root.value as HTMLDivElement) ?? null
  }
  return null
}

const rootElement = computed<HTMLDivElement | null>(() => resolveElement(_root.value))

watch(
  rootElement,
  (el) => {
    scrollArea.value = el
  },
  { immediate: true, flush: 'post' }
)

const cornerVars = computed(() => ({
  '--sa-corner-width': props.value.scrollbars !== 'xy' ? '0px' : `${cornerWidth.value}px`,
  '--sa-corner-height': props.value.scrollbars !== 'xy' ? '0px' : `${cornerHeight.value}px`,
}))

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'unstyled',
  'getStyles',
  'type',
  'scrollbars',
  'scrollHideDelay',
  'attributes',
]

const rootAttrs = computed(() => props.value.getStyles('root'))
const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  return { ...others, ...attrs, ...rootAttrs.value }
})

provideScrollAreaContext({
  type: computed(() => props.value.type ?? 'hover'),
  scrollHideDelay: computed(() => props.value.scrollHideDelay ?? 1000),
  scrollArea,
  viewport,
  onViewportChange: (v) => (viewport.value = v),
  content,
  onContentChange: (v) => (content.value = v),
  scrollbarX,
  onScrollbarXChange: (v) => (scrollbarX.value = v),
  scrollbarXEnabled,
  onScrollbarXEnabledChange: (v) => (scrollbarXEnabled.value = v),
  scrollbarY,
  onScrollbarYChange: (v) => (scrollbarY.value = v),
  scrollbarYEnabled,
  onScrollbarYEnabledChange: (v) => (scrollbarYEnabled.value = v),
  onCornerWidthChange: (w) => (cornerWidth.value = w),
  onCornerHeightChange: (h) => (cornerHeight.value = h),
  getStyles: props.value.getStyles,
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
