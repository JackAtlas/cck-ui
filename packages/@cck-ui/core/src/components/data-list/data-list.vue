<template>
  <c-box ref="_root" tag="dl" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, provide, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import classes from './data-list.module.css'
import { DataListFactory, DataListProps } from './data-list.types'
import { varsResolver } from './data-list.utils'
import { DATA_LIST_CONTEXT_KEY } from './data-list.constant'

defineOptions({
  name: 'CDataList',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<DataListProps>()

const defaultProps = {
  orientation: 'horizontal',
} satisfies Partial<DataListProps>

const props = useComponentProps({
  component: 'CDataList',
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
  'gap',
  'orientation',
  'withDivider',
  'labelWidth',
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<DataListFactory>({
  name: 'DataList',
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

provide(DATA_LIST_CONTEXT_KEY, { getStyles })

const modList = computed(() => [
  { orientation: props.value.orientation },
  { 'with-divider': props.value.withDivider },
])

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
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...modList.value,
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
