<template>
  <c-box v-if="type === 'container' && breakpoints" v-bind="containerAttrs">
    <c-box v-bind="mergedRootAttrs">
      <c-box v-bind="innerAttrs">
        <slot />
      </c-box>
    </c-box>
  </c-box>
  <template v-else>
    <c-box v-bind="mergedRootAttrs">
      <c-box v-bind="innerAttrs">
        <slot />
      </c-box>
    </c-box>
  </template>
</template>

<script setup lang="ts">
import { computed, onUnmounted, provide, ref, watchEffect } from 'vue'
import {
  createVarsResolver,
  isNumberLike,
  responsiveStyleManager,
  useRandomClassName,
  useStyles
} from '@cck-ui/core'
import { useGridCustomStyle } from './grid-custom'
import { DEFAULT_COLUMNS, GRID_CONTEXT_KEY } from './grid.constants'
import { GridContextValue } from './grid.context'
import type { GridFactory, GridProps } from './grid.types'
import classes from './grid.module.css'

defineOptions({
  name: 'CGrid'
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: DEFAULT_COLUMNS,
  gap: 'md'
})

const varsResolver = createVarsResolver(() => ({}))

const {
  classNames,
  className,
  style,
  styles,
  unstyled,
  vars,
  grow,
  gap,
  rowGap,
  columnGap,
  columns,
  align,
  justify,
  breakpoints,
  type,
  attributes,
  ...others
} = props

const getStyles = useStyles<GridFactory>({
  name: 'Grid',
  classes,
  props,
  className,
  style,
  classNames,
  styles,
  unstyled,
  attributes,
  vars,
  varsResolver
})

const responsiveClassname = useRandomClassName()

const rootAttrs = computed(() =>
  getStyles('root', { className: responsiveClassname })
)
const mergedRootAttrs = computed(() => ({ ...others, ...rootAttrs.value }))

const innerAttrs = computed(() => getStyles('inner'))

const containerAttrs = computed(() => getStyles('container'))

const gridStyle = useGridCustomStyle({
  selector: responsiveClassname,
  ...props
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
  } else {
    if (currentStyleKey.value) {
      responsiveStyleManager.unregister(currentStyleKey.value)
      currentStyleKey.value = null
    }
  }
})
onUnmounted(() => {
  if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
  }
})

const _breakpoints = computed(() => props.breakpoints)
const _columns = computed(() => {
  if (!isNumberLike(props.columns)) {
    console.warn(
      `[C-Grid] columns should be number or number-like string, got ${props.columns}. Fallback to default columns ${DEFAULT_COLUMNS}.`
    )
    return DEFAULT_COLUMNS
  }

  return Number(props.columns)
})
const _grow = computed(() => props.grow)
const _type = computed(() => props.type)

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
  }
}

provide(GRID_CONTEXT_KEY, context)
</script>
