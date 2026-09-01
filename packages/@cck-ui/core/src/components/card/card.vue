<template>
  <c-paper
    ref="_root"
    v-bind="mergedAttrs"
    :data-orientation="props.orientation"
    :unstyled="props.unstyled"
  >
    <template v-for="(item, idx) in processedChildren" :key="item.key ?? idx">
      <component :is="item" />
    </template>
  </c-paper>
</template>

<script setup lang="ts">
import { computed, h, provide, ref, useAttrs, useSlots } from 'vue'
import CPaper from '../paper/paper.vue'
import { CardFactory, CardProps } from './card.types'
import { CStyleProp, filterFalsyChildren, useComponentProps, useStyles } from '../../core'
import { varsResolver } from './card.utils'
import classes from './card.module.css'
import { CARD_CONTEXT_KEY } from './card.constant.js'

defineOptions({
  name: 'CCard',
})

const _root = ref<InstanceType<typeof CPaper> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<CardProps>()

const defaultProps = {
  orientation: 'vertical',
} satisfies Partial<CardProps>

const props = useComponentProps({
  component: 'CCard',
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
  'padding',
  'attributes',
  'orientation',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<CardFactory>({
  name: 'Card',
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

provide(CARD_CONTEXT_KEY, { getStyles })

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

function isCardSection(vnode: any) {
  if (!vnode || !vnode.type) {
    return false
  }
  const type = vnode.type
  if (typeof type === 'object' && 'name' in type) {
    return type.name === 'CCardSection'
  }
  return false
}

const processedChildren = computed(() => {
  const children = filterFalsyChildren(slots.default?.())
  const orientation = props.value.orientation
  const total = children.length

  return children.map((child, index) => {
    if (isCardSection(child)) {
      return h(child, {
        ...child.props,
        'data-orientation': orientation,
        'data-first-section': index === 0 ? true : undefined,
        'data-last-section': index === total - 1 ? true : undefined,
      })
    }
    return child
  })
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
