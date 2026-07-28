<template>
  <c-box ref="_col" v-bind="mergedAttrs">
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
  useComponentProps,
  useRandomClassName,
} from '../../../core'
import type { ColProps } from './col.types'
import { useColCustomStyle } from './col-custom'
import { GRID_CONTEXT_KEY } from '../grid.constants'

defineOptions({
  name: 'CCol',
})

const _col = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<ColProps>()

const props = useComponentProps({
  component: 'CCol',
  defaultProps: {
    span: 12,
  },
  props: rawProps,
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

const gridContext = inject(GRID_CONTEXT_KEY)

if (!gridContext) {
  throw new Error('[@cck-ui/col] CCol component should be wrapped inside CGrid component.')
}

const responsiveClassname = useRandomClassName()

const rootAttrs = computed(() => {
  return gridContext.getStyles('col', {
    className: cx(props.value.className, responsiveClassname),
    style: props.value.style,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
})

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const _offset = normalizeNumberLikeStringProp(props.value.offset)
const _order = normalizeNumberLikeStringProp(props.value.order)
const colStyle = useColCustomStyle(
  {
    selector: responsiveClassname,
    align: props.value.align,
    offset: _offset,
    order: _order,
    span: props.value.span,
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

defineExpose({
  root: computed(() => _col.value?.root ?? null),
})
</script>
