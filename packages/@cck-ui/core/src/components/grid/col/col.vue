<template>
  <c-box v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import cx from 'clsx'
import { computed, inject, onUnmounted, ref, watchEffect } from 'vue'
import {
  CBox,
  normalizeNumberLikeStringProp,
  responsiveStyleManager,
  useRandomClassName,
} from '../../../core'
import type { ColProps } from './col.types'
import { useColCustomStyle } from './col-custom'
import { GridContextValue } from '../grid.context'
import { GRID_CONTEXT_KEY } from '../grid.constants'

defineOptions({
  name: 'CCol',
})

const props = withDefaults(defineProps<ColProps>(), {
  span: 12,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'span',
  'order',
  'offset',
  'align',
]

const gridContext = inject(GRID_CONTEXT_KEY) as GridContextValue

const responsiveClassname = useRandomClassName()

const rootAttrs = computed(() =>
  gridContext.getStyles('col', {
    className: cx(props.className, responsiveClassname),
    style: props.style,
    classNames: props.classNames,
    styles: props.styles,
  })
)
const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})

const _offset = normalizeNumberLikeStringProp(props.offset)
const _order = normalizeNumberLikeStringProp(props.order)
const colStyle = useColCustomStyle(
  {
    selector: responsiveClassname,
    align: props.align,
    offset: _offset,
    order: _order,
    span: props.span,
  },
  gridContext
)

const currentStyleKey = ref<string | null>(null)
watchEffect(() => {
  const cssText = colStyle.value.queryStylesString
  if (cssText) {
    const newKey = responsiveStyleManager.register(cssText)
    if (currentStyleKey.value && currentStyleKey.value !== newKey) {
      responsiveStyleManager.unregister(currentStyleKey.value)
    }
    currentStyleKey.value = newKey
  } else if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
    currentStyleKey.value = null
  }
})
onUnmounted(() => {
  if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
  }
})
</script>
