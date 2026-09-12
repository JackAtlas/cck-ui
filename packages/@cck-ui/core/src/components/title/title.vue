<template>
  <c-box
    ref="_root"
    v-bind="mergedAttrs"
    v-if="[1, 2, 3, 4, 5, 6].includes(props.order!)"
    :size="props.size"
    :tag="`h${props.order}`"
    :variant="props.variant"
  >
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import classes from './title.module.css'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { TitleFactory, TitleProps } from './title.types'
import { varsResolver } from './title.utils'

defineOptions({
  name: 'CTitle',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<TitleProps>()

const defaultProps = {
  order: 1,
} satisfies Partial<TitleProps>

const props = useComponentProps({
  component: 'CTitle',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'order',
  'vars',
  'size',
  'variant',
  'lineClamp',
  'textWrap',
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const modList = computed(() => [
  { order: props.value.order },
  { 'data-line-clamp': typeof props.value.lineClamp === 'number' },
])

const getStyles = useStyles<TitleFactory>({
  name: 'Title',
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
