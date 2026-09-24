import { MaybeRefOrGetter, onBeforeUnmount, ref, toValue } from 'vue'

export type UseLongPressEvent = 'mouse' | 'touch'

export interface UseLongPressOptions {
  /**
   * Time in milliseconds to trigger the long press
   * @default 400ms
   */
  threshold?: MaybeRefOrGetter<number>

  /**
   * Input types that can trigger the long press
   * @default ['mouse', 'touch']
   */
  events?: UseLongPressEvent[]

  /**
   * If set, the longpress is cancelled when the pointer moves further than the given distance in px from the start position. `true` uses a 10px threshold, a number sets a custom threshold.
   * @default false
   */
  cancelOnMove?: MaybeRefOrGetter<boolean | number>

  /** Callback triggered when the long press starts */
  onStart?: (event: MouseEvent | TouchEvent) => void

  /** Callback triggered when the long press finished */
  onFinish?: (event: MouseEvent | TouchEvent) => void

  /** Callback triggered when the long press is cancelled */
  onCancel?: (event: MouseEvent | TouchEvent) => void
}

export interface UseLongPressReturnValue {
  onMousedown?: (event: MouseEvent) => void
  onMouseup?: (event: MouseEvent) => void
  onMouseleave?: (event: MouseEvent) => void
  onMousemove?: (event: MouseEvent) => void
  onTouchstart?: (event: TouchEvent) => void
  onTouchend?: (event: TouchEvent) => void
  onTouchcancel?: (event: TouchEvent) => void
  onTouchmove?: (event: TouchEvent) => void
}

const DEFAULT_EVENTS: UseLongPressEvent[] = ['mouse', 'touch']
const DEFAULT_MOVE_THRESHOLD = 10

export function useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  options: UseLongPressOptions = {}
): UseLongPressReturnValue {
  const {
    threshold: _threshold,
    events = DEFAULT_EVENTS,
    cancelOnMove: _cancelOnMove,
    onStart,
    onFinish,
    onCancel,
  } = options

  const threshold = toValue(_threshold) ?? 400
  const cancelOnMove = toValue(_cancelOnMove) ?? false

  const isLongPressActive = ref(false)
  const isPressed = ref(false)
  let timeout: number | undefined
  let startPosition: { x: number; y: number } | null = null

  const moveEnabled = cancelOnMove !== false
  const moveThreshold =
    cancelOnMove === true ? DEFAULT_MOVE_THRESHOLD : cancelOnMove === false ? 0 : cancelOnMove

  const start = (event: MouseEvent | TouchEvent) => {
    if (!isMouseEvent(event) && !isTouchEvent(event)) {
      return
    }

    onStart?.(event)

    startPosition = getEventPosition(event)
    isPressed.value = true
    timeout = window.setTimeout(() => {
      timeout = undefined
      onLongPress(event)
      isLongPressActive.value = true
    }, threshold)
  }

  const cancel = (event: MouseEvent | TouchEvent) => {
    if (!isMouseEvent(event) && !isTouchEvent(event)) {
      return
    }

    if (isLongPressActive.value) {
      onFinish?.(event)
    } else if (isPressed.value) {
      onCancel?.(event)
    }

    isLongPressActive.value = false
    isPressed.value = false
    startPosition = null

    if (timeout !== undefined) {
      window.clearTimeout(timeout)
      timeout = undefined
    }
  }

  const move = (event: MouseEvent | TouchEvent) => {
    if (!moveEnabled || !isPressed.value || isLongPressActive.value) {
      return
    }

    const position = getEventPosition(event)
    if (!position || !startPosition) {
      return
    }

    const dx = position.x - startPosition.x
    const dy = position.y - startPosition.y

    if (Math.sqrt(dx * dx + dy * dy) > moveThreshold) {
      cancel(event)
    }
  }

  onBeforeUnmount(() => {
    if (timeout !== undefined) {
      window.clearTimeout(timeout)
      timeout = undefined
    }
  })

  const handlers: UseLongPressReturnValue = {}

  if (events.includes('mouse')) {
    handlers.onMousedown = start
    handlers.onMouseup = cancel
    handlers.onMouseleave = cancel
    if (moveEnabled) {
      handlers.onMousemove = move
    }
  }

  if (events.includes('touch')) {
    handlers.onTouchstart = start
    handlers.onTouchend = cancel
    handlers.onTouchcancel = cancel
    if (moveEnabled) {
      handlers.onTouchmove = move
    }
  }

  return handlers
}

function getEventPosition(event: MouseEvent | TouchEvent): { x: number; y: number } | null {
  if (isTouchEvent(event)) {
    const touch = event.touches[0] ?? event.changedTouches[0]
    return touch ? { x: touch.clientX, y: touch.clientY } : null
  }

  return { x: event.clientX, y: event.clientY }
}

function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return typeof TouchEvent !== 'undefined' && event instanceof TouchEvent
}

function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return typeof MouseEvent !== 'undefined' && event instanceof MouseEvent
}
