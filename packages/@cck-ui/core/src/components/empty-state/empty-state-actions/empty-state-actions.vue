<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { EmptyStateActionsProps } from './empty-state-actions.types'
import { useEmptyStateContext } from '../empty-state.context'

defineOptions({
  name: 'CEmptyStateActions',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<EmptyStateActionsProps>()

const props = useComponentProps({
  component: 'CEmptyStateActions',
  defaultProps: {},
  props: rawProps,
})

const knownProps = ['classNames', 'className', 'style', 'styles', 'vars', 'mod', 'attributes']

const ctx = useEmptyStateContext()

const rootAttrs = computed(() =>
  ctx.getStyles('actions', {
    className: props.value.className,
    style: props.value.style,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
