<template>
  <unstyled-button ref="_root" v-bind="mergedRootAttrs">
    <c-box v-bind="mergedBurgerAttrs">
      <slot />
    </c-box>
  </unstyled-button>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { UnstyledButton } from '../unstyled-button'
import { BurgerFactory, BurgerProps } from './burger.types'
import { varsResolver } from './burger.utils'
import classes from './burger.module.css'

defineOptions({
  name: 'CBurger',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<BurgerProps>()

const props = useComponentProps({
  component: 'CBurger',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'opened',
  'transitionDuration',
  'transitionTimingFunction',
  'lineSize',
  'attributes',
]

const burgerModList = computed(() => ['reduce-motion', { opened: props.value.opened }])

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<BurgerFactory>({
  name: 'Burger',
  classes,
  props: styleProps,
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
const burgerAttrs = computed(() => getStyles('burger'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const mergedBurgerAttrs = computed(() => ({
  mod: burgerModList.value,
  ...burgerAttrs.value,
}))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
