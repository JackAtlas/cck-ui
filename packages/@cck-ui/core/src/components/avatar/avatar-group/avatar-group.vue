<template>
  <c-box ref="_group" v-bind="mergedAttrs">
    <slot />
  </c-box>
</template>

<script setup lang="ts">
import { computed, provide, ref, useAttrs } from 'vue'
import { AVATAR_GROUP_CONTEXT_KEY } from './avatar-group.constant'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../../core'
import { AvatarGroupFactory, AvatarGroupProps } from './avatar-group.types'
import classes from '../avatar.module.css'
import { varsResolver } from './avatar-group.utils'

defineOptions({
  name: 'CAvatarGroup',
})

const _group = ref<InstanceType<typeof CBox> | null>(null)

provide(AVATAR_GROUP_CONTEXT_KEY, { withinGroup: true })

const attrs = useAttrs()

const rawProps = defineProps<AvatarGroupProps>()

const props = useComponentProps({
  component: 'CAvatarGroup',
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
  'spacing',
  'attributes',
]

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const getStyles = useStyles<AvatarGroupFactory>({
  name: 'AvatarGroup',
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
  rootSelector: 'group',
})

const rootAttrs = computed(() => getStyles('group'))

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
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

defineExpose({
  group: computed(() => _group.value?.root ?? null),
})
</script>
