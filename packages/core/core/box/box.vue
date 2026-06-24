<template>
  <component :is="tag" v-bind="_props">
    <slot />
  </component>
</template>

<script setup lang="ts">
import cx from 'clsx'
import { inject, watch } from 'vue'
import { isNumberLike } from '../utils'
import type { BoxComponentProps } from './box.types'
import { DEFAULT_THEME, THEME_KEY } from '../config-provider'
import {
  extractStyleProps,
  parseStyleProps,
  STYLE_PROPS_DATA
} from './style-props'
import { getBoxStyle } from './get-box-style/get-box-style'
import { ref } from 'vue'
import {
  hashStyleProps,
  responsiveStyleManager,
  StylesMediaQuery,
  stylesToString
} from '../responsive-style-manager'
import { computed } from 'vue'
import { onBeforeUnmount } from 'vue'
import { getBoxMod } from './get-box-mod/get-box-mod'

defineOptions({
  name: 'CBox'
})

const props = withDefaults(
  defineProps<BoxComponentProps & { className: string; tag?: any }>(),
  {
    tag: 'div'
  }
)

const {
  __size,
  __vars,
  className,
  darkHidden,
  hiddenFrom,
  lightHidden,
  mod,
  size,
  style,
  tag,
  variant,
  visibleFrom,
  ...others
} = props

const theme = inject(THEME_KEY, DEFAULT_THEME)
const { styleProps, rest } = extractStyleProps(others)
const parsedStyleProps = computed(() =>
  parseStyleProps({
    styleProps,
    theme,
    data: STYLE_PROPS_DATA
  })
)

const hasResponsive = computed(() => parsedStyleProps.value.hasResponsiveStyles)
const responsiveClassName = ref<string | null>(null)
let currentStyleKey: string | null = null

function buildMediaQueriesFromObject(
  mediaObj: Record<string, any> | undefined
): StylesMediaQuery[] {
  if (!mediaObj) return []
  return Object.entries(mediaObj).map(([query, styles]) => ({
    query,
    styles
  }))
}

function updateResponsiveStyles() {
  if (currentStyleKey) {
    responsiveStyleManager.unregister(currentStyleKey)
    currentStyleKey = null
    responsiveClassName.value = null
  }

  if (!hasResponsive) return

  const mediaArray = buildMediaQueriesFromObject(parsedStyleProps.value.media)
  const hash = hashStyleProps(parsedStyleProps.value.styles, mediaArray)
  const className = hash

  const cssText = stylesToString({
    selector: className,
    styles: parsedStyleProps.value.styles,
    media: mediaArray
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

const _props = {
  style: getBoxStyle({
    theme,
    style,
    vars: __vars,
    styleProps: parsedStyleProps.value.inlineStyles
  }),
  className: cx(className, responsiveClassName.value, {
    'c-light-hidden': lightHidden,
    'c-dark-hidden': darkHidden,
    [`c-hidden-from-${hiddenFrom}`]: hiddenFrom,
    [`c-visible-from-${visibleFrom}`]: visibleFrom
  }),
  'data-variant': variant,
  'data-size': isNumberLike(size) ? undefined : size || undefined,
  size: __size,
  ...getBoxMod(mod),
  ...rest
}
</script>
