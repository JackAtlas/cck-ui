<template>
  <c-box v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CBox, createVarsResolver, getFontSize, getRadius, getSize, useStyles } from '../../../core'
import type {
  ButtonGroupSectionFactory,
  ButtonGroupSectionProps,
} from './button-group-section.types'
import classes from '../button.module.css'

defineOptions({
  name: 'CButtonGroupSection',
})

const varsResolver = createVarsResolver<ButtonGroupSectionFactory>(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'default',
      autoContrast,
    })

    return {
      groupSection: {
        '--section-height': getSize(size, 'section-height'),
        '--section-padding-x': getSize(size, 'section-padding-x'),
        '--section-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--section-radius': radius === undefined ? undefined : getRadius(radius),
        '--section-bg': color || variant ? colors.background : undefined,
        '--section-color': colors.color,
        '--section-bd': color || variant ? colors.border : undefined,
      },
    }
  }
)

const props = withDefaults(defineProps<ButtonGroupSectionProps>(), {
  variant: 'default',
})

const {
  className,
  style,
  classNames,
  styles,
  unstyled,
  vars,
  gradient,
  radius,
  autoContrast,
  attributes,
  ...others
} = props

const getStyles = useStyles<ButtonGroupSectionFactory>({
  name: 'ButtonGroupSection',
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
  rootSelector: 'groupSection',
})

const sectionAttrs = computed(() => getStyles('groupSection'))
const mergedAttrs = computed(() => ({ ...others, ...sectionAttrs.value }))
</script>
