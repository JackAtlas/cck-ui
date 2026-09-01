<template>
  <c-box ref="_section" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { CBox, useComponentProps } from '../../../core'
import { CardSectionProps } from './card-section.types'
import { CARD_CONTEXT_KEY } from '../card.constant'

defineOptions({
  name: 'CCardSection',
})

const _section = ref<InstanceType<typeof CBox> | null>(null)

const rawProps = defineProps<CardSectionProps>()

const props = useComponentProps({
  component: 'CCardSection',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'withBorder',
  'inheritPadding',
  'mod',
]

const cardContext = inject(CARD_CONTEXT_KEY)

if (!cardContext) {
  throw new Error(
    '[@cck-ui/card-section] CCardSection component should be wrapped inside CCard component.'
  )
}

const modList = computed(() => [
  { 'with-border': props.value.withBorder },
  { 'inherit-padding': props.value.inheritPadding },
])

const sectionAttrs = computed(() => {
  return cardContext.getStyles('section', {
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
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...modList.value,
  ]
  return { ...others, mod: mergedMod, ...sectionAttrs.value }
})

defineExpose({
  root: computed(() => _section.value?.root ?? null),
})
</script>
