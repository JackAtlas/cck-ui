import { CSSProperties, MaybeRefOrGetter, nextTick, ref, Ref, toValue, watch } from 'vue'

function getAutoDuration(size: number | string): number {
  if (!size || typeof size === 'string') {
    return 0
  }
  const constant = size / 36
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}

type Dimension = 'height' | 'width'

function getElementSize(el: HTMLElement | null, dimension: Dimension): number | string {
  if (!el) {
    return 'auto'
  }
  return dimension === 'height' ? el.scrollHeight : el.scrollWidth
}

export type CollapseState = 'entering' | 'entered' | 'exiting' | 'exited'

export interface CollapseInput {
  /** Expanded state */
  expanded: MaybeRefOrGetter<boolean>

  /** Transition duration in milliseconds, by default calculated based on content height */
  transitionDuration?: MaybeRefOrGetter<number>

  /**
   * Transition timing function
   * @default 'ease'
   */
  transitionTimingFunction?: string

  /** Called when transition ends */
  onTransitionEnd?: () => void

  /** Called when transition starts */
  onTransitionStart?: () => void

  /** If true, collpased content is kept in the DOM and hidden with `display: none` styles */
  keepMounted?: boolean
}

interface GetCollapsePropsReturnValue {
  'aria-hidden': boolean
  inert: boolean
  style: CSSProperties
  onTransitionend: (event: TransitionEvent) => void
}

export interface CollapseReturnValue {
  /** Current transition state */
  state: Ref<CollapseState>

  elementRef: Ref<HTMLElement | null>

  getCollapseProps: (input?: { style?: CSSProperties }) => GetCollapsePropsReturnValue
}

export function useDimensionCollapse(
  dimension: Dimension,
  input: CollapseInput
): CollapseReturnValue {
  const {
    expanded,
    keepMounted,
    onTransitionEnd,
    onTransitionStart,
    transitionDuration,
    transitionTimingFunction,
  } = input

  const isExpanded = () => toValue(expanded)
  const duration = () => toValue(transitionDuration)

  const buildCollapsedStyles = (): CSSProperties => ({
    [dimension]: 0,
    overflow: 'hidden',
    ...(keepMounted ? {} : { display: 'none' }),
  })

  const elementRef = ref<HTMLElement | null>(null)
  const styles = ref<CSSProperties>(isExpanded() ? {} : buildCollapsedStyles())
  const state = ref<CollapseState>(isExpanded() ? 'entered' : 'exited')

  const setStyles = (next: CSSProperties) => {
    styles.value = next
  }

  const mergeStyles = (patch: CSSProperties) => {
    styles.value = { ...styles.value, ...patch }
  }

  const getTransitionStyles = (size: number | string): CSSProperties => {
    const d = duration() ?? getAutoDuration(size)
    return {
      transition: `${dimension} ${d}ms ${transitionTimingFunction}, opacity ${d}ms ${transitionTimingFunction}`,
    }
  }

  const measure = () => getElementSize(elementRef.value, dimension)

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== elementRef.value || event.propertyName !== dimension) {
      return
    }

    if (isExpanded()) {
      const size = measure()

      if (size === styles.value[dimension]) {
        setStyles({})
      } else {
        mergeStyles({ [dimension]: size })
      }

      state.value = 'entered'
      onTransitionEnd?.()
    } else if (styles.value[dimension] === 0) {
      setStyles(buildCollapsedStyles())
      state.value = 'exited'
      onTransitionEnd?.()
    }
  }

  watch(isExpanded, (exp) => {
    if (duration() !== 0) {
      onTransitionStart?.()
    }

    if (exp) {
      requestAnimationFrame(async () => {
        state.value = 'entering'
        mergeStyles({
          willChange: dimension,
          display: 'block',
          overflow: 'hidden',
        })

        await nextTick()

        const size = measure()

        mergeStyles({ ...getTransitionStyles(size) })

        requestAnimationFrame(() => {
          mergeStyles({ ...getTransitionStyles(size), [dimension]: `${size}px` })
        })
      })
    } else {
      requestAnimationFrame(() => {
        state.value = 'exiting'

        const size = measure()
        mergeStyles({
          ...getTransitionStyles(size),
          willChange: dimension,
          [dimension]: size,
        })

        requestAnimationFrame(() => {
          mergeStyles({ [dimension]: 0, overflow: 'hidden' })
        })
      })
    }
  })

  const getCollapseProps = (props: { style?: CSSProperties } = {}): GetCollapsePropsReturnValue => {
    const exp = isExpanded()

    return {
      'aria-hidden': !exp,
      inert: !exp,
      style: {
        boxSizing: 'border-box',
        ...props.style,
        ...styles.value,
      },
      onTransitionend: handleTransitionEnd,
    }
  }

  return { state, elementRef, getCollapseProps }
}

export function useCollapse(input: CollapseInput): CollapseReturnValue {
  return useDimensionCollapse('height', input)
}

export function useHorizontalCollapse(input: CollapseInput): CollapseReturnValue {
  return useDimensionCollapse('width', input)
}
