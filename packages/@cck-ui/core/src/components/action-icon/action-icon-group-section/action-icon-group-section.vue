<template>
  <c-box ref="_section" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../../core'
import classes from '../action-icon.module.css'
import {
  ActionIconGroupSectionFactory,
  ActionIconGroupSectionProps,
} from './action-icon-group-section.types'
import { varsResolver } from './action-icon-group-section.utils'

defineOptions({
  name: 'CActionIconGroupSection',
})

const _section = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ActionIconGroupSectionProps>()

const props = useComponentProps({
  component: 'CActionIconGroupSection',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'className',
  'style',
  'classNames',
  'styles',
  'unstyled',
  'vars',
  'gradient',
  'radius',
  'autoContrast',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<ActionIconGroupSectionFactory>({
  name: 'ActionIconGroupSection',
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
  rootSelector: 'groupSection',
})

const sectionAttrs = computed(() => getStyles('groupSection'))
const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...sectionAttrs.value }
})

defineExpose({
  section: computed(() => _section.value?.root ?? null),
})
</script>
