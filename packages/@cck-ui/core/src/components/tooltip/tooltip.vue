<template>
  <c-portal :disabled="!props.withinPortal" v-bind="props.portalProps">
    <c-transition
      v-bind="transitionPropsResolved"
      :keep-mounted="props.keepMounted"
      :mounted="!props.disabled && tooltip.opened.value"
      :duration="tooltip.isGroupPhase.value ? 10 : (transitionPropsResolved.duration ?? 100)"
    >
      <template #default="{ styles: transitionStyles }">
        <c-box
          :className="tooltipClassName"
          :style="[tooltipStyle, transitionStyles]"
          :ref="setTooltipRef"
          v-bind="tooltipOthers"
          :data-fixed="props.floatingStrategy === 'fixed' || undefined"
          :variant="props.variant"
          :mod="modList"
          :id="floatingProps.id"
          :role="floatingProps.role"
          @mouseenter="floatingProps.onMouseenter"
          @mouseleave="floatingProps.onMouseleave"
        >
          <slot name="label" />
          <floating-arrow
            :ref="setArrowRef"
            :arrow-x="tooltip.arrowX.value"
            :arrow-y="tooltip.arrowY.value"
            :visible="props.withArrow"
            :position="tooltip.placement.value"
            :arrow-size="props.arrowSize!"
            :arrow-offset="props.arrowOffset!"
            :arrow-radius="props.arrowRadius!"
            :arrow-position="props.arrowPosition!"
            v-bind="arrowAttrs"
          />
        </c-box>
      </template>
    </c-transition>
  </c-portal>

  <tooltip-target
    v-if="!hasTarget"
    :target-ref="referenceCallback"
    :reference-props="referenceProps"
    :ref-prop="props.refProp ?? 'ref'"
  >
    <slot />
  </tooltip-target>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, VNodeRef, watch, watchEffect } from 'vue'
import {
  CBox,
  getDefaultZIndex,
  useComponentProps,
  useDirectionContext,
  useStyles,
} from '../../core'
import { CPortal } from '../portal'
import { TooltipFactory, TooltipProps } from './tooltip.types'
import { varsResolver } from './tooltip.utils'
import { resolveElement } from '../../utils'
import classes from './tooltip.module.css'
import { useTooltip } from './use-tooltip'
import {
  FloatingArrow,
  getArrowMergeDropdownStyles,
  getFloatingPosition,
} from '../../utils/Floating'
import { getTransitionProps } from '../transition'
import TooltipTarget from './tooltip-target.vue'

defineOptions({
  name: 'CTooltip',
  inheritAttrs: false,
})

const attrs = useAttrs()

const rawProps = defineProps<TooltipProps>()

const defaultProps = {
  position: 'top',
  refProp: 'ref',
  withinPortal: true,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: 'side',
  offset: 5,
  transitionProps: { duration: 100, transition: 'fade' },
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex('popover'),
  middlewares: { flip: true, shift: false, inline: false },
} satisfies Partial<TooltipProps>

const props = useComponentProps<TooltipProps>({
  component: 'CTooltip',
  defaultProps,
  props: rawProps,
  booleanProps: [
    'withArrow',
    'withinPortal',
    'multiline',
    'interactive',
    'inline',
    'keepMounted',
    'autoContrast',
    'disabled',
  ],
})

const { dir } = useDirectionContext()

const getStyles = useStyles<TooltipFactory>({
  name: 'Tooltip',
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

const arrowEl = ref<HTMLDivElement | null>(null)
const arrowComponentRef = ref<any>(null)

function setArrowRef(el: any) {
  arrowComponentRef.value = el
  if (!el) {
    arrowEl.value = null
    return
  }
  const dom = resolveElement(el)
  arrowEl.value = dom instanceof HTMLDivElement ? dom : null
}

const tooltip = useTooltip({
  position: computed(() => getFloatingPosition(dir.value, props.value.position!)),
  closeDelay: computed(() => props.value.closeDelay),
  openDelay: computed(() => props.value.openDelay),
  onPositionChange: props.value.onPositionChange,
  opened: computed(() => props.value.opened),
  defaultOpened: props.value.defaultOpened,
  arrowRef: arrowEl,
  arrowOffset: computed(() => props.value.arrowOffset),
  offset: computed(() => {
    const raw = props.value.offset!
    const withArrow = props.value.withArrow
    const arrowSize = props.value.arrowSize ?? 4
    return typeof raw === 'number' ? raw + (withArrow ? arrowSize / 2 : 0) : raw
  }),
  events: computed(() => props.value.events),
  interactive: computed(() => props.value.interactive),
  inline: computed(() => props.value.inline),
  strategy: computed(() => props.value.floatingStrategy),
  middlewares: computed(() => props.value.middlewares),
})

const referenceCallback: VNodeRef = (node) => {
  const el = resolveElement(node)
  tooltip.reference(el)
}

const hasTarget = computed(() => props.value.target != null)

const resolveTargetNode = computed<HTMLElement | null>(() => {
  const target = props.value.target
  if (!target) {
    return null
  }
  if (typeof target === 'string') {
    return typeof document !== 'undefined' ? document.querySelector<HTMLElement>(target) : null
  }
  if (target instanceof HTMLElement) {
    return target
  }
  if (typeof target === 'object' && 'value' in (target as any)) {
    const val = (target as any).value
    return val instanceof HTMLElement ? val : null
  }
  return null
})

watch(
  resolveTargetNode,
  (node) => {
    if (node) {
      tooltip.reference(node)
    }
  },
  { immediate: true, flush: 'post' }
)

const tooltipEl = ref<HTMLElement | null>(null)

function setTooltipRef(node: any) {
  const dom = resolveElement(node)
  tooltipEl.value = dom
  if (dom) {
    tooltip.floating(dom)
  }
}

const mergeStyles = computed(() =>
  props.value.arrowPosition === 'merge' && props.value.withArrow
    ? getArrowMergeDropdownStyles({
        position: tooltip.placement.value,
        dir: dir.value,
      })
    : undefined
)

const appliedMergeKeys = new Set<string>()

watchEffect(() => {
  const el = tooltipEl.value
  if (!el) {
    return
  }

  el.style.top = `${tooltip.y.value ?? 0}px`
  el.style.left = `${tooltip.x.value ?? 0}px`
  el.style.zIndex = String(props.value.zIndex ?? 300)

  const next = mergeStyles.value ?? {}
  const nextKeys = new Set(Object.keys(next))

  for (const k of appliedMergeKeys) {
    if (!nextKeys.has(k)) {
      ;(el.style as any)[k] = ''
    }
  }
  for (const [k, v] of Object.entries(next)) {
    ;(el.style as any)[k] = v as string
  }

  appliedMergeKeys.clear()
  for (const k of nextKeys) {
    appliedMergeKeys.add(k)
  }
})

const transitionPropsResolved = computed(() =>
  getTransitionProps(props.value.transitionProps, {
    duration: 100,
    transition: 'fade',
  })
)

const interactiveMod = computed(
  () => props.value.interactive && !props.value.disabled && tooltip.opened.value
)

const modList = computed(() => [
  { multiline: props.value.multiline },
  { interactive: interactiveMod.value },
  props.value.mod,
])

const tooltipStyles = computed(() => getStyles('tooltip') as any)
const tooltipClassName = computed(() => tooltipStyles.value.className)
const tooltipStyle = computed(() => tooltipStyles.value.style)

const arrowAttrs = computed(() => getStyles('arrow'))

const tooltipOthers = computed(() => {
  const result: Record<string, any> = {}
  for (const key in attrs) {
    if (key !== 'class' && key !== 'style') {
      result[key] = attrs[key]
    }
  }
  return result
})

const floatingProps = computed(() => tooltip.getFloatingProps({}))
const referenceProps = computed(() => tooltip.getReferenceProps({}))
</script>
