<template>
  <c-box ref="rootRef" v-bind="mergedAttrs">
    <template v-for="(vnode, index) in paneVNodes" :key="`pane-${index}`">
      <c-box
        v-if="index > 0"
        v-bind="handleAttrs(index - 1)"
        :key="`handle-${index - 1}`"
        @pointerdown="splitter.getHandleEventHandlers({ index: index - 1 }).onPointerDown"
        @touchstart="splitter.getHandleEventHandlers({ index: index - 1 }).onTouchStart"
        @keydown="splitter.getHandleEventHandlers({ index: index - 1 }).onKeyDown"
        @dblclick="handleDblClick(index - 1)"
      >
        <c-box
          v-if="withHandle"
          v-bind="getStyles('thumb')"
          :data-orientation="orientation"
          :data-active="isHandleActive(index - 1) || undefined"
        >
          <component :is="thumbIcon" :orientation="defaultIcon" />
        </c-box>
      </c-box>

      <component :is="vnode" :__index="index" />
    </template>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch, watchEffect } from 'vue'
import { CBox, useComponentProps, useStyles } from '../../core'
import { SplitterFactory, type SplitterProps } from './splitter.types'
import classes from './splitter.module.css'
import { varsResolver } from './splitter.utils'
import SplitterPane from './splitter-pane/splitter-pane.vue'
import { useSplitter, UseSplitterPanel } from '@cck-ui/hooks'
import { provideSplitterContext } from './splitter.context'
import GripIcon from './grip-icon.vue'

defineOptions({
  name: 'CSplitter',
})

const rootRef = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<SplitterProps>()

const defaultProps = {
  orientation: 'horizontal',
  lineSize: 2,
  withHandle: true,
  resetOnDoubleClick: true,
} satisfies Partial<SplitterProps>

const props = useComponentProps({
  component: 'CSplitter',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'orientation',
  'sizes',
  'onSizeChange',
  'onResizeStart',
  'onResizeEnd',
  'onCollapseChange',
  'redistribute',
  'step',
  'shiftStep',
  'lineSize',
  'handleColor',
  'handleIcon',
  'withHandle',
  'resetOnDoubleClick',
  'mod',
  'attributes',
]

const modList = computed(() => [
  {
    orientation: props.value.orientation,
  },
])

const getStyles = useStyles<SplitterFactory>({
  name: 'Splitter',
  classes,
  props: { ...props.value, ...attrs } as SplitterProps,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const paneVNodes = ref<any[]>([])
const panels = ref<UseSplitterPanel[]>([])

watchEffect(() => {
  const defaultSlots = slots.default?.() || []
  const filtered = defaultSlots.filter((vnode) => vnode.type === SplitterPane)
  paneVNodes.value = filtered
  panels.value = filtered.map((vnode) => {
    const vProps = vnode.props || {}
    return {
      defaultSize: vProps.defaultSize ?? vProps['default-size'] ?? 0,
      min: vProps.min ?? undefined,
      max: vProps.max ?? undefined,
      collapsible: vProps.collapsible || false,
      collapseThreshold: vProps.collapseThreshold ?? vProps['collapse-threshold'] ?? undefined,
    }
  })
})

const splitter = useSplitter({
  panels: panels.value,
  orientation: props.value.orientation,
  sizes: props.value.sizes,
  onSizeChange: props.value.onSizeChange,
  onResizeStart: props.value.onResizeStart,
  onResizeEnd: props.value.onResizeEnd,
  onCollapseChange: props.value.onCollapseChange,
  redistribute: props.value.redistribute,
  step: props.value.step,
  shiftStep: props.value.shiftStep,
  resetOnDoubleClick: props.value.resetOnDoubleClick,
})

watch(
  rootRef,
  (newVal) => {
    if (newVal) {
      const domEl = newVal.$el || newVal.root
      if (domEl instanceof HTMLElement) {
        splitter.containerRef(domEl)
      }
    } else {
      splitter.containerRef(null)
    }
  },
  { immediate: true }
)

const getHandleAttrs = (index: number) => {
  const handleProps = splitter.getHandleProps({ index })
  const { ref: _ref, onDoubleClick, ...attrs } = handleProps
  return {
    role: attrs.role,
    'aria-orientation': attrs['aria-orientation'],
    'aria-valuenow': handleProps['aria-valuenow'],
    'aria-valuemin': handleProps['aria-valuemin'],
    'aria-valuemax': handleProps['aria-valuemax'],
    tabIndex: handleProps.tabIndex,
    'data-active': handleProps['data-active'],
    'data-orientation': handleProps['data-orientation'],
  }
}

const isHandleActive = (index: number) => {
  return splitter.activeHandle === index
}

const handleAttrs = (index: number) => {
  const styles = getStyles('handle')
  const attrs = getHandleAttrs(index)
  return {
    ...styles,
    ...attrs,
    key: `handle-${index}`,
  }
}

const getPaneStyle = (index: number) => {
  const sizes = splitter.sizes.value
  const size = sizes[index]
  const pixelMode = splitter.pixelMode
  if (!pixelMode) {
    const magnitude = typeof size === 'number' ? size : parseFloat(size as string)
    return { flexBasis: `${magnitude}%` }
  }
  const isFixed = typeof size === 'string' && (size.endsWith('px') || size.endsWith('rem'))
  if (isFixed) {
    return { flexGrow: 0, flexShrink: 1, flexBasis: size as string }
  }
  const magnitude = typeof size === 'number' ? size : parseFloat(size as string)
  return { flexGrow: magnitude, flexShrink: 1, flexBasis: 0 }
}

const collapsed = computed(() => splitter.collapsed)
const orientation = computed(() => props.value.orientation || 'horizontal')

provideSplitterContext({
  getStyles,
  sizes: splitter.sizes,
  collapsed,
  orientation,
  getPaneStyle,
})

const defaultIcon = computed(() =>
  props.value.orientation === 'vertical' ? 'horizontal' : 'vertical'
)

const thumbIcon = computed(() => {
  if (props.value.handleIcon !== undefined) {
    return props.value.handleIcon
  }
  return GripIcon
})

const withHandle = computed(() => props.value.withHandle)

const handleDblClick = (index: number) => {
  if (props.value.resetOnDoubleClick !== false) {
    splitter.reset(index)
  }
}

const rootAttrs = computed(() => getStyles('root'))

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => rootRef.value?.root || null),
  sizes: splitter.sizes,
  collapsed: splitter.collapsed,
  activeHandle: splitter.activeHandle,
  setSizes: splitter.setSizes,
  collapse: splitter.collapse,
  expand: splitter.expand,
  toggleCollapse: splitter.toggleCollapse,
  reset: splitter.reset,
})
</script>
