<template>
  <c-box ref="_root" v-bind="mergedAttrs" :size="__size" :variant="variant">
    <component v-for="(node, index) in filteredChildren" :key="node.key || index" :is="node" />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import type { GroupFactory, GroupProps, GroupStylesCtx } from './group.types'
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children'
import { getSpacing, useStyles, CBox, useComponentProps, CStyleProp } from '../../core'
import classes from './group.module.css'
import { varsResolver } from './group.utils'

defineOptions({
  name: 'CGroup',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<GroupProps>()

const props = useComponentProps({
  component: 'CGroup',
  defaultProps: {
    preventGrowOverflow: true,
    gap: 'md',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap',
  },
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'gap',
  'align',
  'justify',
  'wrap',
  'grow',
  'preventGrowOverflow',
  'vars',
  'variant',
  '__size',
  'mod',
  'attributes',
]

const filteredChildren = computed(() => filterFalsyChildren(slots.default?.()))
const childrenCount = computed(() => filteredChildren.value.length)
const resolvedGap = computed(() => getSpacing(props.value.gap))

const childWidth = computed(() => {
  const count = childrenCount.value
  const gap = resolvedGap.value
  if (count === 0) {
    return 'auto'
  }
  return `calc(${100 / count}% - (${gap} - ${gap} / ${count}))`
})

const stylesCtx = computed<GroupStylesCtx>(() => ({
  childWidth: childWidth.value,
}))

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<GroupFactory>({
  name: 'Group',
  props: styleProps,
  stylesCtx,
  className: () => props.value.className,
  style: () => props.value.style,
  classes,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const modList = computed(() => [{ grow: props.value.grow }])

const rootAttrs = computed(() => getStyles('root'))

const mergedAttrs = computed(() => {
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
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
