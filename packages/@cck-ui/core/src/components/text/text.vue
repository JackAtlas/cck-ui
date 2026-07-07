<template>
  <c-box
    v-bind="mergedAttrs"
    :mod="modList"
    :size="props.size"
    :tag="props.span ? 'span' : 'p'"
    :variant="props.variant"
  >
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextFactory, TextProps, TextTruncate } from './text.types.ts'
import classes from './text.module.css'
import {
  createVarsResolver,
  getFontSize,
  getGradient,
  getLineHeight,
  useStyles,
  CBox,
} from '../../core'

defineOptions({
  name: 'CText',
})

const props = defineProps<TextProps>()

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
    'data-truncate': getTextTruncate(props.truncate),
    'data-line-clamp': typeof props.lineClamp === 'number',
    'data-inline': props.inline,
    'data-inherit': props.inherit,
  },
  props.mod,
])

const varsResolver = createVarsResolver<TextFactory>(
  (theme, { gradient, lineClamp, size, textWrap, variant }) => ({
    root: {
      '--text-fz': getFontSize(size),
      '--text-lh': getLineHeight(size),
      '--text-gradient': variant === 'gradient' ? getGradient(gradient, theme) : undefined,
      '--text-line-clamp': typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
      '--text-text-wrap': textWrap,
    },
  })
)

const getStyles = useStyles<TextFactory>({
  name: ['Text', props.__staticSelector],
  props,
  classes,
  className: props.className,
  style: props.style,
  classNames: props.classNames,
  styles: props.styles,
  unstyled: props.unstyled,
  attributes: props.attributes,
  vars: props.vars,
  varsResolver,
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})
</script>
