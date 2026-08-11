<template>
  <c-box ref="_root" v-bind="mergedAttrs" :tag="props.order ? `h${props.order}` : 'div'">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { EmptyStateTitleProps } from './empty-state-title.types'
import { useEmptyStateContext } from '../empty-state.context'

defineOptions({
  name: 'CEmptyStateTitle',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<EmptyStateTitleProps>()

const props = useComponentProps({
  component: 'CEmptyStateTitle',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'order',
  'mod',
  'attributes',
]

const ctx = useEmptyStateContext()

const rootAttrs = computed(() =>
  ctx.getStyles('title', {
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
