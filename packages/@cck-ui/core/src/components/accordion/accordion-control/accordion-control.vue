<template>
  <component v-bind="titleAttrs" v-if="shouldWrapWithHeading" :is="heading">
    <unstyled-button
      type="button"
      v-bind="mergedControlAttrs"
      :aria-controls="ctx.getRegionId(toValue(value))"
      :aria-expanded="isActive"
      :disabled="props.disabled"
      :id="ctx.getControlId(toValue(value))"
      :unstyled="toValue(ctx.unstyled)"
      @click="clickHandler"
      @keydown="keydownHandler"
    >
      <c-box tag="span" v-bind="mergedChevronAttrs">
        <slot name="chevron">
          <component v-for="c in ctxChevron" :is="c" :key="c.key" />
        </slot>
      </c-box>
      <c-box tag="span" v-bind="labelAttrs">
        <slot />
      </c-box>
      <template v-if="$slots.icon">
        <c-box tag="span" v-bind="mergedIconAttrs">
          <slot name="icon" />
        </c-box>
      </template>
    </unstyled-button>
  </component>
  <unstyled-button
    type="button"
    v-bind="mergedControlAttrs"
    v-else
    :aria-controls="ctx.getRegionId(toValue(value))"
    :aria-expanded="isActive"
    :disabled="props.disabled"
    :id="ctx.getControlId(toValue(value))"
    :unstyled="toValue(ctx.unstyled)"
    @click="clickHandler"
    @keydown="keydownHandler"
  >
    <c-box tag="span" v-bind="mergedChevronAttrs">
      <slot name="chevron">
        <component v-for="c in ctxChevron" :is="c" :key="c.key" />
      </slot>
    </c-box>
    <c-box tag="span" v-bind="labelAttrs">
      <slot />
    </c-box>
    <template v-if="$slots.icon">
      <c-box tag="span" v-bind="mergedIconAttrs">
        <slot name="icon" />
      </c-box>
    </template>
  </unstyled-button>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import { CBox, createScopedKeydownHandler, useComponentProps } from '../../../core'
import { useAccordionContext, useAccordionItemContext } from '../accordion.context'
import { AccordionControlProps } from './accordion-control.types'
import UnstyledButton from '../../unstyled-button'

defineOptions({
  name: 'CAccordionControl',
})

const rawProps = defineProps<AccordionControlProps>()

const defaultProps = {} satisfies Partial<AccordionControlProps>

const props = useComponentProps<AccordionControlProps>({
  component: 'CAccordionPanel',
  defaultProps,
  props: rawProps,
  booleanProps: ['disabled', 'noChevron'],
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'chevron',
  'noChevron',
  'icon',
  'onClick',
  'onKeyDown',
  'disabled',
  'mod',
]

const ctx = useAccordionContext()
const { value } = useAccordionItemContext()

const isActive = computed(() => ctx.isItemActive(toValue(value)))
const shouldWrapWithHeading = computed(() => typeof toValue(ctx.order) === 'number')
const heading = `h${toValue(ctx.order)}` as const

const ctxChevron = Array.isArray(ctx.chevron) ? ctx.chevron : [ctx.chevron]

const clickHandler = (event: PointerEvent) => {
  props.value.onClick?.(event)
  ctx.onChange(toValue(value))
}

const keydownHandler = createScopedKeydownHandler({
  siblingSelector: '[data-accordion-control]',
  parentSelector: '[data-accordion]',
  activateOnFocus: false,
  loop: toValue(ctx.loop),
  orientation: 'vertical',
  onKeydown: props.value.onKeydown,
})

const controlAttrs = computed(() =>
  ctx.getStyles('control', {
    className: () => props.value.className,
    classNames: props.value.classNames,
    style: () => props.value.style,
    styles: props.value.styles,
    variant: toValue(ctx.variant),
  })
)
const controlModList = computed(() => [
  { 'accordion-control': true },
  { active: isActive.value },
  { 'chevron-position': toValue(ctx.chevronPosition) },
  { disabled: props.value.disabled ?? undefined },
])
const mergedControlAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(controlModList.value || []),
  ]
  return { ...others, mod: mergedMod, ...controlAttrs.value }
})

const labelAttrs = computed(() =>
  ctx.getStyles('label', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const chevronAttrs = computed(() =>
  ctx.getStyles('chevron', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
const chevronModList = computed(() => [
  { rotate: !toValue(ctx.disableChevronRotation) && isActive.value },
  { position: toValue(ctx.chevronPosition) },
])
const mergedChevronAttrs = computed(() => ({ mod: chevronModList.value, ...chevronAttrs.value }))

const iconAttrs = computed(() =>
  ctx.getStyles('icon', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
const iconModList = computed(() => [{ 'chevron-position': toValue(ctx.chevronPosition) }])
const mergedIconAttrs = computed(() => ({ mod: iconModList.value, ...iconAttrs.value }))

const titleAttrs = computed(() =>
  ctx.getStyles('itemTitle', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
</script>
