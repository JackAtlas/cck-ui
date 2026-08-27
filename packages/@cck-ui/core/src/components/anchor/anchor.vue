<template>
  <c-text
    __static-selector="Anchor"
    ref="_root"
    tag="a"
    v-bind="mergedAttrs"
    :class-name="mergedClassName"
    :style="mergedStyle"
    :unstyled="props.unstyled"
  >
    <slot />
  </c-text>
</template>

<script setup lang="ts">
import cx from 'clsx'
import { computed, ref, useAttrs } from 'vue'
import { CStyleProp, useCckTheme, useComponentProps } from '../../core'
import { AnchorProps } from './anchor.types'
import { CText } from '../text'
import classes from './anchor.module.css'

const theme = useCckTheme()

defineOptions({
  name: 'CAnchor',
})

const _root = ref<InstanceType<typeof CText> | null>()

const attrs = useAttrs()

const rawProps = defineProps<AnchorProps>()

const defaultProps = { underline: 'hover' } satisfies Partial<AnchorProps>

const props = useComponentProps({
  component: 'CAnchor',
  defaultProps,
  props: rawProps,
})

const knownProps = ['underline', 'className', 'style', 'unstyled', 'mod']

const modList = computed(() => [
  {
    underline: props.value.underline,
  },
])

const mergedClassName = computed(() =>
  cx(
    {
      [classes.root]: !props.value.unstyled,
    },
    props.value.className
  )
)

function resolveStyleValue(style: any) {
  if (typeof style === 'function') {
    return style(theme.value)
  }
  return style
}

const mergedStyle = computed(() => {
  const styleFromProps = props.value.style
  const styleFromAttrs = attrs.style

  const resolvedPropsStyle = resolveStyleValue(styleFromProps)
  const resolvedAttrsStyle = resolveStyleValue(styleFromAttrs)

  const result = (resolvedAttrsStyle ?? resolvedPropsStyle) as CStyleProp
  return result
})

const mergedAttrs = computed(() => {
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
  return { ...others, mod: mergedMod }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
