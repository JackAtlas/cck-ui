<template>
  <c-box
    ref="_root"
    v-bind="mergedRootAttrs"
    :aria-describedby="$slots.default ? bodyId : undefined"
    :aria-labelledby="$slots.title ? titleId : undefined"
    :id="rootId"
    :role="props.role || 'alert'"
    :variant="props.variant"
  >
    <c-box v-bind="wrapperAttrs">
      <c-box v-bind="iconAttrs" v-if="$slots.icon">
        <slot name="icon" />
      </c-box>

      <c-box v-bind="bodyAttrs">
        <c-box
          v-bind="titleAttrs"
          v-if="$slots.title"
          :data-with-close-button="props.withCloseButton || undefined"
        >
          <c-box tag="span" :id="titleId" v-bind="labelAttrs">
            <slot name="title" />
          </c-box>
        </c-box>

        <c-box
          v-bind="messageAttrs"
          v-if="$slots.default"
          :data-variant="props.variant"
          :id="bodyId"
        >
          <slot />
        </c-box>
      </c-box>

      <c-close-button
        v-bind="closeButtonAttrs"
        v-if="props.withCloseButton"
        :aria-label="closeButtonLabel"
        :icon-size="16"
        :size="16"
        :unstyled="props.unstyled"
        variant="transparent"
        @click="props.onClose"
      ></c-close-button>
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useId } from '@cck-ui/hooks'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import classes from './alert.module.css'
import { AlertFactory, type AlertProps } from './alert.types'
import { varsResolver } from './alert.utils'
import CCloseButton from '../close-button'

defineOptions({
  name: 'CAlert',
})

const slots = defineSlots<{
  default: any
  icon: any
  title: any
}>()

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<AlertProps>()

const props = useComponentProps({
  component: 'CAlert',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'style',
  'className',
  'styles',
  'classNames',
  'unstyled',
  'vars',
  'radius',
  'color',
  'id',
  'withCloseButton',
  'onClose',
  'closeButtonLabel',
  'variant',
  'autoContrast',
  'role',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<AlertFactory>({
  name: 'Alert',
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

const rootId = useId(props.value.id).value
const titleId = (slots.title && `${rootId}-title`) || undefined
const bodyId = `${rootId}-body`

const rootAttrs = computed(() => getStyles('root'))
const wrapperAttrs = computed(() => getStyles('wrapper'))
const iconAttrs = computed(() => getStyles('icon'))
const bodyAttrs = computed(() => getStyles('body'))
const titleAttrs = computed(() => getStyles('title'))
const labelAttrs = computed(() => getStyles('label'))
const messageAttrs = computed(() => getStyles('message'))
const closeButtonAttrs = computed(() => getStyles('close-button'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  for (const key in propsValue) {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod])]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
