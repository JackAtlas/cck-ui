<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { CBox, useComponentProps, useStyles } from '../../core'
import { SkeletonFactory, SkeletonProps } from './skeleton.types'
import classes from './skeleton.module.css'
import { varsResolver } from './skeleton.utils'
import { computed, ref, useAttrs } from 'vue'

defineOptions({
  name: 'CSkeleton',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = withDefaults(defineProps<SkeletonProps>(), {
  animate: true,
  visible: true,
})

const props = useComponentProps({
  component: 'CSkeleton',
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'width',
  'height',
  'circle',
  'visible',
  'radius',
  'animate',
  'mod',
  'attributes',
]

const getStyles = useStyles<SkeletonFactory>({
  name: 'Skeleton',
  classes,
  props: { ...props.value, ...attrs } as SkeletonProps,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const modList = computed(() => [{ visible: props.value.visible }, { animate: props.value.animate }])

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
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
