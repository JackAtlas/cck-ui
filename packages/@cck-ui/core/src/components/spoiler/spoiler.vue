<template>
  <c-box ref="_root" v-bind="mergedRootAttrs" :id="_id">
    <c-anchor
      ref="_control"
      tag="button"
      type="button"
      v-bind="controlAttrs"
      v-if="spoiler"
      :aria-controls="regionId"
      :aria-expanded="show"
      :aria-label="ariaLabel"
      @click="toggleShow"
    >
      <slot name="hide-label" v-if="show" />
      <slot name="show-label" v-else />
    </c-anchor>
    <c-box
      data-reduce-motion
      role="region"
      v-bind="contentAttrs"
      :id="regionId"
      :style="{
        maxHeight: !show ? rem(props.maxHeight) : contentHeight ? rem(contentHeight) : undefined,
      }"
    >
      <div ref="contentRef">
        <slot />
      </div>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useElementSize, useId, useUncontrolled } from '@cck-ui/hooks'
import { CBox, CStyleProp, rem, useComponentProps, useStyles } from '../../core'
import { SpoilerFactory, SpoilerProps } from './spoiler.types'
import { varsResolver } from './spoiler.utils'
import CAnchor from '../anchor'
import classes from './spoiler.module.css'

defineOptions({
  name: 'CSpoiler',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _control = ref<InstanceType<typeof CAnchor> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const rawProps = defineProps<SpoilerProps>()

const defaultProps = {
  maxHeight: 100,
  defaultExpanded: false,
} satisfies Partial<SpoilerProps>

const props = useComponentProps({
  component: 'CSpoiler',
  defaultProps,
  props: rawProps,
  booleanProps: ['expanded', 'defaultExpanded'],
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
  'defaultExpanded',
  'maxHeight',
  'transitionDuration',
  'id',
  'expanded',
  'onExpandedChange',
  'showAriaLabel',
  'hideAriaLabel',
  'attributes',
]

const getStyles = useStyles<SpoilerFactory>({
  name: 'Spoiler',
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

const _id = useId(props.value.id)
const regionId = `${_id.value}-region`

const [show, setShow] = useUncontrolled<boolean>({
  value: () => props.value.expanded,
  defaultValue: props.value.defaultExpanded,
  finalValue: false,
  onChange: (val) => props.value.onExpandedChange?.(val),
})

const toggleShow = () => {
  setShow(!show.value)
}

const { ref: contentRef, height: contentHeight } = useElementSize()

const hideLabel = slots['hide-label'] || slots['hideLabel']
const showLabel = slots['show-label'] || slots['showLabel']

const spoilerMoreContent = show ? hideLabel?.() : showLabel?.()

const spoiler = computed(() => {
  return spoilerMoreContent !== undefined && (props.value.maxHeight ?? 100) < contentHeight.value
})

const ariaLabel = computed(() =>
  show.value ? props.value.hideAriaLabel : props.value.showAriaLabel
)

const modList = computed(() => [
  {
    'data-has-spoiler': spoiler.value || undefined,
  },
])

const rootAttrs = computed(() => getStyles('root'))
const contentAttrs = computed(() => getStyles('content'))
const controlAttrs = computed(() => getStyles('control'))

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
  control: computed(() => _control.value?.root ?? null),
  content: contentRef,
})
</script>
