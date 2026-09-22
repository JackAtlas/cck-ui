<template>
  <c-box data-accordion ref="_root" v-bind="rootAttrs" :id="uid" :variant="props.variant">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, h, ref, useAttrs, useSlots } from 'vue'
import { AccordionFactory, AccordionProps } from './accordion.types'
import { CBox, CStyleProp, getSafeId, useComponentProps, useStyles } from '../../core'
import { varsResolver } from './accordion.utils'
import { useId, useUncontrolled } from '@cck-ui/hooks'
import { provideAccordionContext } from './accordion.context'
import AccordionChevron from './accordion-chevron/accordion-chevron.vue'
import classes from './accordion.module.css'

defineOptions({
  name: 'CAccordion',
})

const emit = defineEmits<{
  (e: 'update:value', value: string | string[] | null): void
  (e: 'change', value: string | string[] | null): void
}>()

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()
const slots = useSlots()

const uid = useId()

const rawProps = defineProps<AccordionProps>()

const defaultProps = {
  multiple: false,
  loop: true,
  disableChevronRotation: false,
  disableCollapse: false,
  chevronPosition: 'right',
  variant: 'default',
  chevronSize: 'auto',
  chevronIconSize: 16,
  keepMounted: true,
  keepMountedMode: 'activity',
} satisfies Partial<AccordionProps>

const props = useComponentProps<AccordionProps>({
  component: 'CAccordion',
  defaultProps,
  props: rawProps,
  booleanProps: ['multiple', 'loop', 'disableChevronRotation', 'disableCollapse', 'keepMounted'],
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
  'multiple',
  'value',
  'defaultValue',
  'id',
  'loop',
  'transitionDuration',
  'disableChevronRotation',
  'disableCollpase',
  'chevronPosition',
  'chevronSize',
  'order',
  'variant',
  'radius',
  'chevronIconSize',
  'attributes',
  'keepMounted',
  'keepMountedMod',
]

const getStyles = useStyles<AccordionFactory>({
  name: 'Accordion',
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

const [_value, handleChange] = useUncontrolled({
  value: () => props.value.value,
  defaultValue: props.value.defaultValue,
  finalValue: props.value.multiple ? ([] as any) : null,
  onChange: (val) => {
    emit('update:value', val)
    emit('change', val)
  },
})

const isItemActive = (itemValue: string) =>
  Array.isArray(_value.value) ? _value.value.includes(itemValue) : itemValue === _value.value

const handleItemChange = (itemValue: string) => {
  if (!Array.isArray(_value.value) && props.value.disableCollapse && itemValue === _value.value) {
    return
  }

  const nextValue = Array.isArray(_value.value)
    ? _value.value.includes(itemValue)
      ? _value.value.filter((selectedValue) => selectedValue !== itemValue)
      : [..._value.value, itemValue]
    : itemValue === _value.value
      ? null
      : (itemValue as any)

  handleChange(nextValue)
}

const chevronIcon = slots.chevron?.() ?? h(AccordionChevron, { size: props.value.chevronIconSize })

provideAccordionContext({
  isItemActive,
  onChange: handleItemChange,
  getControlId: getSafeId(
    `${uid.value}-control`,
    'AccordionItem component was rendered with invalid value or without value'
  ),
  getRegionId: getSafeId(
    `${uid.value}-panel`,
    'AccordionItem component was rendered with invalid value or without value'
  ),
  transitionDuration: () => props.value.transitionDuration,
  disableChevronRotation: () => props.value.disableChevronRotation,
  chevron: chevronIcon,
  chevronPosition: () => props.value.chevronPosition,
  order: () => props.value.order,
  loop: () => props.value.loop,
  getStyles,
  variant: () => props.value.variant,
  unstyled: () => props.value.unstyled,
  keepMounted: () => props.value.keepMounted,
  keepMountedMode: () => props.value.keepMountedMode,
})

const rootAttrs = computed(() => {
  const others: Record<string, any> = {}
  for (const key in props.value) {
    if (!knownProps.includes(key)) {
      others[key] = (props.value as any)[key]
    }
  }
  return { ...others, ...getStyles('root') }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
