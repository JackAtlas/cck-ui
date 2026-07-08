<template>
  <unstyled-button
    v-bind="mergedRootAttrs"
    :disabled="disabled || loading"
    :unstyled="unstyled"
    :mod="modList"
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
        <!-- TODO -->
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
        <!-- TODO -->
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
        '--button-bd': color || variant ? colors.border : undefined,
        '--button-hover-color': color || variant ? colors.hoverColor : undefined,
      },
    }
  }
)

const props = defineProps<ButtonProps>()

const knownProps = [
  'style',
  'vars',
  'className',
  'color',
  'disabled',
  'leftSection',
  'rightSection',
  'fullWidth',
  'radius',
  'loading',
  'loaderProps',
  'gradient',
  'classNames',
  'styles',
  'unstyled',
  'dataDisabled',
  'autoContrast',
  'mod',
  'attributes',
]

const getStyles = useStyles<ButtonFactory>({
  name: 'Button',
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

const rootAttrs = computed(() =>
  getStyles('root', { active: !props.disabled && !props.loading && !props.dataDisabled })
)
const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props) {
    if (!knownProps.includes(key)) {
      others[key] = props[key as keyof typeof props]
    }
  }
  return { ...others, ...rootAttrs.value }
})

const innerAttrs = computed(() => getStyles('inner'))
const sectionAttrs = computed(() => getStyles('section'))
const labelAttrs = computed(() => getStyles('label'))

const modList = computed(() => [
  {
    disabled: props.disabled || props.dataDisabled,
    loading: props.loading,
    block: props.fullWidth,
    'with-left-section': hasLeftSlot.value || !!props.leftSection,
    'with-right-section': hasRightSlot.value || !!props.rightSection,
  },
])
</script>
