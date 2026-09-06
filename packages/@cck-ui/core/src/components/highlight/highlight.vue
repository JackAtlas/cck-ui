<template>
  <c-text
    __static-selector="Highlight"
    ref="_root"
    v-bind="mergedAttrs"
    :style="resolvedStyle"
    :unstyled="props.unstyled"
  >
    <template v-for="({ chunk, highlighted }, i) in highlightChunks">
      <c-mark
        v-if="highlighted"
        :color="colorMap.get(normalizeKey(chunk)) || props.color"
        :key="`highlight-mark-${i}`"
        :style="props.highlightStyles"
        :unstyled="props.unstyled"
      >
        {{ chunk }}
      </c-mark>
      <span v-else :key="`highlight-span-${i}`">{{ chunk }}</span>
    </template>
  </c-text>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCckTheme, useComponentProps } from '../../core'
import CMark from '../mark'
import CText from '../text'
import { HighlightProps, HighlightTerm } from './highlight.types'
import { foldAccents, highlighter } from './highlighter/highlighter'

defineOptions({
  name: 'CHighlight',
})

const rawProps = defineProps<HighlightProps>()

const _root = ref<InstanceType<typeof CText> | null>(null)

const theme = useCckTheme()

const defaultProps = {
  color: 'yellow',
  wholeWorld: false,
  caseInsensitive: true,
  accentInsensitive: true,
} satisfies Partial<HighlightProps>

const props = useComponentProps({
  component: 'CHighlight',
  defaultProps,
  props: rawProps,
})

const knownProps = [
  'unstyled',
  'children',
  'highlight',
  'highlightStyles',
  'color',
  'wholeWord',
  'caseInsensitive',
  'accentInsensitive',
]

const isTermArray = computed(
  () => Array.isArray(props.value.highlight) && typeof props.value.highlight[0] === 'object'
)

const colorMap = new Map<string, string>()

const normalizeKey = (s: string) => {
  let key = s
  if (props.value.caseInsensitive) {
    key = key.toLocaleLowerCase()
  }
  if (props.value.accentInsensitive) {
    key = foldAccents(key)
  }
  return key
}

const highlightStrings = computed(() => {
  let result: string[]
  if (isTermArray.value) {
    result = (props.value.highlight as HighlightTerm[]).map((term) => {
      if (term.color) {
        colorMap.set(normalizeKey(term.text), term.color)
      }
      return term.text
    })
  } else if (Array.isArray(props.value.highlight)) {
    result = props.value.highlight as string[]
  } else {
    result = [props.value.highlight as string]
  }
  return result
})

const highlightChunks = computed(() =>
  highlighter(props.value.children, highlightStrings.value, {
    wholeWord: props.value.wholeWorld,
    caseInsensitive: props.value.caseInsensitive,
    accentInsensitive: props.value.accentInsensitive,
  })
)

const resolvedStyle = computed(() => {
  const style = props.value.style
  if (typeof style === 'function') {
    return style(theme.value)
  }
  return style
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
  return { ...others, mod: mergedMod }
})

defineExpose({
  root: computed(() => _root.value?.root ?? null),
})
</script>
