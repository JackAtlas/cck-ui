<template>
  <unstyled-button
    ref="_root"
    v-bind="mergedRootAttrs"
    :aria-busy="props.loading || undefined"
    :disabled="props.disabled || loading"
    :size="props.size"
    :unstyled="props.unstyled"
  >
    <c-transition
      transition="slide-down"
      v-if="typeof props.loading === 'boolean'"
      :duration="150"
      :mounted="props.loading"
    >
      <template #default="{ styles }">
        <c-box
          aria-hidden="true"
          ref="_inner"
          tag="span"
          v-bind="getStyles('loader', { style: styles })"
        >
          <c-loader
            color="var(--ai-color)"
            size="calc(var(--ai-size) * 0.55)"
            v-bind="props.loaderProps"
          >
            <slot />
          </c-loader>
        </c-box>
      </template>
    </c-transition>

    <c-box tag="span" v-bind="getStyles('icon')" :mod="{ loading: props.loading }">
      <slot />
    </c-box>
  </unstyled-button>
</template>

<script setup lang="ts">
import UnstyledButton from '../unstyled-button'
import { CLoader } from '../loader'
import { CTransition } from '../transition'
import { computed, ref, useAttrs } from 'vue'
import { ActionIconFactory, ActionIconProps } from './action-icon.types'
import { CBox, useComponentProps, useStyles } from '../../core'
import classes from './action-icon.module.css'
import { varsResolver } from './action-icon.utils'

defineOptions({
  name: 'CActionIcon',
})

const _root = ref<InstanceType<typeof UnstyledButton> | null>(null)
const _inner = ref<InstanceType<typeof CBox> | null>(null)

const attrs = useAttrs()

const rawProps = defineProps<ActionIconProps>()

const props = useComponentProps({
  component: 'CActionIcon',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'className',
  'classNames',
  'style',
  'styles',
  'unstyled',
  'loading',
  'loaderProps',
  'size',
  'color',
  'radius',
  '__staticSelector',
  'gradient',
  'vars',
  'disabled',
  'dataDisabled',
  'autoContrast',
  'mod',
  'attributes',
]

const getStyles = useStyles<ActionIconFactory>({
  name: ['ActionIcon', props.value.__staticSelector],
  props: { ...props.value, ...attrs } as ActionIconProps,
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
  { disabled: props.value.disabled || props.value.dataDisabled },
  { loading: props.value.loading },
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

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  inner: computed(() => _inner.value?.root ?? null),
})
</script>
