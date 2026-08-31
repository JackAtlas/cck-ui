<template>
  <c-box ref="_root" v-bind="mergedAttrs" :variant="props.variant">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import classes from './background-image.module.css'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { BackgroundImageFactory, BackgroundImageProps } from './background-image.types'
import { varsResolver } from './background-image.utils'

defineOptions({
  name: 'CBackgroundImage',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<BackgroundImageProps>()

const props = useComponentProps({
  component: 'CBackgroundImage',
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
  'radius',
  'src',
  'variant',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<BackgroundImageFactory>({
  name: 'BackgroundImage',
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

const rootAttrs = computed(() =>
  getStyles('root', { style: { backgroundImage: `url(${props.value.src})` } })
)

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
})
</script>
