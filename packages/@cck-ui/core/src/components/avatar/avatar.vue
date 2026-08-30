<template>
  <c-box ref="_root" v-bind="mergedRootAttrs">
    <c-box tag="span" v-bind="placeholderAttrs" v-if="error || !props.src">
      <slot>
        <template v-if="typeof props.name === 'string'">
          {{ getInitials(props.name) }}
        </template>
        <avatar-placeholder-icon v-else />
      </slot>
    </c-box>
    <c-box
      tag="img"
      v-bind="mergedImageAttrs"
      :alt="props.alt"
      :src="props.src"
      @error="onError"
    ></c-box>
  </c-box>
</template>

<script setup lang="ts">
import { computed, inject, ref, useAttrs, watch } from 'vue'
import { CBox, CStyleProp, useComponentProps, useStyles } from '../../core'
import { AvatarFactory, AvatarProps } from './avatar.types'
import { AVATAR_GROUP_CONTEXT_KEY } from './avatar-group/avatar-group.constant'
import { varsResolver } from './avatar.utils'
import AvatarPlaceholderIcon from './avatar-placeholder-icon.vue'
import { getInitials } from './get-initials/get-initials'
import classes from './avatar.module.css'

defineOptions({
  name: 'CAvatar',
})

const _root = ref<InstanceType<typeof CBox> | null>(null)
const _image = ref<InstanceType<typeof CBox> | null>(null)
const _placeholder = ref<InstanceType<typeof CBox> | null>(null)

const error = ref<boolean>(false)

const attrs = useAttrs()

const rawProps = defineProps<AvatarProps>()

const props = useComponentProps({
  component: 'CAvatar',
  defaultProps: {},
  props: rawProps,
})

watch(
  () => props.value.src,
  (newVal) => {
    error.value = !newVal
  }
)

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'unstyled',
  'vars',
  'src',
  'alt',
  'radius',
  'color',
  'gradient',
  'imageProps',
  'autoContrast',
  'mod',
  'name',
  'allowedInitialsColors',
  'attributes',
]

const onError = (event: Event) => {
  error.value = true
  props.value.imageProps?.onError?.(event)
}

const styleProps = computed(() => ({
  ...props.value,
  ...attrs,
  style: (attrs.style ?? props.value.style) as CStyleProp,
}))

const groupContext = inject(AVATAR_GROUP_CONTEXT_KEY, { withinGroup: false })

const modList = computed(() => [{ 'within-group': groupContext.withinGroup }])

const getStyles = useStyles<AvatarFactory>({
  name: 'Avatar',
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
const imageAttrs = computed(() => getStyles('image'))
const placeholderAttrs = computed(() => getStyles('placeholder'))

const mergedRootAttrs = computed(() => {
  const others: Record<string, any> = {}
  const propsValue = props.value
  Object.keys(propsValue).forEach((key) => {
    if (!knownProps.includes(key)) {
      others[key] = propsValue[key as keyof typeof propsValue]
    }
  })
  const userMod = props.value.mod
  const mergedMod = [
    ...(Array.isArray(userMod) ? userMod : [userMod].filter(Boolean)),
    ...modList.value,
  ]
  return { ...others, mod: mergedMod, ...rootAttrs.value }
})

const mergedImageAttrs = computed(() => ({
  ...props.value.imageProps,
  ...imageAttrs.value,
}))

defineExpose({
  root: computed(() => _root.value?.root ?? null),
  image: computed(() => _image.value),
  placeholder: computed(() => _placeholder.value),
})
</script>
