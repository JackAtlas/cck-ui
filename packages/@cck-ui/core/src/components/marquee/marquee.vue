<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <c-box v-bind="contentAttrs">
      <c-box v-bind="groupAttrs" v-for="(_, index) in Array(props.repeat).fill(0)" :key="index">
        <slot />
      </c-box>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import classes from './marquee.module.css'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { MarqueeFactory, MarqueeProps } from './marquee.types'
import { varsResolver } from './marquee.utils'

defineOptions({
  name: 'CMarquee',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<MarqueeProps>()

const defaultProps = {
  repeat: 4,
  duration: 100_000,
  orientation: 'horizontal',
  fadeEdges: true,
} satisfies Partial<MarqueeProps>

const props = useComponentProps<MarqueeProps>({
  component: 'CMarquee',
  defaultProps,
  props: rawProps,
  booleanProps: ['reverse', 'pauseOnHover', 'fadeEdges'],
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'reverse',
  'pauseOnHover',
  'orientation',
  'repeat',
  'duration',
  'gap',
  'fadeEdges',
  'fadeEdgeColor',
  'fadeEdgeSize',
  'mod',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const modList = computed(() => [
  { orientation: props.value.orientation },
  { reverse: props.value.reverse },
  { pauseOnHover: props.value.pauseOnHover },
  { 'fade-edges': props.value.fadeEdges },
])

const getStyles = useStyles<MarqueeFactory>({
  name: 'Marquee',
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

const contentAttrs = computed(() => getStyles('content'))
const groupAttrs = computed(() => getStyles('group'))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
