<template>
  <slot />

  <c-transition
    v-if="props.withOverlay"
    transition="fade"
    :mounted="popover.opened.value"
    :duration="props.transitionProps?.duration || 250"
    :exit-duration="props.transitionProps?.exitDuration || 250"
  >
    <template #default="{ styles: transitionStyles }">
      <c-portal :disabled="!props.withinPortal" v-bind="props.portalProps">
        <c-overlay v-bind="mergedOverlayAttrs(transitionStyles)" />
      </c-portal>
    </template>
  </c-transition>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useClickOutside, useId } from '@cck-ui/hooks'
import {
  getDefaultZIndex,
  useCckEnv,
  useComponentProps,
  useDirectionContext,
  useResolvedStylesApi,
  useStyles,
} from '../../core'
import { FloatingPosition, getFloatingPosition } from '../../utils/Floating'
import COverlay from '../overlay'
import CPortal from '../portal'
import CTransition from '../transition'
import { providePopoverContext, type PopoverContextValue } from './popover.context'
import { usePopover } from './use-popover'
import type { PopoverFactory, PopoverProps } from './popover.types'
import classes from './popover.module.css'
import { varsResolver } from './popover.utils'

defineOptions({
  name: 'CPopover',
  inheritAttrs: false,
})

const emit = defineEmits<{
  (e: 'update:opened', value: boolean): void
  (e: 'change', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'dismiss'): void
  (e: 'position-change', position: FloatingPosition): void
  (e: 'exit-transition-end'): void
  (e: 'enter-transition-end'): void
}>()

const attrs = useAttrs()
const rawProps = defineProps<PopoverProps>()

const defaultProps = {
  position: 'bottom',
  offset: 8,
  transitionProps: { transition: 'fade', duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: 'side',
  closeOnClickOutside: true,
  withinPortal: true,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  withOverlay: false,
  hideDetached: true,
  preventPositionChangeWhenVisible: true,
  clickOutsideEvents: ['mousedown', 'touchstart'],
  zIndex: getDefaultZIndex('popover'),
  __staticSelector: 'Popover',
  width: 'max-content',
} satisfies Partial<PopoverProps>

const props = useComponentProps<PopoverProps>({
  component: 'CPopover',
  defaultProps,
  props: rawProps,
  booleanProps: [
    'withArrow',
    'withOverlay',
    'disabled',
    'returnFocus',
    'trapFocus',
    'closeOnClickOutside',
    'closeOnEscape',
    'withRoles',
    'keepMounted',
    'hideDetached',
    'preventPositionChangeWhenVisible',
    'defaultOpened',
    'opened',
    'closeOnClickOutside',
    'trapFocus',
    'closeOnEscape',
    'withinPortal',
  ],
})

const getStyles = useStyles<PopoverFactory>({
  name: props.value.__staticSelector ?? 'Popover',
  props,
  classes,
  classNames: props.value.classNames,
  styles: props.value.styles,
  unstyled: props.value.unstyled,
  attributes: props.value.attributes,
  vars: props.value.vars,
  varsResolver,
  rootSelector: 'dropdown',
})

const { resolvedStyles } = useResolvedStylesApi<PopoverFactory>({
  classNames: props.value.classNames,
  styles: props.value.styles,
  props,
})

const arrowRef = ref<HTMLDivElement | null>(null)
const targetNode = ref<HTMLElement | null>(null)
const dropdownNode = ref<HTMLElement | null>(null)

const { dir } = useDirectionContext()
const env = useCckEnv()
const uid = useId(props.value.id)

const popover = usePopover({
  middlewares: () => props.value.middlewares,
  width: () => props.value.width,
  position: () => getFloatingPosition(dir.value, props.value.position!),
  offset: () => {
    const raw = props.value.offset
    if (typeof raw === 'number') {
      return raw + (props.value.withArrow ? props.value.arrowSize! / 2 : 0)
    }
    return raw!
  },
  arrowRef,
  arrowOffset: () => props.value.arrowOffset!,
  onPositionChange: (pos) => emit('position-change', pos),
  opened: () => props.value.opened,
  defaultOpened: () => props.value.defaultOpened,
  onChange: (val) => {
    emit('update:opened', val)
    emit('change', val)
  },
  onOpen: () => emit('open'),
  onClose: () => emit('close'),
  onDismiss: () => emit('dismiss'),
  strategy: () => props.value.floatingStrategy,
  disabled: () => props.value.disabled,
  preventPositionChangeWhenVisible: () => props.value.preventPositionChangeWhenVisible,
  keepMounted: () => props.value.keepMounted,
})

useClickOutside(
  () => {
    if (props.value.closeOnClickOutside) {
      popover.onClose()
      emit('dismiss')
    }
  },
  {
    events: () => props.value.clickOutsideEvents,
    nodes: () => [targetNode.value, dropdownNode.value],
    enabled: () => popover.opened.value,
  }
)

const reference = (node: HTMLElement | null) => {
  targetNode.value = node
  if (node) {
    popover.setReference(node)
  }
}

const floating = (node: HTMLElement | null) => {
  dropdownNode.value = node
  if (node) {
    popover.setFloating(node)
  }
}

const onExited = () => {
  ;(props.value.transitionProps as any)?.onExited?.()
  emit('exit-transition-end')
  popover.resetLockedPlacement()
}

const onEntered = () => {
  ;(props.value.transitionProps as any)?.onEntered?.()
  emit('enter-transition-end')
}

function mergedOverlayAttrs(transitionStyles: any) {
  const overlayProps = (props.value.overlayProps ?? {}) as Record<string, any>
  const stylesResult = getStyles('overlay', {
    className: overlayProps.className,
    style: [transitionStyles, overlayProps.style],
  })
  return {
    ...overlayProps,
    ...stylesResult,
  }
}

const ctxValue: PopoverContextValue = {
  returnFocus: computed(() => props.value.returnFocus),
  disabled: computed(() => props.value.disabled),
  controlled: popover.controlled,
  opened: popover.opened,
  onToggle: popover.onToggle,
  onClose: popover.onClose,
  onDismiss: () => emit('dismiss'),

  reference,
  floating,
  x: popover.floating.x,
  y: popover.floating.y,
  arrowX: computed(() => popover.floating.middlewareData.value?.arrow?.x),
  arrowY: computed(() => popover.floating.middlewareData.value?.arrow?.y),
  arrowRef,
  placement: popover.effectivePlacement,
  floatingStrategy: popover.floating.strategy,

  transitionProps: {
    ...props.value.transitionProps,
    onExited,
    onEntered,
  },

  width: computed(() => props.value.width),
  withArrow: computed(() => props.value.withArrow),
  arrowSize: computed(() => props.value.arrowSize!),
  arrowOffset: computed(() => props.value.arrowOffset!),
  arrowRadius: computed(() => props.value.arrowRadius!),
  arrowPosition: computed(() => props.value.arrowPosition!),

  trapFocus: computed(() => props.value.trapFocus),
  withinPortal: computed(() => props.value.withinPortal),
  portalProps: props.value.portalProps,
  zIndex: computed(() => props.value.zIndex),
  radius: computed(() => props.value.radius),
  shadow: computed(() => props.value.shadow),
  closeOnEscape: computed(() => props.value.closeOnEscape),

  getTargetId: () => uid.value,
  getDropdownId: () => `${uid.value}-dropdown`,

  withRoles: computed(() => props.value.withRoles),
  targetProps: { ...attrs },

  classNames: computed(() => props.value.classNames),
  styles: props.value.styles,
  getStyles,
  resolvedStyles: resolvedStyles?.value,

  __staticSelector: computed(() => props.value.__staticSelector!),
  unstyled: computed(() => props.value.unstyled),
  variant: computed(() => props.value.variant),

  keepMounted: computed(() => props.value.keepMounted),
  keepMountedMode: computed(() => props.value.keepMountedMode),

  referenceHidden: computed(() => {
    if (!props.value.hideDetached || env === 'test') {
      return false
    }
    return popover.floating.middlewareData.value?.hide?.referenceHidden ?? false
  }),
}

providePopoverContext(ctxValue)

defineExpose({
  opened: popover.opened,
  close: popover.onClose,
  toggle: popover.onToggle,
})
</script>
