<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <div
      class="c-OverflowList-indicator"
      ref="_overflow"
      v-if="(overflowItems.length > 0 || isMeasuring) && isCollapseStart"
    >
      <slot name="overflow" :items="overflowItems" />
    </div>

    <template v-for="(item, index) in finalItems" :key="indexOffset + index">
      <div class="c-OverflowList-item" v-if="index < finalVisibleCount">
        <slot name="item" :item="item" :index="indexOffset + index" />
      </div>
    </template>

    <div
      class="c-OverflowList-indicator"
      ref="_overflow"
      v-if="(overflowItems.length > 0 || isMeasuring) && !isCollapseStart"
    >
      <slot name="overflow" :items="overflowItems" />
    </div>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { OverflowListFactory, OverflowListProps } from './overflow-list.types'
import classes from './overflow-list.module.css'
import { varsResolver } from './overflow-list.utils'
import { useOverflowList } from './use-overflow-list'

defineOptions({
  name: 'COverflowList',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _overflow = ref<HTMLElement | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<OverflowListProps>()

const defaultProps = {
  maxRows: 1,
  maxVisibleItems: Infinity,
  collapseFrom: 'end',
  gap: 'xs',
} satisfies Partial<OverflowListProps>

const props = useComponentProps({
  component: 'COverflowList',
  defaultProps,
  props: rawProps,
})

const containerEl = computed(() => _root.value?.root ?? null)

const { finalVisibleCount, isCollapseStart, overflowItems, finalItems, indexOffset, isMeasuring } =
  useOverflowList(props, containerEl, _overflow)

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'attributes',
  'data',
  'maxRows',
  'maxVisibleItems',
  'collapseFrom',
  'getItemkey',
  'ref',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<OverflowListFactory>({
  name: 'OverflowList',
  props: styleProps,
  classes,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

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
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  indicator: computed(() => _overflow.value),
})
</script>
