<template>
  <c-box v-if="$slots.default" v-bind="mergedAttrs">
    <slot />
  </c-box>
  <c-box v-else v-bind="mergedAttrs" :tag="loaders[type]" :variant="variant" :size="size"></c-box>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createVarsResolver, getSize, getThemeColor, useStyles } from '../../core'
import type { LoaderProps } from './loader.types'
import { useLoader } from './use-loader'
import { CDefaultLoaders, LoaderFactory } from '.'
import classes from './loader.module.css'

defineOptions({
  name: 'CLoader',
})

const props = withDefaults(defineProps<LoaderProps>(), {
  loaders: () => CDefaultLoaders,
  type: 'oval',
})

const knownProps = [
  'size',
  'color',
  'type',
  'vars',
  'className',
  'style',
  'classNames',
  'styles',
  'unstyled',
  'loaders',
  'variant',
  'attributes',
]

const varsResolver = createVarsResolver<LoaderFactory>((theme, { size, color }) => ({
  root: {
    '--loader-size': getSize(size, 'loader-size'),
    '--loader-color': color ? getThemeColor(color, theme) : undefined,
  },
}))

const getStyles = useStyles<LoaderFactory>({
  name: 'Loader',
  props,
  classes,
  className: props.className,
  style: props.style,
  classNames: props.classNames,
  styles: props.styles,
  unstyled: props.unstyled,
  attributes: props.attributes,
  vars: props.vars,
  varsResolver,
})

const rootAttrs = computed(() => getStyles('root'))

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})

const { _ref } = useLoader()

defineExpose({
  /** @description loader html element */
  ref: _ref,
  /** @description loader size */
  size: props.size,
})
</script>
