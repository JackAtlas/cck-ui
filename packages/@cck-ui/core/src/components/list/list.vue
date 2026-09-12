<template>
  <c-box ref="_root" v-bind="mergedRootAttrs" :tag="props.type === 'unordered' ? 'ul' : 'ol'">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, provide, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import classes from './list.module.css'
import { ListFactory, ListProps } from './list.types'
import { varsResolver } from './list.utils'
import { LIST_CONTEXT_KEY } from './list.constant'

defineOptions({
  name: 'CList',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<ListProps>()

const defaultProps = {
  type: 'unordered',
} satisfies Partial<ListProps>

const props = useComponentProps({
  component: 'CList',
  defaultProps,
  props: rawProps,
  booleanProps: ['withPadding', 'center', 'reversed'],
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'type',
  'withPadding',
  'spacing',
  'center',
  'listStyleType',
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<ListFactory>({
  name: 'List',
  classes,
  props: styleProps,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

provide(LIST_CONTEXT_KEY, {
  getStyles,
  center: props.value.center,
  icon: slots.icon?.() || undefined,
})

const hasIcon = computed(() => {
  const result = slots.icon?.()
  return result && result.length > 0
})

const rootAttrs = computed(() =>
  getStyles('root', { style: { listStyleType: props.value.listStyleType } })
)
const rootModList = computed(() => [
  { 'with-padding': props.value.withPadding },
  { type: hasIcon.value ? 'none' : props.value.listStyleType },
])
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...rootModList.value,
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
