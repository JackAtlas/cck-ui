<template>
  <c-collapse
    role="region"
    v-bind="panelAttrs"
    :aria-labelledby="ctx.getControlId(toValue(value))"
    :expanded="expanded"
    :id="ctx.getRegionId(toValue(value))"
    :keep-mounted="props.keepMounted ?? toValue(ctx.keepMounted)"
    :keep-mounted-mode="props.keepMountedMode ?? toValue(ctx.keepMountedMode)"
    :transition-duration="toValue(ctx.transitionDuration) ?? 200"
  >
    <c-box v-bind="contentAttrs">
      <slot />
    </c-box>
  </c-collapse>
</template>

<script setup lang="ts">
import { computed, toValue, useAttrs } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { useAccordionContext, useAccordionItemContext } from '../accordion.context'
import { AccordionPanelProps } from './accordion-panel.types'
import CCollapse from '../../collapse'

defineOptions({
  name: 'CAccordionPanel',
})

const attrs = useAttrs()

const rawProps = defineProps<AccordionPanelProps>()

const props = useComponentProps<AccordionPanelProps>({
  component: 'CAccordionPanel',
  defaultProps: {},
  props: rawProps,
  booleanProps: ['keepMounted'],
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'keepMounted',
  'keepMountedMode',
]

const ctx = useAccordionContext()
const { value } = useAccordionItemContext()

const expanded = computed(() => ctx.isItemActive(toValue(value)))

const panelAttrs = computed(() => {
  const styles = ctx.getStyles('panel', {
    className: () => props.value.className,
    classNames: props.value.classNames,
    style: () => props.value.style,
    styles: props.value.styles,
  })
  const others: Record<string, any> = {}
  for (const key in props.value) {
    if (!knownProps.includes(key)) {
      others[key] = (props.value as any)[key]
    }
  }
  return {
    ...others,
    ...attrs,
    className: styles.className,
    style: {
      ...((styles.style as Record<string, any>) ?? {}),
    },
  }
})

const contentAttrs = computed(() =>
  ctx.getStyles('content', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
</script>
