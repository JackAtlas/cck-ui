<template>
  <c-box ref="_root" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, useAttrs, watchEffect } from 'vue'
import {
  CBox,
  CStyleProp,
  filterProps,
  hashStyleProps,
  parseStyleProps,
  responsiveStyleManager,
  stylesToString,
  useCckTheme,
  useComponentProps,
  useRandomClassName,
  useStyles,
} from '../../core'
import classes from './flex.module.css'
import { FlexFactory, FlexProps } from './flex.types'
import { FLEX_STYLE_PROPS_DATA } from './flex-props'

defineOptions({
  name: 'CFlex',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<FlexProps>()

const props = useComponentProps({
  component: 'CFlex',
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
  'gap',
  'rowGap',
  'columnGap',
  'align',
  'justify',
  'wrap',
  'direction',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<FlexFactory>({
  name: 'Flex',
  classes,
  props: styleProps,
  className: () => props.value.className,
  style: () => props.value.style,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
})

const theme = useCckTheme()
const randomClassName = useRandomClassName()

const parsedStyleProps = parseStyleProps({
  styleProps: {
    gap: props.value.gap,
    rowGap: props.value.rowGap,
    columnGap: props.value.columnGap,
    align: props.value.align,
    justify: props.value.justify,
    wrap: props.value.wrap,
    direction: props.value.direction,
  },
  theme: theme.value,
  data: FLEX_STYLE_PROPS_DATA,
})

const responsiveClassName = parsedStyleProps.hasResponsiveStyles
  ? hashStyleProps(parsedStyleProps.styles, parsedStyleProps.media)
  : randomClassName

const rootAttrs = computed(() => getStyles('root', { className: responsiveClassName }))

const mergedStyle = computed(() => {
  const rootStyle = rootAttrs.value.style || {}
  const inlineStyles = filterProps(parsedStyleProps.inlineStyles)
  return { ...rootStyle, ...inlineStyles }
})

const mergedAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean))]
  return {
    ...others,
    mod: mergedMod,
    ...rootAttrs.value,
    style: mergedStyle.value,
  }
})

const queryStyles = {
  styles: parsedStyleProps.styles,
  media: parsedStyleProps.media,
  selector: responsiveClassName,
}

const queryStylesString = stylesToString(queryStyles)

const currentStyleKey = ref<string | null>(null)
watchEffect(() => {
  if (queryStylesString) {
    const newKey = responsiveStyleManager.register(queryStylesString)
    if (currentStyleKey.value && currentStyleKey.value !== newKey) {
      responsiveStyleManager.unregister(currentStyleKey.value)
    }
    currentStyleKey.value = newKey
  } else if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
    currentStyleKey.value = null
  }
})
onUnmounted(() => {
  if (currentStyleKey.value) {
    responsiveStyleManager.unregister(currentStyleKey.value)
  }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
