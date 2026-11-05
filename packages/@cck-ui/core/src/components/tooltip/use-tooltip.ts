import { computed, MaybeRefOrGetter, onScopeDispose, ref, Ref, toValue, watch } from 'vue'
import { FloatingAxisOffsets, FloatingPosition, FloatingStrategy } from '../../utils/Floating'
import type { TooltipMiddlewares } from './tooltip.types'
import { useId, useUncontrolled } from '@cck-ui/hooks'
import {
  arrow,
  autoUpdate,
  flip,
  inline,
  offset,
  shift,
  useFloating,
  type Middleware,
  type Placement,
} from '@floating-ui/vue'

export interface UseTooltipOptions {
  position: MaybeRefOrGetter<FloatingPosition>
  closeDelay?: MaybeRefOrGetter<number | undefined>
  openDelay?: MaybeRefOrGetter<number | undefined>
  onPositionChange?: (position: FloatingPosition) => void
  opened?: MaybeRefOrGetter<boolean | undefined>
  defaultOpened?: boolean
  offset: MaybeRefOrGetter<number | FloatingAxisOffsets>
  arrowRef?: Ref<HTMLDivElement | null>
  arrowOffset?: MaybeRefOrGetter<number | undefined>
  events?: MaybeRefOrGetter<{ hover: boolean; focus: boolean; touch: boolean } | undefined>
  interactive?: MaybeRefOrGetter<boolean | undefined>
  inline?: MaybeRefOrGetter<boolean | undefined>
  strategy?: MaybeRefOrGetter<FloatingStrategy | undefined>
  middlewares?: MaybeRefOrGetter<TooltipMiddlewares | undefined>
}

const DEFAULT_EVENTS = { hover: true, focus: false, touch: false }

function getDefaultMiddlewares(middlewares: TooltipMiddlewares | undefined): TooltipMiddlewares {
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

export function useTooltip(options: UseTooltipOptions) {
  const uid = useId()

  const [opened, setOpened] = useUncontrolled<boolean>({
    value: () => toValue(options.opened),
    defaultValue: options.defaultOpened ?? false,
    finalValue: false,
  })

  const referenceEl = ref<HTMLElement | null>(null)
  const floatingEl = ref<HTMLElement | null>(null)

  const setReference = (node: HTMLElement | null) => {
    referenceEl.value = node
  }

  const setFloating = (node: HTMLElement | null) => {
    floatingEl.value = node
  }

  const events = computed(() => toValue(options.events) ?? DEFAULT_EVENTS)
  const interactive = computed(() => toValue(options.interactive) ?? false)
  const inlineOption = computed(() => toValue(options.inline) ?? false)

  const middlewareList = computed<Middleware[]>(() => {
    const result: Middleware[] = []
    const middlewaresOptions = getDefaultMiddlewares(toValue(options.middlewares))
    const arrowEl = options.arrowRef?.value

    result.push(offset(toValue(options.offset)))

    if (middlewaresOptions.shift) {
      result.push(
        shift(
          typeof middlewaresOptions.shift === 'boolean'
            ? { padding: 8 }
            : { padding: 8, ...middlewaresOptions.shift }
        )
      )
    }

    if (middlewaresOptions.flip) {
      result.push(
        typeof middlewaresOptions.flip === 'boolean' ? flip() : flip(middlewaresOptions.flip)
      )
    }

    if (arrowEl) {
      result.map(arrow({ element: arrowEl, padding: toValue(options.arrowOffset) }))
    }

    if (middlewaresOptions.inline) {
      result.push(
        typeof middlewaresOptions.inline === 'boolean'
          ? inline()
          : inline(middlewaresOptions.inline)
      )
    } else if (inlineOption.value) {
      result.push(inline())
    }

    return result
  })

  const floating = useFloating(referenceEl, floatingEl, {
    open: computed(() => opened.value),
    strategy: computed(() => toValue(options.strategy)),
    placement: computed(() => toValue(options.position) as Placement),
    middleware: middlewareList,
    whileElementsMounted: autoUpdate,
  })

  watch(floating.placement, (next, prev) => {
    if (next !== prev) {
      options.onPositionChange?.(next as FloatingPosition)
    }
  })

  let openTimer: number | null = null
  let closeTimer: number | null = null

  const clearOpenTimer = () => {
    if (openTimer !== null) {
      window.clearTimeout(openTimer)
      openTimer = null
    }
  }

  const clearCloseTimer = () => {
    if (closeTimer !== null) {
      window.clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  const open = () => {
    clearCloseTimer()
    const delay = toValue(options.openDelay) ?? 0
    if (delay > 0) {
      clearOpenTimer()
      openTimer = window.setTimeout(() => {
        setOpened(true)
        openTimer = null
      }, delay)
    } else {
      setOpened(true)
    }
  }

  const close = (withDelay = true) => {
    clearOpenTimer()
    if (!withDelay) {
      setOpened(false)
      return
    }
    const delay = toValue(options.closeDelay) ?? 0
    if (delay > 0) {
      clearCloseTimer()
      closeTimer = window.setTimeout(() => {
        setOpened(false)
        closeTimer = null
      }, delay)
    } else {
      setOpened(false)
    }
  }

  const handleReferenceMouseEnter = () => {
    if (!events.value.hover) {
      return
    }
    open()
  }

  const handleReferenceMouseLeave = () => {
    if (!interactive.value) {
      return
    }
    close()
  }

  const handleFocus = () => {
    if (!events.value.focus) {
      return
    }
    open()
  }

  const handleFloatingMouseEnter = () => {
    if (!interactive.value) {
      return
    }
    clearCloseTimer()
  }

  const handleFloatingMouseLeave = () => {
    if (!interactive.value) {
      return
    }
    close()
  }

  const handleBlur = () => {
    if (!events.value.focus) {
      return
    }
    close()
  }

  const handlePointerDown = () => {
    if (!events.value.touch) {
      return
    }
    if (opened.value) {
      close(false)
    } else {
      open()
    }
  }

  const tooltipId = `${uid}-tooltip`

  const composeHandlers = (
    result: Record<string, any>,
    key: string,
    handler: (event: any) => void
  ) => {
    const original = result[key]
    if (original) {
      result[key] = (event: any) => {
        original(event)
        handler(event)
      }
    } else {
      result[key] = handler
    }
  }

  const getReferenceProps = (extra: Record<string, any> = {}) => {
    const result: Record<string, any> = { ...extra }

    composeHandlers(result, 'onMouseenter', handleReferenceMouseEnter)
    composeHandlers(result, 'onMouseleave', handleReferenceMouseLeave)
    composeHandlers(result, 'onFocus', handleFocus)
    composeHandlers(result, 'onBlur', handleBlur)
    composeHandlers(result, 'onPointerdown', handlePointerDown)

    if (opened.value) {
      result['aria-describedby'] = tooltipId
    }

    return result
  }

  const getFloatingProps = (extra: Record<string, any> = {}) => {
    const result: Record<string, any> = { ...extra }

    composeHandlers(result, 'onMouseenter', handleFloatingMouseEnter)
    composeHandlers(result, 'onMouseleave', handleFloatingMouseLeave)

    result.id = tooltipId
    result.role = 'tooltip'

    return result
  }

  onScopeDispose(() => {
    clearOpenTimer()
    clearCloseTimer()
  })

  return {
    x: floating.x,
    y: floating.y,
    arrowX: computed(() => floating.middlewareData.value?.arrow?.x),
    arrowY: computed(() => floating.middlewareData.value.arrow?.y),
    reference: setReference,
    floating: setFloating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase: computed(() => false),
    opened,
    placement: floating.placement,
  }
}
