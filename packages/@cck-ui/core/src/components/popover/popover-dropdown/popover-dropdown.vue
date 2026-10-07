<template>
  <template v-if="!ctx.disabled?.value">
    <c-portal v-bind="ctx.portalProps" :disabled="!ctx.withinPortal?.value">
      <c-transition
        v-bind="ctx.transitionProps"
        :duration="ctx.transitionProps?.duration ?? 150"
        :exit-duration="exitDuration"
        :keep-mounted="ctx.keepMounted.value"
        :keep-mounted-mode="ctx.keepMountedMode.value"
        :mounted="ctx.opened.value"
        :transition="ctx.transitionProps?.transition || 'fade'"
      >
        <template #default="{ styles: transitionStyles }">
          <c-focus-trap
            :active="(ctx.trapFocus.value ?? false) && ctx.opened.value"
            :inner-ref="setDropdownRef"
          >
            <c-box
              v-bind="mergedDropdownAttrs"
              :data-fixed="ctx.floatingStrategy.value === 'fixed' || undefined"
              :data-position="ctx.placement.value"
              :style="[transitionStyle(transitionStyles)]"
              @keydown.capture="handleKeydownCapture"
            >
              <slot />
              <floating-arrow
                v-bind="arrowAttrs"
                :arrow-offset="ctx.arrowOffset.value"
                :arrow-position="ctx.arrowPosition.value"
                :arrow-radius="ctx.arrowRadius.value"
                :arrow-size="ctx.arrowSize.value"
                :arrow-x="ctx.arrowX.value"
                :arrow-y="ctx.arrowY.value"
                :position="ctx.placement.value"
                :ref="setArrowRef"
                :visible="ctx.withArrow?.value"
              />
            </c-box>
          </c-focus-trap>
        </template>
      </c-transition>
    </c-portal>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useFocusReturn } from '@cck-ui/hooks'
import { CBox, useComponentProps, useDirectionContext } from '../../../core'
import { FloatingArrow, getArrowMergeDropdownStyles } from '../../../utils/Floating'
import { usePopoverContext } from '../popover.context'
import { PopoverDropdownProps } from './popover-dropdown.types'
import { CPortal } from '../../portal'
import { CFocusTrap } from '../../focus-trap'
import { CTransition } from '../../transition'
import { resolveElement } from '../../../utils'

defineOptions({
  name: 'CPopoverDropdown',
})

const rawProps = defineProps<PopoverDropdownProps>()

const props = useComponentProps<PopoverDropdownProps>({
  component: 'CPopoverDropdown',
  defaultProps: {},
  props: rawProps,
})

const knownProps = [
  'classNames',
  'className',
  'style',
  'styles',
  'vars',
  'onKeydownCapture',
  'variant',
]

const ctx = usePopoverContext()
const { dir } = useDirectionContext()

const mergeStyles = computed(() =>
  ctx.arrowPosition.value === 'merge' && ctx.withArrow?.value
    ? getArrowMergeDropdownStyles({ position: ctx.placement.value, dir: dir.value })
    : undefined
)

const returnFocus = useFocusReturn({
  opened: ctx.opened,
  shouldReturnFocus: ctx.returnFocus,
})

const accessibleProps = computed(() =>
  ctx.withRoles.value
    ? {
        'aria-labelledby': ctx.getTargetId(),
        id: ctx.getDropdownId(),
        role: 'dialog',
        tabindex: -1,
      }
    : {}
)

const dropdownEl = ref<HTMLElement | null>(null)

const setDropdownRef = (node: HTMLElement | null) => {
  const dom = resolveElement(node)
  dropdownEl.value = dom
  if (dom) {
    ctx.floating(dom)
  }
}

const others = computed(() => {
  const result: Record<string, any> = {}
  for (const key in props.value) {
    if (!knownProps.includes(key)) {
      result[key] = (props.value as any)[key]
    }
  }
  return result
})

const mergedDropdownAttrs = computed(() => {
  const result = ctx.getStyles('dropdown', {
    className: props.value.className,
    classNames: props.value.classNames,
    styles: props.value.styles,
  })

  const { style: _style, ...rest } = result as any

  return {
    ...accessibleProps.value,
    ...others.value,
    variant: props.value.variant,
    ...rest,
  }
})

const arrowAttrs = computed(() =>
  ctx.getStyles('arrow', {
    classNames: props.value.classNames,
    styles: props.value.styles,
  })
)

function transitionStyle(transitionStyles: any) {
  return [transitionStyles].filter(Boolean)
}

const appliedMergeStyleKeys = new Set<string>()

watchEffect(() => {
  const el = dropdownEl.value
  if (!el) {
    return
  }
  el.style.setProperty('--popover-top', `${ctx.y.value ?? 0}px`)
  el.style.setProperty('--popover-left', `${ctx.x.value ?? 0}px`)
  el.style.setProperty('--popover-z-index', String(ctx.zIndex.value ?? 300))

  const next = mergeStyles.value ?? {}
  const nextKeys = new Set(Object.keys(next))

  for (const k of appliedMergeStyleKeys) {
    if (!nextKeys.has(k)) {
      el.style[k as any] = ''
    }
  }
  for (const [k, v] of Object.entries(next)) {
    el.style[k as any] = v as string
  }

  appliedMergeStyleKeys.clear()
  for (const k of nextKeys) {
    appliedMergeStyleKeys.add(k)
  }
})

const exitDuration = computed(() =>
  typeof ctx.transitionProps?.exitDuration === 'number'
    ? ctx.transitionProps.exitDuration
    : ctx.transitionProps?.duration
)

function handleKeydownCapture(event: KeyboardEvent) {
  ;(props.value as any).onKeydownCapture?.(event)

  if (event.key === 'Escape' && ctx.closeOnEscape?.value) {
    event.preventDefault()
    ctx.onClose?.()
    ctx.onDismiss?.()
    returnFocus()
  }
}

const arrowComponentRef = ref<any>(null)

function setArrowRef(el: any) {
  arrowComponentRef.value = el

  if (!el) {
    ctx.arrowRef.value = null
    return
  }

  const dom = resolveElement(el)
  ctx.arrowRef.value = dom instanceof HTMLDivElement ? dom : null
}

defineExpose({
  root: dropdownEl,
})
</script>
