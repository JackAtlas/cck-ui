<template>
  <c-box ref="_root" tag="img" v-bind="mergedAttrs" :src="currentSrc" @error="handleError"></c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { CBox, useComponentProps, useStyles } from '../../core'
import { ImageFactory, ImageProps } from './image.types'
import { varsResolver } from './image.utils'
import classes from './image.module.css'

defineOptions({
  name: 'CImage',
})

const emits = defineEmits<{
  error: [event: Event]
}>()

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ImageProps>()

const props = useComponentProps({
  component: 'CImage',
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
  'src',
  'radius',
  'fit',
  'fallbackSrc',
  'mod',
  'attributes',
]

const getStyles = useStyles<ImageFactory>({
  name: 'Image',
  classes,
  props: { ...props.value, ...attrs } as ImageProps,
  className: props.value.className,
  classNames: props.value.classNames,
  style: props.value.style,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const hasError = ref(!props.value.src)

watch(
  () => props.value.src,
  (newSrc) => {
    hasError.value = !newSrc
  }
)

const currentSrc = computed(() => {
  if (hasError.value && props.value.fallbackSrc) {
    return props.value.fallbackSrc
  }
  return props.value.src
})

const handleError = (event: Event) => {
  emits('error', event)
  hasError.value = true
}

const modList = computed(() => {
  if (hasError.value && props.value.fallbackSrc) {
    return ['fallback']
  }
  return []
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
