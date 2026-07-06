<template>
  <unstyled-button
    v-bind="mergedRootAttrs"
    :disabled="disabled || loading"
    :unstyled="unstyled"
    :variant="variant"
    :mod="[
      {
        disabled: disabled || dataDisabled,
        loading,
        block: fullWidth,
        'with-left-section': hasLeftSlot || leftSection,
        'with-right-section': hasRightSlot || rightSection,
      },
    ]"
  >
    <c-box tag="span" v-bind="innerAttrs">
      <c-box
        v-if="$slots['left-section']"
        v-bind="sectionAttrs"
        tag="span"
        :mod="{ position: 'left' }"
      >
        <slot name="left-section"></slot>
      </c-box>
      <c-box v-else-if="leftSection" v-bind="sectionAttrs" tag="span" :mod="{ position: 'left' }">
        <component :is="leftSection" />
      </c-box>
      <c-box v-bind="labelAttrs" tag="span" :mod="{ loading }">
        <slot />
      </c-box>
      <c-box
        v-if="$slots['right-section']"
        v-bind="sectionAttrs"
        tag="span"
        :mod="{ position: 'right' }"
      >
        <slot name="right-section"></slot>
      </c-box>
      <c-box v-else-if="rightSection" v-bind="sectionAttrs" tag="span" :mod="{ position: 'right' }">
        <component :is="rightSection" />
      </c-box>
    </c-box>
  </unstyled-button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { CBox, createVarsResolver, getFontSize, getRadius, getSize, useStyles } from '../../core'
import { UnstyledButton } from '../unstyled-button'
import { ButtonFactory, type ButtonProps } from './button.types'
import classes from './button.module.css'

defineOptions({
  name: 'CButton',
})

defineSlots<{
  'left-section': any
  'right-section': any
  default: any
}>()

const slots = useSlots()

const hasLeftSlot = computed(() => !!slots['left-section'])
const hasRightSlot = computed(() => !!slots['right-section'])

const varsResolver = createVarsResolver<ButtonFactory>(
  (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'default',
      autoContrast,
    })

    return {
      root: {
        '--button-justify': justify,
        '--button-height': getSize(size, 'button-height'),
        '--button-padding-x': getSize(size, 'button-padding-x'),
        '--button-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--button-radius': radius === undefined ? undefined : getRadius(radius),
        '--button-bg': color || variant ? colors.background : undefined,
        '--button-hover': color || variant ? colors.hover : undefined,
        '--button-color': colors.color,
        '--button-bd': color || variant ? colors.color : undefined,
        '--button-hover-color': color || variant ? colors.hoverColor : undefined,
      },
    }
  }
)

const props = withDefaults(defineProps<ButtonProps>(), {
  radius: '4px',
  size: 'sm',
  tag: 'button',
  variant: 'default',
})

const {
  style,
  vars,
  className,
  color,
  disabled,
  leftSection,
  rightSection,
  fullWidth,
  variant,
  radius,
  loading,
  loaderProps,
  gradient,
  classNames,
  styles,
  unstyled,
  dataDisabled,
  autoContrast,
  mod,
  attributes,
  ...others
} = props

const getStyles = useStyles<ButtonFactory>({
  name: 'Button',
  props,
  classes,
  className,
  style,
  classNames,
  styles,
  unstyled,
  attributes,
  vars,
  varsResolver,
})

const rootAttrs = computed(() =>
  getStyles('root', { active: !disabled && !loading && !dataDisabled })
)
const mergedRootAttrs = computed(() => ({ ...others, ...rootAttrs.value }))

const innerAttrs = computed(() => getStyles('inner'))
const sectionAttrs = computed(() => getStyles('section'))
const labelAttrs = computed(() => getStyles('label'))
</script>
