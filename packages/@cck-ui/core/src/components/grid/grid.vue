<template>
  <c-box ref="_container" v-if="type === 'container' && breakpoints" v-bind="containerAttrs">
    <c-box ref="_root" v-bind="mergedRootAttrs">
      <c-box ref="_inner" v-bind="innerAttrs">
        <slot />
      </c-box>
    </c-box>
  </c-box>
  <template v-else>
    <c-box ref="_root" v-bind="mergedRootAttrs">
      <c-box ref="_inner" v-bind="innerAttrs">
        <slot />
      </c-box>
    </c-box>
  </template>
</template>

<script setup lang="ts">
import { computed, onUnmounted, provide, ref, useAttrs, watchEffect } from 'vue'
import {
  CBox,
  CStyleProp,
  isNumberLike,
  responsiveStyleManager,
  useComponentProps,
  useRandomClassName,
  useStyles,
} from '../../core'
import { useGridCustomStyle } from './grid-custom'
import { DEFAULT_COLUMNS, GRID_CONTEXT_KEY } from './grid.constants'
import { GridContextValue } from './grid.context'
import type { GridFactory, GridProps } from './grid.types'
import classes from './grid.module.css'
import { varsResolver } from './grid.utils'

defineOptions({
  name: 'CGrid',
})

const _container = ref<InstanceType<typeof CBox> | null>(null)
const _root = ref<InstanceType<typeof CBox> | null>(null)
const _inner = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<GridProps>()

const props = useComponentProps({
  component: 'CGrid',
  defaultProps: {
    columns: DEFAULT_COLUMNS,
    gap: 'md',
  },
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'grow',
  'gap',
  'rowGap',
  'columnGap',
  'columns',
  'align',
  'justify',
  'breakpoints',
  'type',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<GridFactory>({
  name: 'Grid',
  classes,
  props: styleProps,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const responsiveClassname = useRandomClassName()

const rootAttrs = computed(() => getStyles('root', { className: responsiveClassname }))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const innerAttrs = computed(() => getStyles('inner'))

const containerAttrs = computed(() => getStyles('container'))

const gridStyle = useGridCustomStyle({
  selector: responsiveClassname,
  ...props.value,
})

const currentStyleKey = ref<string | null>(null)
watchEffect(() => {
  const cssText = gridStyle.value.queryStylesString
  if (cssText) {
    const newKey = responsiveStyleManager.register(cssText)
    if (currentStyleKey.value && currentStyleKey.value !== newKey) {
      responsiveStyleManager.unregister(currentStyleKey.value)
    }
    currentStyleKey.value = newKey
  } else if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
    currentStyleKey.value = null
  }
})
onUnmounted(() => {
  if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
  }
})

const _breakpoints = computed(() => props.value.breakpoints)
const _columns = computed(() => {
  if (!isNumberLike(props.value.columns)) {
    console.warn(
      `[C-Grid] columns should be number or number-like string, got ${props.value.columns}. Fallback to default columns ${DEFAULT_COLUMNS}.`
    )
    return DEFAULT_COLUMNS
  }

  return Number(props.value.columns)
})
const _grow = computed(() => props.value.grow)
const _type = computed(() => props.value.type)

const context: GridContextValue = {
  getStyles,
  get breakpoints() {
    return _breakpoints.value
  },
  get columns() {
    return _columns.value
  },
  get grow() {
    return _grow.value
  },
  get type() {
    return _type.value
  },
}

provide(GRID_CONTEXT_KEY, context)

defineExpose({
  container: computed(() => _container.value?.root ?? null),
  root: computed(() => _root.value?.root ?? null),
  inner: computed(() => _inner.value?.root ?? null),
})
</script>
