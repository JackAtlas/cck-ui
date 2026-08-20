<template>
  <c-box ref="_container" v-if="type === 'container'" v-bind="containerAttrs">
    <c-box ref="_root" v-bind="mergedRootAttrs" :data-auto-cols="autoColsAttr">
      <slot />
    </c-box>
  </c-box>
  <template v-else>
    <c-box ref="_root" v-bind="mergedRootAttrs" :data-auto-cols="autoColsAttr">
      <slot />
    </c-box>
  </template>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, useAttrs, watchEffect } from 'vue'
import {
  CBox,
  CStyleProp,
  responsiveStyleManager,
  useComponentProps,
  useRandomClassName,
  useStyles,
} from '../../core'
import type { SimpleGridFactory, SimpleGridProps } from './simple-grid.types'
import classes from './simple-grid.module.css'
import { useSimpleGridStyle } from './simple-grid-custom'

defineOptions({
  name: 'CSimpleGrid',
})

const _container = ref<InstanceType<typeof CBox> | null>(null)
const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<SimpleGridProps>()

const props = useComponentProps({
  component: 'CSimpleGrid',
  defaultProps: {},
  props: rawProps,
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

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<SimpleGridFactory>({
  name: 'SimpleGrid',
  classes,
  props: styleProps,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
})

const responsiveClassname = useRandomClassName()

const autoColsAttr =
  props.value.minColWidth !== undefined ? props.value.autoFlow || 'auto-fill' : undefined

const rootAttrs = computed(() => getStyles('root', { className: responsiveClassname }))
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, ...rootAttrs.value }
})

const containerAttrs = computed(() => getStyles('container'))

const gridStyle = useSimpleGridStyle({
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

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  container: computed(() => _container.value?.root ?? null),
})
</script>
