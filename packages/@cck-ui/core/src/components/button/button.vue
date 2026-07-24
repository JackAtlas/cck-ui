<template>
  <unstyled-button
    ref="_root"
    v-bind="mergedRootAttrs"
    :disabled="disabled || loading"
    :unstyled="unstyled"
  >
    <c-transition
      v-if="typeof props.loading === 'boolean'"
      :mounted="props.loading"
      :transition="loaderTransition"
      :duration="150"
    >
      <template #default="{ styles }">
        <c-box
          ref="_inner"
          tag="span"
          v-bind="getStyles('loader', { style: styles })"
          aria-hidden="true"
        >
          <c-loader
            color="var(--button-color)"
            size="calc(var(--button-height) / 1.8)"
            v-bind="props.loaderProps"
          ></c-loader>
        </c-box>
      </template>
    </c-transition>

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
      <c-box ref="_label" v-bind="labelAttrs" tag="span" :mod="{ loading }">
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
import { computed, ref, useSlots } from 'vue'
import { CBox, rem, useComponentProps, useStyles } from '../../core'
import { UnstyledButton } from '../unstyled-button'
import { ButtonFactory, type ButtonProps } from './button.types'
import { varsResolver } from './button.utils'
import classes from './button.module.css'
import { CLoader } from '../loader'
import { CTransition, CckTransition } from '../transition'

defineOptions({
  name: 'CButton',
})

defineSlots<{
  'left-section': any
  'right-section': any
  default: any
}>()

const _root = ref<InstanceType<typeof UnstyledButton> | null>(null)
const _inner = ref<HTMLSpanElement | null>(null)
const _label = ref<HTMLSpanElement | null>(null)

const slots = useSlots()

const hasLeftSlot = computed(() => !!slots['left-section'])
const hasRightSlot = computed(() => !!slots['right-section'])

const loaderTransition: CckTransition = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
  out: { opacity: 0, transform: 'translate(-50%, -200%)' },
  common: { transformOrigin: 'center' },
  transitionProperty: 'transform, opacity',
}

const rawProps = defineProps<ButtonProps>()

const props = useComponentProps({
  component: 'CButton',
  defaultProps: {},
  props: rawProps,
})

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
  props: props.value,
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

const modList = computed(() => [
  {
    disabled: props.value.disabled || props.value.dataDisabled,
  },
  { loading: props.value.loading },
  { block: props.value.fullWidth },
  { 'with-left-section': hasLeftSlot.value || !!props.value.leftSection },
  { 'with-right-section': hasRightSlot.value || !!props.value.rightSection },
])

const rootAttrs = computed(() =>
  getStyles('root', {
    active: !props.value.disabled && !props.value.loading && !props.value.dataDisabled,
  })
)
const mergedRootAttrs = computed(() => {
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

const innerAttrs = computed(() => getStyles('inner'))
const sectionAttrs = computed(() => getStyles('section'))
const labelAttrs = computed(() => getStyles('label'))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  inner: _inner.value,
  label: _label.value,
})
</script>
