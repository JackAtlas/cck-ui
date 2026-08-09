<template>
  <component ref="_root" :is="rootTag" v-bind="_props">
    <slot />
  </component>
</template>

<script setup lang="ts">
import cx from 'clsx'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { isNumberLike } from '../utils'
import type { BoxComponentProps } from './box.types'
import { useCckTheme } from '../config-provider'
import { extractStyleProps, parseStyleProps, STYLE_PROPS_DATA } from './style-props'
import { getBoxStyle } from './get-box-style/get-box-style'
import {
  hashStyleProps,
  responsiveStyleManager,
  StylesMediaQuery,
  stylesToString,
} from '../responsive-style-manager'
import { getBoxMod } from './get-box-mod/get-box-mod'

defineOptions({
  name: 'CBox',
})

const _root = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<
    BoxComponentProps & {
      className: string
      renderRoot?: (props: Record<string, any>) => any
      tag?: any
    }
  >(),
  {
    tag: 'div',
  }
)

const theme = useCckTheme()

const parsedStyleProps = computed(() => {
  const { styleProps, rest } = extractStyleProps(props)
  return {
    ...parseStyleProps({
      styleProps,
      theme: theme.value,
      data: STYLE_PROPS_DATA,
    }),
    rest,
  }
})

const hasResponsive = computed(() => parsedStyleProps.value.hasResponsiveStyles)
const responsiveClassName = ref<string | null>(null)
let currentStyleKey: string | null = null

function updateResponsiveStyles() {
  if (currentStyleKey) {
    responsiveStyleManager.unregister(currentStyleKey)
    currentStyleKey = null
    responsiveClassName.value = null
  }

  if (!hasResponsive) {
    return
  }

  const mediaArray = parsedStyleProps.value.media || []
  const hash = hashStyleProps(parsedStyleProps.value.styles, mediaArray)
  const className = hash

  const cssText = stylesToString({
    selector: className,
    styles: parsedStyleProps.value.styles,
    media: mediaArray,
  })

  const registeredKey = responsiveStyleManager.register(cssText, className)
  currentStyleKey = registeredKey
  responsiveClassName.value = className
}

updateResponsiveStyles()

watch(
  () => [parsedStyleProps.value.styles, parsedStyleProps.value.media],
  () => {
    updateResponsiveStyles()
  },
  { deep: true, immediate: false }
)

onBeforeUnmount(() => {
  if (currentStyleKey) {
    responsiveStyleManager.unregister(currentStyleKey)
  }
})

const _props = computed(() => {
  const { rest, inlineStyles } = parsedStyleProps.value

  const finalStyle = getBoxStyle({
    theme: theme.value,
    style: props.style,
    vars: props.__vars,
    styleProps: inlineStyles,
  })

  const finalClassName = cx(props.className, responsiveClassName.value, {
    'c-light-hidden': props.lightHidden,
    'c-dark-hidden': props.darkHidden,
    [`c-hidden-from-${props.hiddenFrom}`]: props.hiddenFrom,
    [`c-visible-from-${props.visibleFrom}`]: props.visibleFrom,
  })

  const {
    tag,
    style,
    __vars,
    className,
    variant,
    mod,
    size,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    __size,
    ...restProps
  } = rest || {}

  return {
    ...restProps,
    style: finalStyle,
    className: finalClassName,
    'data-variant': props.variant,
    'data-size': isNumberLike(props.size) ? undefined : props.size || undefined,
    size: props.__size,
    ...getBoxMod(props.mod),
  }
})

const rootTag = computed(() => {
  if (props.renderRoot) {
    return (p: Record<string, any>) => p.renderRoot(p)
  }

  return props.tag
})

defineExpose({
  root: _root,
})
</script>
