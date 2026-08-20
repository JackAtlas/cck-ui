<template>
  <c-box
    ref="_root"
    v-bind="mergedAttrs"
    :size="props.size"
    :tag="props.span ? 'span' : 'p'"
    :variant="props.variant"
  >
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { TextFactory, TextProps, TextTruncate } from './text.types.ts'
import classes from './text.module.css'
import { useStyles, CBox, useComponentProps, CStyleProp } from '../../core'
import { varsResolver } from './text.utils.js'

defineOptions({
  name: 'CText',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<TextProps>()

const props = useComponentProps({
  component: 'CText',
  defaultProps: {},
  props: rawProps,
})

function getTextTruncate(truncate: TextTruncate | undefined) {
  if (truncate === 'start') {
    return 'start'
  }

  if (truncate === 'end' || truncate) {
    return 'end'
  }

  return undefined
}

const knownProps = [
  'lineClamp',
  'truncate',
  'inline',
  'inherit',
  'gradient',
  'span',
  'textWrap',
  '__staticSelector',
  'vars',
  'className',
  'style',
  'classNames',
  'styles',
  'unstyled',
  'variant',
  'mod',
  'size',
  'attributes',
]

const modList = computed(() => [
  {
    'data-truncate': getTextTruncate(props.value.truncate),
    'data-line-clamp': typeof props.value.lineClamp === 'number',
    'data-inline': props.value.inline,
    'data-inherit': props.value.inherit,
  },
])

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<TextFactory>({
  name: ['Text', props.value.__staticSelector],
  props: styleProps,
  classes,
  className: props.value.className,
  style: props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))

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
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
