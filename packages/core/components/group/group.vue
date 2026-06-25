<template>
  <c-box
    v-bind="mergedAttrs"
    :mod="[{ grow }, mod]"
    :size="__size"
    :variant="variant"
  >
    <component
      v-for="(node, index) in filteredChildren"
      :key="node.key || index"
      :is="node"
    />
  </c-box>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import type { GroupFactory, GroupProps, GroupStylesCtx } from './group.types'
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children'
import { createVarsResolver, getSpacing, useStyles, CBox } from '@cck-ui/core'
import classes from './group.module.css'

defineOptions({
  name: 'CGroup'
})

const slots = useSlots()
const attrs = useAttrs()

const props = withDefaults(defineProps<GroupProps>(), {
  preventGrowOverflow: true,
  gap: 'md',
  align: 'center',
  justify: 'flex-start',
  wrap: 'wrap'
})

const {
  classNames,
  className,
  style,
  styles,
  unstyled,
  gap,
  grow,
  vars,
  variant,
  __size,
  mod,
  attributes
} = props

const filteredChildren = filterFalsyChildren(slots.default?.())
const childrenCount = filteredChildren.length
const resolvedGap = getSpacing(gap)
const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`

const stylesCtx: GroupStylesCtx = { childWidth }

const varsResolver = createVarsResolver<GroupFactory>(
  (
    _,
    { grow, preventGrowOverflow, gap, align, justify, wrap },
    { childWidth }
  ) => ({
    root: {
      '--group-child-width':
        grow && preventGrowOverflow ? childWidth : undefined,
      '--group-gap': getSpacing(gap),
      '--group-align': align,
      '--group-justify': justify,
      '--group-wrap': wrap
    }
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
  varsResolver
})

const rootAttrs = computed(() => getStyles('root'))

const mergedAttrs = computed(() => ({ ...attrs, ...rootAttrs.value }))
</script>
