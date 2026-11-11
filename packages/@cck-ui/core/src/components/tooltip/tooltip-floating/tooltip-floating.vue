<template>
  <c-portal>
    <c-box
      v-bind="tooltipOthers"
      :ref="setFloatingRef"
      :className="tooltipClassName"
      :style="[tooltipStyles, floatingStyle]"
      :variant="props.variant"
      :mod="modList"
    >
      <slot name="label" />
    </c-box>
  </c-portal>

  <tooltip-floating-target
    :target-ref="targetRef"
    :reference-props="{ onMouseenter: handleEnter, onMouseleave: handleLeave }"
  >
    <slot />
  </tooltip-floating-target>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import CPortal from '../../portal'
import { TooltipFloatingFactory, TooltipFloatingProps } from './tooltip-floating.types'
import { CBox, getDefaultZIndex, useComponentProps, useStyles } from '../../../core'
import classes from '../tooltip.module.css'
import { varsResolver } from './tooltip-floating.utils'
import { useFloatingTooltip } from './use-floating-tooltip'
import { useMergedRef } from '@cck-ui/hooks'
import { resolveElement } from '../../../utils'

defineOptions({
  name: 'CTooltipFloating',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<TooltipFloatingProps>()

const defaultProps = {
  withinPortal: true,
  offset: 10,
  position: 'right',
  zIndex: getDefaultZIndex('popover'),
} satisfies Partial<TooltipFloatingProps>

const props = useComponentProps<TooltipFloatingProps>({
  component: 'CTooltipFloating',
  defaultProps,
  props: rawProps,
  booleanProps: ['withinPortal', 'multiline', 'disabled'],
})

const getStyles = useStyles<TooltipFloatingFactory>({
  name: 'TooltipFloating',
  props,
  classes,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  rootSelector: 'tooltip',
  vars: props.value.vars,
  varsResolver,
})

const tooltip = useFloatingTooltip({
  offset: props.value.offset ?? 10,
  position: props.value.position ?? 'right',
  defaultOpened: props.value.defaultOpened,
})

const boundaryRef = tooltip.boundaryRef

const childRef = ref<any>(null)

const targetRef = useMergedRef<HTMLElement>(
  (el: any) => {
    boundaryRef.value = resolveElement(el)
  },
  () => {}
)

const setFloatingRef = (node: any) => {
  const dom = resolveElement(node)
  if (dom) {
    tooltip.floating(dom)
  }
}

const handleEnter = (event: MouseEvent) => {
  tooltip.handleMouseMove(event)
  tooltip.setOpened(true)
}

const handleLeave = () => {
  tooltip.setOpened(false)
}

const tooltipStyles = computed(() => getStyles('tooltip') as any)
const tooltipClassName = computed(() => tooltipStyles.value.className)

const floatingStyle = computed(() => {
  const isOpened = !props.value.disabled && tooltip.opened.value
  return {
    ...tooltipStyles.value.style,
    zIndex: props.value.zIndex as any,
    display: isOpened ? 'block' : 'none',
    top: Number.isFinite(tooltip.y.value) ? `${Math.round(tooltip.y.value)}px` : '',
    left: Number.isFinite(tooltip.x.value) ? `${Math.round(tooltip.x.value)}px` : '',
  }
})

const modList = computed(() => ({ multiline: props.value.multiline }))

const tooltipOthers = computed(() => {
  const result: Record<string, any> = {}
  for (const key in attrs) {
    if (key !== 'class' && key !== 'style') {
      result[key] = attrs[key]
    }
  }
  return result
})
</script>
