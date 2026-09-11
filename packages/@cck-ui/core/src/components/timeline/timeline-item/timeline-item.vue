<template>
  <c-box ref="_item" v-bind="mergedItemAttrs">
    <c-box v-bind="itemBodyAttrs" v-if="bodyFirst">
      <c-box v-bind="itemTitleAttrs" v-if="$slots.title">
        <slot name="title" />
      </c-box>
      <c-box v-bind="itemContentAttrs">
        <slot />
      </c-box>
    </c-box>
    <template v-else>
      <c-box v-bind="itemOppositeAttrs" v-if="$slots.opposite">
        <slot name="opposite" />
      </c-box>
    </template>

    <c-box v-bind="itemBulletAttrs" :mod="itemBulletModList">
      <slot name="bullet" />
    </c-box>

    <template v-if="bodyFirst">
      <c-box v-bind="itemOppositeAttrs" v-if="$slots.opposite">
        <slot name="opposite" />
      </c-box>
    </template>
    <c-box v-bind="itemBodyAttrs" v-else>
      <c-box v-bind="itemTitleAttrs" v-if="$slots.title">
        <slot name="title" />
      </c-box>
      <c-box v-bind="itemContentAttrs">
        <slot />
      </c-box>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref, toValue, useSlots } from 'vue'
import { TIMELINE_CONTEXT_KEY } from '../timeline.constant'
import { TimelineItemProps } from './timeline-item.types'
import { CBox, getRadius, getThemeColor, useCckTheme, useComponentProps } from '../../../core'

defineOptions({
  name: 'CTimelineItem',
})

const _item = ref<InstanceType<typeof CBox> | null>(null)

const slots = useSlots()

const theme = useCckTheme()

const rawProps = defineProps<TimelineItemProps>()

const props = useComponentProps({
  component: 'CCol',
  defaultProps: {
    __index: 0,
  },
  props: rawProps,
  booleanProps: ['alternate'],
})

const timelineContext = inject(TIMELINE_CONTEXT_KEY)

if (!timelineContext) {
  throw new Error(
    '[@cck-ui/timeline-item] CTimelineItem component should be wrapped inside CTimeline component.'
  )
}

const knownProps = [
  '__index',
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'bullet',
  'opposite',
  'alternate',
  'radius',
  'color',
  'lineVariant',
  'title',
  'mod',
]

const __align = computed(() => toValue(timelineContext.align) || 'left')

const __active = computed(() => {
  const reverseActive = toValue(timelineContext.reverseActive)
  const active = toValue(timelineContext.active) || -1
  const total = toValue(timelineContext.total) || 0
  const index = props.value.__index || 0

  return reverseActive ? active >= total - index - 1 : active >= index
})

const __lineActive = computed(() => {
  const reverseActive = toValue(timelineContext.reverseActive)
  const active = toValue(timelineContext.active) || -1
  const total = toValue(timelineContext.total) || 0
  const index = props.value.__index || 0

  return reverseActive ? active >= total - index - 1 : active - 1 >= index
})

const bodyFirst = computed(
  () =>
    (__align.value === 'left' && !!props.value.alternate) ||
    (__align.value === 'right' && !props.value.alternate)
)

const itemAttrs = computed(() => {
  return timelineContext.getStyles('item', {
    className: props.value.className,
    style: props.value.style,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
})
const itemModList = computed(() => [
  { active: __active.value },
  { alternate: props.value.alternate },
  { 'line-active': __lineActive.value },
])
const mergedItemAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod]), ...itemModList.value]
  const __vars = {
    '--tli-border-style': propsValue.lineVariant || undefined,
    '--tli-color': propsValue.color ? getThemeColor(propsValue.color, theme.value) : undefined,
    '--tli-radius': propsValue.radius !== undefined ? getRadius(propsValue.radius) : undefined,
  }
  return { ...others, mod: mergedMod, __vars, ...itemAttrs.value }
})

const itemOppositeAttrs = computed(() =>
  timelineContext.getStyles('itemOpposite', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemBodyAttrs = computed(() =>
  timelineContext.getStyles('itemBody', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemTitleAttrs = computed(() =>
  timelineContext.getStyles('itemTitle', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemContentAttrs = computed(() =>
  timelineContext.getStyles('itemContent', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

const itemBulletAttrs = computed(() =>
  timelineContext.getStyles('itemBullet', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)
const itemBulletModList = computed(() => [
  { 'with-child': !!slots.bullet?.() },
  { active: __active.value },
  { align: __align.value },
])

defineExpose({
  item: computed(() => _item.value?.root ?? null),
})
</script>
