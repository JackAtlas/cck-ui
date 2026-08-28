<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <template v-for="(item, idx) in items" :key="item.key ?? idx">
      <component :is="item" />
    </template>
  </c-box>
</template>

<script setup lang="ts">
import { computed, h, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { BreadcrumbsFactory, BreadcrumbsProps, SeparatorRenderer } from './breadcrumbs.types'
import classes from './breadcrumbs.module.css'
import { varsResolver } from './breadcrumbs.utils'
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children'
import clsx from 'clsx'

defineOptions({
  name: 'CBreadcrumbs',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const defaultProps = {
  separator: '/',
} satisfies Partial<BreadcrumbsProps>

const rawProps = defineProps<BreadcrumbsProps>()

const props = useComponentProps({
  component: 'CBreadcrumbs',
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
  'separator',
  'separatorMargin',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<BreadcrumbsFactory>({
  name: 'Breadcrumbs',
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

const mergedRootAttrs = computed(() => {
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

const items = computed(() => {
  const children = filterFalsyChildren(slots.default?.())
  const separatorSlot = slots.separator
  const result: any[] = []

  children.forEach((child, index) => {
    const childProps = child.props || {}
    const breadcrumbStyles = getStyles('breadcrumb', {
      className: childProps.className,
    })
    const { className: bcClass, style: bcStyle, ...rest } = breadcrumbStyles

    const mergedClass = clsx(bcClass, childProps.class, childProps.className)

    const mergedStyle = [bcStyle, childProps.style].filter(Boolean)

    const breadcrumbNode = h(
      child,
      { ...rest, class: mergedClass, style: mergedStyle, key: child.key ?? `breadcrumb-${index}` },
      child.children ?? []
    )
    result.push(breadcrumbNode)

    if (index !== children.length - 1) {
      const separatorStyles = getStyles('separator')
      const { className: sepClass, style: sepStyle, ...sepRest } = separatorStyles

      let separatorContent
      if (separatorSlot) {
        separatorContent = separatorSlot()
      } else if (typeof props.value.separator === 'function') {
        separatorContent = (props.value.separator as SeparatorRenderer)(
          child,
          index,
          children.length
        )
      } else {
        separatorContent = props.value.separator
      }

      const separatorNode = h(
        CBox,
        { ...sepRest, class: sepClass, style: sepStyle, key: `separator-${index}` } as any,
        { default: () => separatorContent }
      )
      result.push(separatorNode)
    }
  })
  return result
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
