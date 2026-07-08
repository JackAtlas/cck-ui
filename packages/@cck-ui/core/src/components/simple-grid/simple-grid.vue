<template>
  <c-box v-if="type === 'container'" v-bind="containerAttrs">
    <c-box v-bind="mergedRootAttrs" :data-auto-cols="autoColsAttr">
      <slot />
    </c-box>
  </c-box>
  <template v-else>
    <c-box v-bind="mergedRootAttrs" :data-auto-cols="autoColsAttr">
      <slot />
    </c-box>
  </template>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { CBox, responsiveStyleManager, useRandomClassName, useStyles } from '../../core'
import type { SimpleGridFactory, SimpleGridProps } from './simple-grid.types'
import classes from './simple-grid.module.css'
import { useSimpleGridStyle } from './simple-grid-custom'

defineOptions({
  name: 'CSimpleGrid',
})

const props = withDefaults(defineProps<SimpleGridProps>(), {
  cols: 1,
  spacing: 'md',
  type: 'media',
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'cols',
  'verticalSpacing',
  'spacing',
  'type',
  'minColWidth',
  'autoFlow',
  'autoRows',
  'attributes',
]

const getStyles = useStyles<SimpleGridFactory>({
  name: 'SimpleGrid',
  classes,
  props,
  className: props.className,
  style: props.style,
  classNames: props.classNames,
  styles: props.styles,
  unstyled: props.unstyled,
  attributes: props.attributes,
  vars: props.vars,
})

const responsiveClassname = useRandomClassName()

const autoColsAttr = props.minColWidth !== undefined ? props.autoFlow || 'auto-fill' : undefined

const rootAttrs = computed(() => getStyles('root', { className: responsiveClassname }))
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})

const containerAttrs = computed(() => getStyles('container'))

const gridStyle = useSimpleGridStyle({
  selector: responsiveClassname,
  ...props,
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
</script>
