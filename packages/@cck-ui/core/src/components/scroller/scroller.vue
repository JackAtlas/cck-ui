<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <unstyled-button
      aria-label="Scroll left"
      data-position="start"
      v-bind="mergedStartControlAttrs"
      :data-hidden="!showStart || undefined"
      :tab-index="showStart ? 0 : -1"
      @click="scroller.scrollStart"
    >
      <slot name="start-control-icon">
        <accordion-chevron v-bind="chevronAttrs" :size="props.chevronSize" />
      </slot>
    </unstyled-button>

    <c-box
      role="presentation"
      v-bind="containerAttrs"
      :data-draggable="props.draggable || undefined"
      :ref="scroller.ref"
      @mousedown="scroller.dragHandlers.onMousedown"
      @mouseleave="scroller.dragHandlers.onMouseleave"
      @mousemove="scroller.dragHandlers.onMousemove"
      @mouseup="scroller.dragHandlers.onMouseup"
    >
      <c-box v-bind="contentAttrs">
        <slot />
      </c-box>
    </c-box>

    <unstyled-button
      aria-label="Scroll right"
      data-position="end"
      v-bind="mergedEndControlAttrs"
      :data-hidden="!showEnd || undefined"
      :tab-index="showEnd ? 0 : -1"
      @click="scroller.scrollEnd"
    >
      <slot name="end-control-icon">
        <accordion-chevron v-bind="chevronAttrs" :size="props.chevronSize" />
      </slot>
    </unstyled-button>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useScroller } from '@cck-ui/hooks'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { ScrollerFactory, ScrollerProps } from './scroller.types'
import UnstyledButton from '../unstyled-button'
import { varsResolver } from './scroller.utils'
import { AccordionChevron } from '../accordion'
import classes from './scroller.module.css'

defineOptions({
  name: 'CScroller',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ScrollerProps>()

const defaultProps = {
  scrollAmount: 200,
  draggable: true,
} satisfies Partial<ScrollerProps>

const props = useComponentProps<ScrollerProps>({
  component: 'CScroller',
  defaultProps,
  props: rawProps,
  booleanProps: ['draggable', 'showEndControl', 'showStartControl'],
})

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'scrollAmount',
  'controlSize',
  'edgeGradientColor',
  'startControlProps',
  'endControlProps',
  'showStartControl',
  'showEndControl',
  'draggable',
  'mod',
  'attributes',
]

const getStyles = useStyles<ScrollerFactory>({
  name: 'Scroller',
  props: styleProps,
  classes,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const rootAttrs = computed(() => getStyles('root'))
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const controlAttrs = computed(() => getStyles('control'))
const mergedStartControlAttrs = computed(() => {
  return { ...controlAttrs.value, ...props.value.startControlProps }
})
const mergedEndControlAttrs = computed(() => {
  return { ...controlAttrs.value, ...props.value.endControlProps }
})

const chevronAttrs = computed(() => {
  const result = getStyles('chevron')
  return {
    class: result.className,
    style: result.style,
  }
})
const containerAttrs = computed(() => getStyles('container'))
const contentAttrs = computed(() => getStyles('content'))

const scroller = useScroller({
  scrollAmount: () => props.value.scrollAmount ?? 200,
  draggable: () => props.value.draggable ?? true,
})

const showStart = computed(() => props.value.showStartControl || scroller.canScrollStart.value)
const showEnd = computed(() => props.value.showEndControl || scroller.canScrollEnd.value)

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
