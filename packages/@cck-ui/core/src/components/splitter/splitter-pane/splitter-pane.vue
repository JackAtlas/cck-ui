<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { SplitterPaneProps } from './splitter-pane.types'
import { CBox, useComponentProps } from '../../../core'
import { useSplitterContext } from '../splitter.context'

defineOptions({
  name: 'CSplitterPane',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const rawProps = defineProps<SplitterPaneProps>()

const props = useComponentProps({
  component: 'CSplitterPane',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'className',
  'classNames',
  'style',
  'styles',
  'vars',
  'defaultSize',
  'min',
  'max',
  'collapsible',
  'collapseThreshold',
  '__index',
  'mod',
]

const modList = computed(() => [
  {
    collapsed: isCollapsed || undefined,
  },
])

const ctx = useSplitterContext()
const index = props.value.__index ?? 0
const isCollapsed = ctx.collapsed[index]

const sizeStyle = ctx.getPaneStyle(index)

const rootAttrs = computed(() => {
  const style = [sizeStyle, props.value.style]
  const result = ctx.getStyles('pane', {
    className: props.value.className,
    classNames: props.value.classNames,
    style,
    styles: props.value.styles,
    props: props.value,
  })
  const { style: _, ...restAttrs } = attrs
  return {
    ...result,
    ...restAttrs,
  }
})

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
  return {
    ...others,
    mod: mergedMod,
    ...rootAttrs.value,
    style: rootAttrs.value.style ?? undefined,
  }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
