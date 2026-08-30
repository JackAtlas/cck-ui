<template>
  <c-portal v-bind="portalPropsFinal" :disabled="!props.withinPortal">
    <c-box ref="_root" v-bind="mergedAttrs" :size="props.size">
      <slot />
    </c-box>
  </c-portal>
</template>

<script setup lang="ts">
import cx from 'clsx'
import { computed, ref, useAttrs } from 'vue'
import CPortal from '../portal'
import {
  CBox,
  CBreakpoint,
  CStyleProp,
  getDefaultZIndex,
  useComponentProps,
  useStyles,
} from '../../core'
import { AffixFactory, AffixProps } from './affix.types'
import classes from './affix.module.css'
import { varsResolver } from './affix.utils'

defineOptions({
  name: 'CAffix',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const attrs = useAttrs()

const rawProps = defineProps<AffixProps>()

const defaultProps = {
  position: { bottom: 0, right: 0 },
  zIndex: getDefaultZIndex('modal'),
  withinPortal: true,
} satisfies Partial<AffixProps>

const props = useComponentProps({
  component: 'CAffix',
  defaultProps,
  props: rawProps,
})

const affixSpecificProps = [
  'portalProps',
  'withinPortal',
  'position',
  'zIndex',
  'classNames',
  'styles',
  'unstyled',
  'vars',
  'attributes',
  'size',
]

const styleProps = computed(() => {
  const { style: attrsStyle, ...restAttrs } = attrs
  const combinedStyle = (attrsStyle ?? props.value.style) as CStyleProp
  return {
    ...props.value,
    ...restAttrs,
    style: combinedStyle,
  }
})

const getStyles = useStyles<AffixFactory>({
  name: 'Affix',
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

const rootAttrs = computed(() => getStyles('root'))

const portalPropsFinal = computed(() => ({
  ...props.value.portalProps,
}))

const mergedAttrs = computed(() => {
  const propsValue = props.value

  const others: Record<string, any> = {}
  for (const key in propsValue) {
    if (!affixSpecificProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  }

  const root = rootAttrs.value
  const { className: rootClassName, style: rootStyle, ...restRoot } = root

  const mergedClassName = cx(
    rootClassName,
    propsValue.className,
    attrs.className as string | undefined,
    attrs.class as string | undefined
  )

  const mergedStyle = [rootStyle, propsValue.style, attrs.style].filter(Boolean) as CStyleProp[]
  const finalStyle = mergedStyle.length === 1 ? mergedStyle[0] : mergedStyle

  const userMod = propsValue.mod
  const restMod = 'mod' in restRoot ? restRoot.mod : undefined
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...(Array.isArray(restMod) ? restMod : [restMod].filter(Boolean)),
  ].filter(Boolean)

  const {
    class: attrsClass,
    className: attrsClassName,
    style: attrsStyle,
    mod: attrsMod,
    ...restAttrs
  } = attrs

  const hiddenFrom = (propsValue.hiddenFrom ?? attrs.hiddenFrom) as CBreakpoint | undefined
  const visibleFrom = (propsValue.visibleFrom ?? attrs.visibleFrom) as CBreakpoint | undefined
  const lightHidden = propsValue.lightHidden ?? attrs.lightHidden ?? false
  const darkHidden = propsValue.darkHidden ?? attrs.darkHidden ?? false

  return {
    ...restRoot,
    ...restAttrs,
    ...others,
    className: mergedClassName,
    style: finalStyle,
    mod: mergedMod,
    id: propsValue.id || attrs.id || undefined,
    size: propsValue.size,
    variant: propsValue.variant,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
  }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
