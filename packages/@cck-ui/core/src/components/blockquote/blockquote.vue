<template>
  <c-box ref="_root" tag="blockquote" v-bind="mergedRootAttrs">
    <c-box tag="span" v-bind="iconAttrs" v-if="$slots.icon">
      <slot name="icon"></slot>
    </c-box>
    <slot></slot>
    <c-box tag="cite" v-bind="citeAttrs" v-if="$slots.cite">
      <slot name="cite"></slot>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import classes from './blockquote.module.css'
import { BlockquoteFactory, BlockquoteProps } from './blockquote.types'
import { varsResolver } from './blockquote.utils'

defineOptions({
  name: 'CBlockquote',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _icon = ref<InstanceType<typeof CBox> | null>(null)
const _cite = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<BlockquoteProps>()

const defaultProps = {
  iconSize: 48,
} satisfies Partial<BlockquoteProps>

const props = useComponentProps({
  component: 'CBlockquote',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'textWrap',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<BlockquoteFactory>({
  name: 'Blockquote',
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

const rootAttrs = computed(() => getStyles('root'))
const iconAttrs = computed(() => getStyles('icon'))
const citeAttrs = computed(() => getStyles('cite'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod])]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  icon: computed(() => _icon.value?.root ?? null),
  cite: computed(() => _cite.value?.root ?? null),
})
</script>
