<template>
  <c-box ref="_item" tag="li" v-bind="mergedItemAttrs">
    <c-box ref="_wrapper" v-bind="itemWrapperAttrs">
      <c-box ref="_icon" tag="span" v-bind="itemIconAttrs" v-if="hasIcon">
        <slot name="icon">
          <component v-for="i in listContext.icon" :is="i" :key="i" />
        </slot>
      </c-box>
      <c-box ref="_label" tag="span" v-bind="itemLabelAttrs">
        <slot />
      </c-box>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { ListItemProps } from './list-item.types'
import { LIST_CONTEXT_KEY } from '../list.constant'

defineOptions({
  name: 'CListItem',
})

const _item = ref<InstanceType<typeof CBox> | null>(null)
const _wrapper = ref<InstanceType<typeof CBox> | null>(null)
const _icon = ref<InstanceType<typeof CBox> | null>(null)
const _label = ref<InstanceType<typeof CBox> | null>(null)

const slots = useSlots()

const rawProps = defineProps<ListItemProps>()

const props = useComponentProps({
  component: 'CListItem',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'mod']

const listContext = inject(LIST_CONTEXT_KEY)

if (!listContext) {
  throw new Error(
    '[@cck-ui/list-item] CListItem component should be wrapped inside CList component.'
  )
}

const hasIcon = computed(() => {
  const iconSlot = slots.icon?.()
  return (iconSlot && iconSlot.length > 0) || !!listContext.icon
})

const itemAttrs = computed(() =>
  listContext.getStyles('item', {
    className: props.value.className,
    style: props.value.style,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
const itemModList = computed(() => [
  { 'with-icon': hasIcon.value },
  { centered: listContext.center },
])
const mergedItemAttrs = computed(() => {
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
    ...itemModList.value,
  ]
  return { ...others, mod: mergedMod, ...itemAttrs.value }
})

const itemWrapperAttrs = computed(() =>
  listContext.getStyles('itemWrapper', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemIconAttrs = computed(() =>
  listContext.getStyles('itemIcon', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemLabelAttrs = computed(() =>
  listContext.getStyles('itemLabel', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

defineExpose({
  item: computed(() => _item.value?.root ?? null),
  wrapper: computed(() => _wrapper.value?.root ?? null),
  icon: computed(() => _icon.value?.root ?? null),
  label: computed(() => _label.value?.root ?? null),
})
</script>
