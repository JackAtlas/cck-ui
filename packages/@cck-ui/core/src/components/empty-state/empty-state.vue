<template>
  <c-box ref="_root" v-bind="mergedRootAttrs" :variant="props.variant">
    <empty-state-indicator v-if="$slots.icon">
      <slot name="icon" />
    </empty-state-indicator>
    <c-box v-bind="bodyAttrs">
      <empty-state-title v-if="$slots.title">
        <slot name="title" />
      </empty-state-title>
      <empty-state-description v-if="$slots.description">
        <slot name="description" />
      </empty-state-description>
      <slot />
      <empty-state-actions v-if="$slots.actions">
        <slot name="actions" />
      </empty-state-actions>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { CBox, useComponentProps, useStyles } from '../../core'
import { EmptyStateFactory, EmptyStateProps } from './empty-state.types'
import classes from './empty-state.module.css'
import { varsResolver } from './empty-state.utils'
import { provideEmptyStateContext } from './empty-state.context'
import EmptyStateActions from './empty-state-actions/empty-state-actions.vue'
import EmptyStateDescription from './empty-state-description/empty-state-description.vue'
import EmptyStateIndicator from './empty-state-indicator/empty-state-indicator.vue'
import EmptyStateTitle from './empty-state-title/empty-state-title.vue'

defineOptions({
  name: 'CEmptyState',
})

defineSlots<{
  actions: any
  default: any
  description: any
  icon: any
  title: any
}>()

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<EmptyStateProps>()

const defaultProps = {
  size: 'md',
  align: 'center',
} satisfies Partial<EmptyStateProps>

const props = useComponentProps({
  component: 'CEmptyState',
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
  'align',
  'variant',
  'color',
  'withIndicatorBackground',
  'mod',
  'attributes',
]

const modList = computed(() => [
  {
    align: props.value.align,
  },
])

const getStyles = useStyles<EmptyStateFactory>({
  name: 'EmptyState',
  classes,
  props: { ...props.value, ...attrs } as EmptyStateProps,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const withIndicatorBackground = computed(
  () => props.value.withIndicatorBackground || !!props.value.variant
)

provideEmptyStateContext({
  getStyles,
  withIndicatorBackground: props.value.withIndicatorBackground || !!props.value.variant,
})

const rootAttrs = computed(() => getStyles('root', { variant: props.value.variant }))
const bodyAttrs = computed(() => getStyles('body'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(modList.value || []),
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
