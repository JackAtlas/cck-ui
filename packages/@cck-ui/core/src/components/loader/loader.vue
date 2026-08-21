<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <slot v-if="$slots.default" />
    <component
      v-else
      v-bind="componentAttrs"
      :is="props.loaders![props.type!]"
      :variant="variant"
      :size="size"
    ></component>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import type { LoaderProps } from './loader.types'
import { CDefaultLoaders, LoaderFactory } from '.'
import classes from './loader.module.css'
import { varsResolver } from './loader.utils'

defineOptions({
  name: 'CLoader',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<LoaderProps>()

const props = useComponentProps({
  component: 'CLoader',
  defaultProps: {
    loaders: CDefaultLoaders,
    type: 'oval',
  },
  props: rawProps,
})

const knownProps = [
  'color',
  'type',
  'vars',
  'className',
  'style',
  'classNames',
  'styles',
  'unstyled',
  'loaders',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<LoaderFactory>({
  name: 'Loader',
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
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const componentAttrs = computed(() => {
  const { className, mod, ...rest } = mergedAttrs.value
  return rest
})

defineExpose({
  /** @description loader html element */
  root: computed(() => _root.value?.root ?? null),
  /** @description loader size */
  size: props.value.size,
})
</script>
