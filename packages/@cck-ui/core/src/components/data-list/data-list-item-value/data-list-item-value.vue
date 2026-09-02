<template>
  <c-box ref="_value" tag="dd" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { DataListItemValueProps } from './data-list-item-value.types'
import { DATA_LIST_CONTEXT_KEY } from '../data-list.constant'

defineOptions({
  name: 'CDataListItemValue',
})

const _value = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<DataListItemValueProps>()

const props = useComponentProps({
  component: 'CDataListItemValue',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'mod']

const dataListContext = inject(DATA_LIST_CONTEXT_KEY)

if (!dataListContext) {
  throw new Error(
    '[@cck-ui/data-list-item-value] CDataListItemValue component should be wrapped inside CDataList component.'
  )
}

const valueAttrs = computed(() => {
  return dataListContext.getStyles('itemValue', {
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
  return { ...others, mod: mergedMod, ...valueAttrs.value }
})

defineExpose({
  root: computed(() => _value.value?.root ?? null),
})
</script>
