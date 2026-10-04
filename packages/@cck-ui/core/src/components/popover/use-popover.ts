import { computed, ref, toValue, watch, watchEffect, type Ref, type MaybeRefOrGetter } from 'vue'
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  inline,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
  type Middleware,
  type Placement,
} from '@floating-ui/vue'
import { useUncontrolled } from '@cck-ui/hooks'
import type { FloatingAxisOffsets, FloatingPosition, FloatingStrategy } from '../../utils/Floating'
import type { PopoverMiddlewares, PopoverWidth } from './popover.types'

export interface UsePopoverOptions {
  offset: MaybeRefOrGetter<number | FloatingAxisOffsets>
  position: MaybeRefOrGetter<FloatingPosition>
  onPositionChange?: (position: FloatingPosition) => void
  opened?: MaybeRefOrGetter<boolean | undefined>
  defaultOpened?: MaybeRefOrGetter<boolean | undefined>
  onChange?: (opened: boolean) => void
  onClose?: () => void
  onDismiss?: () => void
  onOpen?: () => void
  width: MaybeRefOrGetter<PopoverWidth>
  middlewares?: MaybeRefOrGetter<PopoverMiddlewares | undefined>
  arrowRef: Ref<HTMLDivElement | null>
  arrowOffset: MaybeRefOrGetter<number>
  strategy?: MaybeRefOrGetter<FloatingStrategy | undefined>
  disabled?: MaybeRefOrGetter<boolean | undefined>
  preventPositionChangeWhenVisible?: MaybeRefOrGetter<boolean | undefined>
  keepMounted?: MaybeRefOrGetter<boolean | undefined>
}

function getDefaultMiddlewares(middlewares: PopoverMiddlewares | undefined): PopoverMiddlewares {
  if (middlewares === undefined) {
    return { shift: true, flip: true }
  }
  const result = { ...middlewares }
  if (middlewares.shift === undefined) {
    result.shift = true
  }
  if (middlewares.flip === undefined) {
    result.flip = true
  }
  return result
}

export function usePopover(options: UsePopoverOptions) {
  const [_opened, setOpened] = useUncontrolled<boolean>({
    value: () => toValue(options.opened),
    defaultValue: toValue(options.defaultOpened),
    finalValue: false,
    onChange: options.onChange,
  })

  const controlled = computed(() => typeof toValue(options.opened) === 'boolean')

  const referenceEl = ref<HTMLElement | null>(null)
  const floatingEl = ref<HTMLElement | null>(null)

  const setReference = (node: HTMLElement | null) => {
    referenceEl.value = node
  }
  const setFloating = (node: HTMLElement | null) => {
    floatingEl.value = node
  }

  const lockedPlacement = ref<FloatingPosition | null>(null)
  const lockEnabled = computed(() => toValue(options.preventPositionChangeWhenVisible) !== false)
  const disableFlip = computed(() => lockEnabled.value && lockedPlacement.value !== null)
  const measuredAfterShow = ref(false)

  const resetLockedPlacement = () => {
    lockedPlacement.value = null
  }

  const onClose = () => {
    if (_opened.value && !toValue(options.disabled)) {
      setOpened(false)
    }
  }
  const onToggle = () => {
    if (!toValue(options.disabled)) {
      setOpened(!_opened.value)
    }
  }

  const middlewareList = computed<Middleware[]>(() => {
    const result: Middleware[] = []
    const middlewaresOptions = getDefaultMiddlewares(toValue(options.middlewares))
    const width = toValue(options.width)
    const arrowEl = options.arrowRef.value

    result.push(offset(toValue(options.offset)))
    result.push(hide())

    if (middlewaresOptions.flip && !disableFlip.value) {
      const userFlip = typeof middlewaresOptions.flip === 'boolean' ? {} : middlewaresOptions.flip
      const flipOptions = lockEnabled.value
        ? { fallbackStrategy: 'initialPlacement' as const, ...userFlip }
        : userFlip
      result.push(flip(flipOptions))
    }

    if (middlewaresOptions.shift) {
      const shiftOptions =
        typeof middlewaresOptions.shift === 'boolean' ? {} : middlewaresOptions.shift
      result.push(
        shift((state) => {
          const isVertical =
            state.placement.startsWith('top') || state.placement.startsWith('bottom')
          return {
            limiter: limitShift(),
            padding: 5,
            ...(width === 'target' && isVertical ? { mainAxis: false } : null),
            ...shiftOptions,
          }
        })
      )
    }

    if (middlewaresOptions.inline) {
      result.push(
        typeof middlewaresOptions.inline === 'boolean'
          ? inline()
          : inline(middlewaresOptions.inline)
      )
    }

    if (arrowEl) {
      result.push(arrow({ element: arrowEl, padding: toValue(options.arrowOffset) }))
    }

    if (middlewaresOptions.size || width === 'target') {
      result.push(
        size({
          ...(typeof middlewaresOptions.size === 'boolean' ? {} : middlewaresOptions.size),
          apply({ rects, availableWidth, availableHeight, ...rest }) {
            const el = floatingEl.value
            if (!el) {
              return
            }
            const styles = el.style

            if (middlewaresOptions.size) {
              if (typeof middlewaresOptions.size === 'object' && middlewaresOptions.size.apply) {
                middlewaresOptions.size.apply({
                  rects,
                  availableWidth,
                  availableHeight,
                  ...rest,
                })
              } else {
                Object.assign(styles, {
                  maxWidth: `${availableWidth}px`,
                  maxHeight: `${availableHeight}px`,
                })
              }
            }

            if (width === 'target') {
              Object.assign(styles, { width: `${rects.reference.width}px` })
            }
          },
        })
      )
    }

    return result
  })

  const effectivePlacement = computed<FloatingPosition>(() => {
    if (lockEnabled.value && lockedPlacement.value !== null) {
      return lockedPlacement.value
    }
    return toValue(options.position)
  })

  const whileElementsMounted = computed(() =>
    !toValue(options.keepMounted) ? autoUpdate : undefined
  )

  const floating = useFloating(referenceEl, floatingEl, {
    open: computed(() => _opened.value),
    strategy: computed(() => toValue(options.strategy)),
    placement: computed(() => effectivePlacement.value as Placement),
    middleware: middlewareList,
    whileElementsMounted: whileElementsMounted.value,
  })

  watchEffect((onCleanup) => {
    if (!toValue(options.keepMounted)) {
      return
    }
    if (_opened.value && referenceEl.value && floatingEl.value) {
      const cleanup = autoUpdate(referenceEl.value, floatingEl.value, floating.update)
      onCleanup(cleanup)
    }
  })

  watchEffect(() => {
    if (!_opened.value) {
      measuredAfterShow.value = false
      return
    }
    if (!lockEnabled.value || lockedPlacement.value !== null) {
      return
    }

    const flEl = floatingEl.value
    if (!flEl || flEl.offsetHeight === 0 || flEl.offsetWidth === 0) {
      return
    }

    if (!measuredAfterShow.value) {
      measuredAfterShow.value = true
      floating.update()
      return
    }

    if (floating.isPositioned.value) {
      lockedPlacement.value = floating.placement.value as FloatingPosition
    }
  })

  watch(
    () => toValue(options.position),
    (newPos, oldPos) => {
      if (newPos !== oldPos) {
        measuredAfterShow.value = false
        if (lockedPlacement.value !== null) {
          lockedPlacement.value = null
        }
      }
    }
  )

  watch(_opened, (newVal, oldVal) => {
    if (newVal !== oldVal && newVal && lockedPlacement.value !== null) {
      lockedPlacement.value = null
    }
  })

  watch(floating.placement, (newPlacement, oldPlacement) => {
    if (newPlacement !== oldPlacement) {
      options.onPositionChange?.(newPlacement as FloatingPosition)
    }
  })

  watch(_opened, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      if (!newVal) {
        options.onClose?.()
      } else {
        options.onOpen?.()
      }
    }
  })

  return {
    floating,
    controlled,
    opened: _opened,
    onClose,
    onToggle,
    resetLockedPlacement,
    setReference,
    setFloating,
    referenceEl,
    floatingEl,
    effectivePlacement,
  }
}
