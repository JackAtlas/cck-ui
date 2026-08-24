<template>
  <c-box ref="_root" tag="span" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { VisuallyHiddenFactory, VisuallyHiddenProps } from './visually-hidden.types'
import classes from './visually-hidden.module.css'

defineOptions({
  name: 'CVisuallyHidden',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<VisuallyHiddenProps>()

const props = useComponentProps({
  component: 'CVisuallyHidden',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['className', 'style', 'classNames', 'styles', 'unstyled', 'vars', 'attributes']

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<VisuallyHiddenFactory>({
  name: 'VisuallyHidden',
  props: styleProps,
  classes,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
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

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
