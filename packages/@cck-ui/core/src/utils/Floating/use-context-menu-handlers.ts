import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { createEventHandler } from '../../core'
import { useLongPress } from '@cck-ui/hooks'

interface UseContextMenuHandlersOptions {
  /** Props of the child element that opens the dropdown */
  childProps?: MaybeRefOrGetter<Record<string, any>>

  /** If set, right-click trigger is disabled and the browser's default context menu is shown */
  disabled?: MaybeRefOrGetter<boolean | undefined>

  /** Current opened state, used to set `data-expanded` on the child */
  opened?: MaybeRefOrGetter<boolean>

  /**
   * Delay in ms before a touch long-press opens the dropdown
   * @default 500
   */
  longPressDelay?: MaybeRefOrGetter<number>

  /** Sets the floating reference to a virtual element positioned at the cursor */
  setReference: (node: object) => void

  /** Called to open the dropdown after the reference has been set */
  open: () => void
}

function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch')
}

export function useContextMenuHandlers(options: UseContextMenuHandlersOptions) {
  const {
    childProps: _childProps = {},
    disabled,
    opened,
    longPressDelay = 500,
    setReference,
    open,
  } = options

  const getChildProps = () => toValue(_childProps) ?? {}

  let touchActive = false
  let gestureHandled = false
  let touchTarget: object | null = null

  const openAtPoint = (clientX: number, clientY: number, contextElement: object | null) => {
    setReference({
      getBoundingClientRect: () => ({
        x: clientX,
        y: clientY,
        width: 0,
        height: 0,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY,
        toJSON: () => undefined,
      }),
      contextElement,
    })
    open()
  }

  const onMousedown = (event: MouseEvent) => {
    if (toValue(disabled)) {
      return
    }
    if (event.button === 2) {
      event.stopPropagation()
    }
  }

  const onContextmenu = (event: MouseEvent) => {
    if (toValue(disabled) || event.defaultPrevented) {
      return
    }

    event.preventDefault()

    if (gestureHandled) {
      return
    }

    openAtPoint(event.clientX, event.clientY, event.currentTarget as object)

    if (touchActive) {
      gestureHandled = true
    }
  }

  const longPress = useLongPress(
    (event) => {
      if (toValue(disabled) || gestureHandled) {
        return
      }

      if (!isTouchEvent(event)) {
        return
      }

      const touch = event.touches[0] ?? event.changedTouches[0]
      if (!touch) {
        return
      }

      openAtPoint(touch.clientX, touch.clientY, touchTarget)
      gestureHandled = true
    },
    {
      threshold: () => toValue(longPressDelay) ?? 500,
      events: ['touch'],
      cancelOnMove: true,
      onStart: (event) => {
        touchActive = true
        gestureHandled = false
        touchTarget = event.currentTarget as object
      },
      onFinish: (event) => {
        touchActive = false
        gestureHandled = false
        if (!toValue(disabled) && isTouchEvent(event)) {
          event.preventDefault()
        }
      },
      onCancel: () => {
        touchActive = false
        gestureHandled = false
      },
    }
  )

  const onTouchstart = createEventHandler<any>(getChildProps().onTouchStart, longPress.onTouchstart)
  const onTouchend = createEventHandler<any>(getChildProps().onTouchend, longPress.onTouchend)
  const onTouchcancel = createEventHandler<any>(
    getChildProps().onTouchcancel,
    longPress.onTouchcancel
  )
  const onTouchmove = createEventHandler<any>(getChildProps().onTouchmove, longPress.onTouchmove)

  return computed<Record<string, any>>(() => {
    const isDisabled = toValue(disabled)

    return {
      onContextmenu,
      onMousedown,
      onTouchstart,
      onTouchend,
      onTouchcancel,
      onTouchmove,
      style: isDisabled
        ? getChildProps().style
        : {
            ...(getChildProps().style || {}),
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          },
      'data-expanded': toValue(opened) ? true : undefined,
    }
  })
}
