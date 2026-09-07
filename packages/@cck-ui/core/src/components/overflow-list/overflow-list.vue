<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <template v-for="(item, index) in data" :key="getKey(item, index)">
      <div class="c-OverflowList-item" v-if="index < visibleCount">
        <slot name="item" :item="item" :index="index" />
      </div>
    </template>

    <div class="c-OverflowList-indicator" ref="_overflow" v-if="overflowItems.length > 0">
      <slot name="overflow" :items="overflowItems" />
    </div>
  </c-box>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { OverflowListFactory, OverflowListProps } from './overflow-list.types'
import { varsResolver } from './overflow-list.utils'
import classes from './overflow-list.module.css'

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

const visibleCount = ref(props.value.data.length)

function getKey(item: any, index: number) {
  const keyFn = props.value.getItemKey
  if (keyFn) {
    return keyFn(item, index)
  }
  if (item === null || typeof item !== 'object') {
    return String(item)
  }
  return index
}

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

function adjustForOverflow() {
  const container = _root.value?.root
  const indicator = _overflow.value
  if (!container || !indicator || overflowItems.value.length === 0) {
    return
  }

  const items = container.querySelectorAll('.c-OverflowList-item')
  if (items.length === 0) {
    return
  }

  const lastItem = items[items.length - 1]
  const lastRect = lastItem.getBoundingClientRect()
  const indicatorRect = indicator.getBoundingClientRect()
  const rowTop = Math.round(lastRect.top)

  if (Math.round(indicatorRect.top) > rowTop + 2) {
    visibleCount.value = Math.max(0, visibleCount.value - 1)
    if (visibleCount.value > 0) {
      nextTick(() => adjustForOverflow())
    }
  }
}

function updateVisibleCount() {
  const container = _root.value?.root
  if (!container) {
    return
  }
  const children = Array.from(container.children).filter(
    (el) => !el.classList.contains('c-Overflow-indicator')
  ) as HTMLElement[]
  if (children.length === 0) {
    return
  }

  const maxRows = props.value.maxRows || 1
  const maxVisible = props.value.maxVisibleItems || Infinity

  const rows: { top: number; items: HTMLElement[] }[] = []
  const sorted = [...children].sort((a, b) => {
    const ra = a.getBoundingClientRect()
    const rb = b.getBoundingClientRect()
    return ra.top - rb.top || ra.left - rb.left
  })

  let currentRow: { top: number; items: HTMLElement[] } | null = null
  for (const el of sorted) {
    const rect = el.getBoundingClientRect()
    const top = Math.round(rect.top)
    if (!currentRow || Math.abs(top - currentRow.top) > 2) {
      currentRow = { top, items: [el] }
      rows.push(currentRow)
    } else {
      currentRow.items.push(el)
    }
  }

  let total = 0
  for (let i = 0; i < Math.min(rows.length, maxRows); i++) {
    total += rows[i].items.length
  }
  visibleCount.value = Math.min(total, maxVisible)

  nextTick(() => {
    adjustForOverflow()
  })
}

const overflowItems = computed(() => props.value.data.slice(visibleCount.value))

watch(
  () => [props.value.data, props.value.maxRows],
  () => {
    visibleCount.value = props.value.data.length
    nextTick(updateVisibleCount)
  },
  { deep: true }
)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const container = _root.value?.root
  if (container) {
    resizeObserver = new ResizeObserver(() => {
      nextTick(updateVisibleCount)
    })
    resizeObserver.observe(container)
    nextTick(updateVisibleCount)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  indicator: computed(() => _overflow.value),
})
</script>
