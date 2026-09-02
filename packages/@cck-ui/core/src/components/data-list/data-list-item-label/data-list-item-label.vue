<template>
  <c-box ref="_label" tag="dt" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { DataListItemLabelProps } from './data-list-item-label.types'
import { DATA_LIST_CONTEXT_KEY } from '../data-list.constant'

defineOptions({
  name: 'CDataListItemLabel',
})

const _label = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<DataListItemLabelProps>()

const props = useComponentProps({
  component: 'CDataListItemLabel',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'mod']

const dataListContext = inject(DATA_LIST_CONTEXT_KEY)

if (!dataListContext) {
  throw new Error(
    '[@cck-ui/data-list-item-label] CDataListItemLabel component should be wrapped inside CDataList component.'
  )
}

const labelAttrs = computed(() => {
  return dataListContext.getStyles('itemLabel', {
    className: () => props.value.className,
    style: props.value.style,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
})

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
  return { ...others, mod: mergedMod, ...labelAttrs.value }
})

defineExpose({
  root: computed(() => _label.value?.root ?? null),
})
</script>
