<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <component v-for="(child, index) in _children" :key="index" :__index="index" :is="child" />
  </c-box>
</template>

<script setup lang="ts">
import { computed, provide, ref, useAttrs, useSlots } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { TimelineFactory, TimelineProps } from './timeline.types'
import classes from './timeline.module.css'
import { varsResolver } from './timeline.utils'
import { TIMELINE_CONTEXT_KEY } from './timeline.constant'

defineOptions({
  name: 'CTimeline',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<TimelineProps>()

const defaultProps = {
  active: -1,
  align: 'left',
} satisfies Partial<TimelineProps>

const props = useComponentProps({
  component: 'CTimeline',
  defaultProps,
  props: rawProps,
  booleanProps: ['reverseActive', 'autoContrast'],
})

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'active',
  'color',
  'radius',
  'bulletSize',
  'align',
  'lineWidth',
  'reverseActive',
  'mod',
  'autoContrast',
  'attributes',
]

const getStyles = useStyles<TimelineFactory>({
  name: 'Timeline',
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

const _children = slots.default?.() || []
const hasOpposite = computed(() => _children.some((item: any) => item.children?.opposite != null))

provide(TIMELINE_CONTEXT_KEY, {
  getStyles,
  active: () => props.value.active,
  align: () => props.value.align,
  reverseActive: () => props.value.reverseActive,
  total: () => _children.length,
  unstyled: () => props.value.unstyled,
})

const modList = computed(() => [{ align: props.value.align }, { opposite: hasOpposite.value }])

const rootAttrs = computed(() => getStyles('root'))
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod]), ...modList.value]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
