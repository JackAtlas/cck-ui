<template>
  <c-box v-bind="mergedItemAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, toValue, useAttrs } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { AccordionItemProps } from './accordion-item.types'
import { provideAccordionItemContext, useAccordionContext } from '../accordion.context'

defineOptions({
  name: 'CAccordionItem',
})

const attrs = useAttrs()

const rawProps = defineProps<AccordionItemProps>()

const defaultProps = {} satisfies Partial<AccordionItemProps>

const props = useComponentProps<AccordionItemProps>({
  component: 'CAccordionItem',
  defaultProps,
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'value', 'mod']

const ctx = useAccordionContext()

const itemAttrs = computed(() =>
  ctx.getStyles('item', {
    className: () => props.value.className,
    classNames: props.value.classNames,
    style: () => props.value.style,
    styles: props.value.styles,
    variant: toValue(ctx.variant),
  })
)
const modList = computed(() => [{ active: ctx.isItemActive(props.value.value) }])
const mergedItemAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props.value) {
    if (!knownProps.includes(key)) {
      others[key] = (props.value as any)[key]
    }
  }
  return {
    ...others,
    ...attrs,
    mod: modList.value,
    ...itemAttrs.value,
  }
})

provideAccordionItemContext({
  value: props.value.value,
})
</script>
