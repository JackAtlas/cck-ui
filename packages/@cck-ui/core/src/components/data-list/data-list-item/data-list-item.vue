<template>
  <c-box ref="_item" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { DataListItemProps } from './data-list-item.types'
import { DATA_LIST_CONTEXT_KEY } from '../data-list.constant'

defineOptions({
  name: 'CDataListItem',
})

const _item = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<DataListItemProps>()

const props = useComponentProps({
  component: 'CDataListItem',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'mod']

const dataListContext = inject(DATA_LIST_CONTEXT_KEY)

if (!dataListContext) {
  throw new Error(
    '[@cck-ui/data-list-item] CDataListItem component should be wrapped inside CDataList component.'
  )
}

const itemAttrs = computed(() => {
  return dataListContext.getStyles('item', {
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
  return { ...others, mod: mergedMod, ...itemAttrs.value }
})

defineExpose({
  root: computed(() => _item.value?.root ?? null),
})
</script>
