import { CSSProperties, MaybeRefOrGetter, ref, Ref, toValue, watch } from 'vue'

function getAutoDuration(size: number): number {
  if (!size) {
    return 0
  }
  const constant = size / 36
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}

type Dimension = 'height' | 'width'

export type CollapseState = 'entering' | 'entered' | 'exiting' | 'exited'

export interface CollapseInput {
  /** Expanded state */
  expanded: MaybeRefOrGetter<boolean>

  /** Transition duration in milliseconds, by default calculated based on content height */
  transitionDuration?: MaybeRefOrGetter<number | undefined>

  /**
   * Transition timing function
   * @default 'ease'
   */
  transitionTimingFunction?: MaybeRefOrGetter<string | undefined>

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
    transitionDuration = 200,
    transitionTimingFunction = 'ease',
  } = input

  const isExpanded = () => toValue(expanded)
  const duration = () => toValue(transitionDuration)
  const timingFunction = () => toValue(transitionTimingFunction)

  const buildCollapsedStyles = (): CSSProperties => ({
    [dimension]: '0px',
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

  const getTransitionStyles = (size: number): CSSProperties => {
    const d = duration() ?? getAutoDuration(size)
    return {
      transition: `${dimension} ${d}ms ${timingFunction()}, opacity ${d}ms ${timingFunction()}`,
    }
  }

  const measure = (): number => {
    const el = elementRef.value
    if (!el) {
      return 0
    }
    if (dimension === 'height') {
      return el.scrollHeight
    }
    const prevMinWidth = el.style.minWidth
    el.style.minWidth = 'max-content'
    const width = el.offsetWidth
    el.style.minWidth = prevMinWidth
    return width
  }

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== elementRef.value || event.propertyName !== dimension) {
      return
    }

    if (isExpanded()) {
      const size = measure()
      const current = parseFloat(String(styles.value[dimension] ?? ''))
      if (size === current) {
        setStyles({})
      } else {
        mergeStyles({ [dimension]: `${size}px` })
      }
      state.value = 'entered'
      onTransitionEnd?.()
    } else {
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
      requestAnimationFrame(() => {
        state.value = 'entering'
        mergeStyles({
          willChange: dimension,
          display: 'block',
          overflow: 'hidden',
        })

        requestAnimationFrame(() => {
          const size = measure()
          mergeStyles({
            ...getTransitionStyles(size),
            willChange: dimension,
            [dimension]: `${size}px`,
          })
        })
      })
    } else {
      requestAnimationFrame(() => {
        state.value = 'exiting'

        const size = measure()
        mergeStyles({
          ...getTransitionStyles(size),
          willChange: dimension,
          [dimension]: `${size}px`,
        })

        requestAnimationFrame(() => {
          mergeStyles({ [dimension]: '0px', overflow: 'hidden' })
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
