<template>
  <c-box
    v-bind="mergedAttrs"
    :mod="[
      {
        'data-truncate': getTextTruncate(truncate),
        'data-line-clamp': typeof lineClamp === 'number',
        'data-inline': inline,
        'data-inherit': inherit
      },
      mod
    ]"
    :size="size"
    :tag="span ? 'span' : 'p'"
    :variant="variant"
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
  CBox
} from '@cck-ui/core'

defineOptions({
  name: 'CText'
})

const props = defineProps<TextProps>()

const {
  lineClamp,
  truncate,
  inline,
  inherit,
  gradient,
  span,
  textWrap,
  __staticSelector,
  vars,
  className,
  style,
  classNames,
  styles,
  unstyled,
  variant,
  mod,
  size,
  attributes,
  ...others
} = props

function getTextTruncate(truncate: TextTruncate | undefined) {
  if (truncate === 'start') {
    return 'start'
  }

  if (truncate === 'end' || truncate) {
    return 'end'
  }

  return undefined
}

const varsResolver = createVarsResolver<TextFactory>(
  (theme, { gradient, lineClamp, size, textWrap, variant }) => ({
    root: {
      '--text-fz': getFontSize(size),
      '--text-lh': getLineHeight(size),
      '--text-gradient':
        variant === 'gradient' ? getGradient(gradient, theme) : undefined,
      '--text-line-clamp':
        typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
      '--text-text-wrap': textWrap
    }
  })
)

const getStyles = useStyles<TextFactory>({
  name: ['Text', __staticSelector],
  props,
  classes,
  className,
  style,
  classNames,
  styles,
  unstyled,
  attributes,
  vars,
  varsResolver
})

const rootAttrs = computed(() => getStyles('root', { focusable: true }))

const mergedAttrs = computed(() => ({ ...others, ...rootAttrs.value }))
</script>
