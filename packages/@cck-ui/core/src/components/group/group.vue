<template>
  <c-box v-bind="mergedAttrs" :mod="[{ grow }, mod]" :size="__size" :variant="variant">
    <component v-for="(node, index) in filteredChildren" :key="node.key || index" :is="node" />
  </c-box>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { GroupFactory, GroupProps, GroupStylesCtx } from './group.types'
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children'
import { createVarsResolver, getSpacing, useStyles, CBox } from '../../core'
import classes from './group.module.css'

defineOptions({
  name: 'CGroup',
})

const slots = useSlots()

const props = withDefaults(defineProps<GroupProps>(), {
  preventGrowOverflow: true,
  gap: 'md',
  align: 'center',
  justify: 'flex-start',
  wrap: 'wrap',
})

const {
  classNames,
  className,
  style,
  styles,
  unstyled,
  gap,
  align,
  justify,
  wrap,
  grow,
  preventGrowOverflow,
  vars,
  variant,
  __size,
  mod,
  attributes,
  ...others
} = props

const filteredChildren = filterFalsyChildren(slots.default?.())
const childrenCount = filteredChildren.length
const resolvedGap = getSpacing(gap)
const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`

const stylesCtx: GroupStylesCtx = { childWidth }

const varsResolver = createVarsResolver<GroupFactory>(
  (_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      '--group-child-width': grow && preventGrowOverflow ? childWidth : undefined,
      '--group-gap': getSpacing(gap),
      '--group-align': align,
      '--group-justify': justify,
      '--group-wrap': wrap,
    },
  })
)

const getStyles = useStyles<GroupFactory>({
  name: 'Group',
  props,
  stylesCtx,
  className,
  style,
  classes,
  classNames,
  styles,
  unstyled,
  attributes,
  vars,
  varsResolver,
})

const rootAttrs = computed(() => getStyles('root'))

const mergedAttrs = computed(() => ({ ...others, ...rootAttrs.value }))
</script>
