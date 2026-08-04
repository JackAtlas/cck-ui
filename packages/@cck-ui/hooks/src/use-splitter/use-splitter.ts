import { computed, ComputedRef, onMounted, onUnmounted, ref, shallowRef } from 'vue'

/**
 * @description Panel size expressed in CSS units. A bare `number` or `%` string is a flexible size (shares the leftover space), `px`/`rem` strings are fixed sizes that keep their pixel size when the container is resized.
 */
export type SplitterPaneSize = number | `${number}%` | `${number}px` | `${number}rem`

/**
 * @description Keyboard step expressed in CSS units. A bare `number` or `%` string is a percentage of the container, `px`/`rem` strings are resolved to pixels.
 */
export type SplitterStep = number | `${number}%` | `${number}px` | `${number}rem`

export interface UseSplitterPanel {
  /**
   * @description Initial size, a `number`/`%` is a flexible size, `px`/`rem` is a fixed size. A bare number is treated as a percentage.
   */
  defaultSize: SplitterPaneSize
  /**
   * @description Minimum size in the same units as `defaultSize`
   * @default 0
   */
  min?: SplitterPaneSize
  /**
   * @description Maximum size in the same units as `defaultSize`, no limit by default
   */
  max?: SplitterPaneSize
  /**
   * @description Whether this panel can be collapsed
   * @default false
   */
  collapsible?: boolean
  /**
   * @description Size below which the panel snaps to collapsed, defaults to `min`
   */
  collapseThreshold?: SplitterPaneSize
}

/**
 * @description Panel configuration resolved to numeric units (percent or pixels passed to redistribute functions)
 */
export interface UseSplitterResolvedPanel {
  /**
   * @description Resolved default size in the same units as redistribute sizes
   */
  defaultSize: number
  /**
   * @description Resolved minimum size
   */
  min?: number
  /**
   * @description Resolved maximum size
   */
  max?: number
  /**
   * @description Whether this panel can be collapsed
   */
  collapsible?: boolean
  /**
   * @description Resolved collapse threshold
   */
  collapseThreshold?: number
}

export interface UseSplitterRedistributeInput {
  /**
   * @description Current sizes before applying delta, in resolved units (percent or pixels)
   */
  sizes: number[]
  /**
   * @description Resolved panel configurations, in the same units as `sizes`
   */
  panels: UseSplitterResolvedPanel[]
  /**
   * @description Index of the handle being dragged
   */
  handleIndex: number
  /**
   * @description Requested size change in resolved units (positive = grow before-panel)
   */
  delta: number
}

export type UseSplitterRedistributeFn = (input: UseSplitterRedistributeInput) => number[]

export interface UseSplitterOptions {
  /**
   * @description Panel configuration array (minimum 2 panels)
   */
  panels: UseSplitterPanel[]
  /**
   * @description Layout direction
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * @description Controlled sizes, each value keeps the unit it was declared in
   */
  sizes?: SplitterPaneSize[]
  /**
   * @description Called during resize with updated sizes, each value keeps its declared unit
   */
  onSizeChange?: (sizes: SplitterPaneSize[]) => void
  /**
   * @description Called when drag starts
   */
  onResizeStart?: (handleIndex: number) => void
  /**
   * @description Called when drag ends
   */
  onResizeEnd?: (handleIndex: number, sizes: SplitterPaneSize[]) => void
  /**
   * @description Called when a panel collapses or expands
   */
  onCollapseChange?: (panelIndex: number, collapsed: boolean) => void
  /**
   * @description How to borrow space from non-adjacent panels when the immediate neighbor is at its min/max.
   * `'nearest'` takes from the nearest panel in the drag direction first.
   * `'equal'` distributes equally among all panels in the drag direction.
   * A function receives sizes, panels, handleIndex and delta, and returns new sizes.
   * When not set, only the two adjacent panels are affected.
   */
  redistribute?: 'nearest' | 'equal' | UseSplitterRedistributeFn
  /**
   * @description Keyboard step size, a `number`/`%` is a percentage, `px`/`rem` is resolved to pixels
   * @default 1
   */
  step?: SplitterStep
  /**
   * @description Shift + arrow step size, a `number`/`%` is a percentage, `px`/`rem` is resolved to pixels
   * @default 10
   */
  shiftStep?: SplitterStep
  /**
   * @description Text direction for keyboard nav
   * @default 'ltr'
   */
  dir?: 'ltr' | 'rtl'
  /**
   * @description Restore the two panels adjacent to a handle to their default ratio (preserving their combined size) when the handle is double-clicked
   * @default true
   */
  resetOnDoubleClick?: boolean
  /**
   * @description Enable/disable the hook
   * @default true
   */
  enabled?: boolean
}

export interface UseSplitterReturnValue {
  /**
   * @description Current panel sizes, each value keeps the unit it was declared in
   */
  sizes: ComputedRef<SplitterPaneSize[]>
  /**
   * @description Whether sizes are tracked in pixels because any pane size, `min`, `max`, `step`, `shiftStep` or `collapseThrehold` uses a fixed `px`/`rem` unit
   */
  pixelMode: boolean
  /**
   * @description Which panels are currently collapsed
   */
  collapsed: boolean[]
  /**
   * @description Index of handle being dragged, or -1
   */
  activeHandle: number
  /**
   * @description Ref callback for the container element
   */
  containerRef: (el: HTMLElement | null) => void
  /**
   * @description Get props to spread on each resize handle
   */
  getHandleProps: (input: { index: number }) => {
    ref: (el: HTMLElement | null) => void
    role: 'separator'
    'aria-orientation': 'horizontal' | 'vertical'
    'aria-valuenow': number
    'aria-valuemin': number
    'aria-valuemax': number
    tabIndex: number
    onKeyDown: (event: KeyboardEvent) => void
    onDoubleClick: () => void
    'data-active': boolean | undefined
    'data-orientation': 'horizontal' | 'vertical'
  }
  /**
   * @description Programmatically set sizes, each value keeps its declared unit
   */
  setSizes: (sizes: SplitterPaneSize[]) => void
  /**
   * @description Collapse a panel
   */
  collapse: (panelIndex: number) => void
  /**
   * @description Expand a collapsed panel
   */
  expand: (panelIndex: number) => void
  /**
   * @description Toggle collapse of a panel
   */
  toggleCollapse: (panelIndex: number) => void
  /**
   * @description Reset the two panels adjacent to a handle to their default ratio, preserving their combined size
   */
  reset: (handleIndex: number) => void
}

const PX_RE = /^(-?[\d.]+)px$/
const REM_RE = /^(-?[\d.]+)rem$/
const PERCENT_RE = /^(-?[\d.]+)%$/

function isFixedSize(size: SplitterPaneSize | undefined): boolean {
  return typeof size === 'string' && (PX_RE.test(size) || REM_RE.test(size))
}

function sizeMagnitude(size: SplitterPaneSize): number {
  return typeof size === 'number' ? size : parseFloat(size)
}

function detectPixelMode(options: UseSplitterOptions): boolean {
  return (
    options.panels.some(
      (panel) =>
        isFixedSize(panel.defaultSize) ||
        isFixedSize(panel.min) ||
        isFixedSize(panel.max) ||
        isFixedSize(panel.collapseThreshold)
    ) ||
    isFixedSize(options.step) ||
    isFixedSize(options.shiftStep) ||
    (options.sizes?.some(isFixedSize) ?? false)
  )
}

function getRootFontSize(): number {
  if (typeof window === 'undefined') {
    return 16
  }
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return Number.isFinite(fontSize) && fontSize > 0 ? fontSize : 16
}

function resolveSize(
  size: SplitterPaneSize,
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): number {
  if (!pixelMode) {
    return sizeMagnitude(size)
  }

  if (typeof size === 'number') {
    return (size / 100) * containerPx
  }

  const percent = PERCENT_RE.exec(size)
  if (percent) {
    return (parseFloat(percent[1]) / 100) * containerPx
  }

  const rem = REM_RE.exec(size)
  if (rem) {
    return parseFloat(rem[1]) * rootFontSize
  }

  const px = PX_RE.exec(size)
  if (px) {
    return parseFloat(px[1])
  }

  return 0
}

/**
 * @description Down-scaling factor applied to fixed panes when their combined pixel size overflows the container, so they shrink to fit (matching `resolveWorkingSizes`). Returns `1` when nothing overflows or the layout is not in pixel mode. Encoders divide by this to invert the scaling and persist the original absolute sizes instead of the shrunk-to-fit ones.
 */
function getFixedScale(
  sizes: SplitterPaneSize[],
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): number {
  if (!pixelMode) {
    return 1
  }

  let fixedTotal = 0
  sizes.forEach((size) => {
    if (isFixedSize(size)) {
      fixedTotal += resolveSize(size, true, containerPx, rootFontSize)
    }
  })

  return fixedTotal > containerPx && fixedTotal > 0 ? containerPx / fixedTotal : 1
}

/**
 * @description Resolves all sizes to pixels at once. Fixed panes get their absolute pixel size, flexible panes share the leftover space by their weight ratio - matching how the layout is rendered with `flex-grow`, so drag math operates on the same pixel sizes the user sees.
 */
function resolveWorkingSizes(
  sizes: SplitterPaneSize[],
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): number[] {
  if (!pixelMode) {
    return sizes.map((size) => sizeMagnitude(size))
  }

  let fixedTotal = 0
  let flexibleWeight = 0
  sizes.forEach((size) => {
    if (isFixedSize(size)) {
      fixedTotal += resolveSize(size, true, containerPx, rootFontSize)
    } else {
      flexibleWeight += sizeMagnitude(size)
    }
  })

  const leftover = Math.max(0, containerPx - fixedTotal)
  const fixedScale = getFixedScale(sizes, pixelMode, containerPx, rootFontSize)

  return sizes.map((size) => {
    if (isFixedSize(size)) {
      return resolveSize(size, true, containerPx, rootFontSize) * fixedScale
    }
    return flexibleWeight > 0 ? (sizeMagnitude(size) / flexibleWeight) * leftover : 0
  })
}

function encodeSize(
  value: number,
  original: SplitterPaneSize,
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number,
  fixedScale: number = 1
): SplitterPaneSize {
  if (!pixelMode) {
    return typeof original === 'string' && PERCENT_RE.test(original) ? `${value}%` : value
  }

  if (typeof original === 'number') {
    return containerPx > 0 ? (value / containerPx) * 100 : original
  }

  if (PERCENT_RE.test(original)) {
    return `${containerPx > 0 ? (value / containerPx) * 100 : parseFloat(original)}%`
  }

  const absolute = fixedScale > 0 ? value / fixedScale : value

  if (REM_RE.test(original)) {
    return `${rootFontSize > 0 ? absolute / rootFontSize : 0}rem`
  }

  return `${absolute}px`
}

/**
 * @description Encodes working pixel sizes back to raw sizes after a resize, keeping the unit each pane was declared in. Panes whose working size did not change keep their original raw value. When fixed panes overflow the container they render down-scaled, so their working sizes are scaled back up to absolute sizes (preserving their declared sizes). If the resize instead hands space to a flexible pane the overflow clears and the layout leaves the down-scaled regime: every pane is then encoded from its current working size - including untouched fixed panes (so they do not jump back to their over-sized value) and untouched flexible panes (so a pane that was squeezed to `0` does not keep a stale weight and steal the freed space on the next render)
 */
function encodeWorkingSizes(
  nextWorking: number[],
  baseWorking: number[],
  baseRaw: SplitterPaneSize[],
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): SplitterPaneSize[] {
  const fixedScale = getFixedScale(baseRaw, pixelMode, containerPx, rootFontSize)

  let fixedWorkingSum = 0
  nextWorking.forEach((value, i) => {
    if (isFixedSize(baseRaw[i])) {
      fixedWorkingSum += value
    }
  })
  const overflowCleared = fixedScale < 1 && fixedWorkingSum < containerPx - 1e-6
  const encodeScale = overflowCleared ? 1 : fixedScale

  return nextWorking.map((value, i) =>
    overflowCleared || Math.abs(value - baseWorking[i]) > 1e-6
      ? encodeSize(value, baseRaw[i], pixelMode, containerPx, rootFontSize, encodeScale)
      : baseRaw[i]
  )
}

function resolvePanel(
  panel: UseSplitterPanel,
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): UseSplitterResolvedPanel {
  return {
    defaultSize: resolveSize(panel.defaultSize, pixelMode, containerPx, rootFontSize),
    min: panel.min != null ? resolveSize(panel.min, pixelMode, containerPx, rootFontSize) : 0,
    max:
      panel.max != null
        ? resolveSize(panel.max, pixelMode, containerPx, rootFontSize)
        : pixelMode
          ? containerPx
          : 100,
    collapseThreshold:
      panel.collapseThreshold != null
        ? resolveSize(panel.collapseThreshold, pixelMode, containerPx, rootFontSize)
        : undefined,
    collapsible: panel.collapsible,
  }
}

function resolveStep(
  step: SplitterStep,
  pixelMode: boolean,
  containerPx: number,
  rootFontSize: number
): number {
  return resolveSize(step, pixelMode, containerPx, rootFontSize)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function getMin(panel: UseSplitterResolvedPanel): number {
  return panel.min ?? 0
}

function getMax(panel: UseSplitterResolvedPanel): number {
  return panel.max ?? Infinity
}

function getCollapseThreshold(panel: UseSplitterResolvedPanel): number {
  return panel.collapseThreshold ?? getMin(panel)
}

function checkCollapse(
  sizes: number[],
  panels: UseSplitterResolvedPanel[],
  handleIndex: number,
  delta: number
): number[] | null {
  const beforeIdx = handleIndex
  const afterIdx = handleIndex + 1
  const beforePanel = panels[beforeIdx]
  const afterPanel = panels[afterIdx]

  const rawBefore = sizes[beforeIdx] + delta
  const rawAfter = sizes[afterIdx] - delta

  if (
    beforePanel.collapsible &&
    rawBefore < getCollapseThreshold(beforePanel) &&
    rawBefore < sizes[beforeIdx]
  ) {
    const result = [...sizes]
    result[afterIdx] += result[beforeIdx]
    result[beforeIdx] = 0
    return result
  }

  if (
    afterPanel.collapsible &&
    rawAfter < getCollapseThreshold(afterPanel) &&
    rawAfter < sizes[afterIdx]
  ) {
    const result = [...sizes]
    result[beforeIdx] += result[afterIdx]
    result[afterIdx] = 0
    return result
  }

  return null
}

function applyAdjacentOnly(
  sizes: number[],
  panels: UseSplitterResolvedPanel[],
  handleIndex: number,
  delta: number
): number[] {
  const result = [...sizes]
  const beforeIdx = handleIndex
  const afterIdx = handleIndex + 1
  const total = result[beforeIdx] + result[afterIdx]
  const effectiveBeforeMax = Math.min(getMax(panels[beforeIdx]), total - getMin(panels[afterIdx]))
  const effectiveBeforeMin = Math.max(getMin(panels[beforeIdx]), total - getMax(panels[afterIdx]))
  const newBefore = clamp(result[beforeIdx] + delta, effectiveBeforeMin, effectiveBeforeMax)
  result[beforeIdx] = newBefore
  result[afterIdx] = total - newBefore
  return result
}

function redistributeNearest(
  sizes: number[],
  panels: UseSplitterResolvedPanel[],
  handleIndex: number,
  delta: number
): number[] {
  const result = [...sizes]
  if (delta > 0) {
    const growIdx = handleIndex
    const maxGrow = getMax(panels[growIdx]) - result[growIdx]
    const wantedGrow = Math.min(delta, maxGrow)
    let taken = 0
    for (let i = handleIndex + 1; i < result.length && taken < wantedGrow; i += 1) {
      const canGive = result[i] - getMin(panels[i])
      const take = Math.min(canGive, wantedGrow - taken)
      result[i] -= take
      taken += take
    }
    result[growIdx] += taken
  } else if (delta < 0) {
    const growIdx = handleIndex + 1
    const maxGrow = getMax(panels[growIdx]) - result[growIdx]
    const wantedGrow = Math.min(Math.abs(delta), maxGrow)
    let taken = 0
    for (let i = handleIndex; i >= 0 && taken < wantedGrow; i -= 1) {
      const canGive = result[i] - getMin(panels[i])
      const take = Math.min(canGive, wantedGrow - taken)
      result[i] -= take
      taken += take
    }
    result[growIdx] += taken
  }
  return result
}

function redistributeEqual(
  sizes: number[],
  panels: UseSplitterResolvedPanel[],
  handleIndex: number,
  delta: number
): number[] {
  const result = [...sizes]
  if (delta > 0) {
    const growIdx = handleIndex
    const maxGrow = getMax(panels[growIdx]) - result[growIdx]
    const wantedGrow = Math.min(delta, maxGrow)
    const donors: number[] = []
    for (let i = handleIndex + 1; i < result.length; i += 1) {
      if (result[i] > getMin(panels[i])) {
        donors.push(i)
      }
    }
    let remaining = wantedGrow
    while (remaining > 0.001 && donors.length > 0) {
      const perDonor = remaining / donors.length
      const exhausted: number[] = []
      for (let d = 0; d < donors.length; d += 1) {
        const idx = donors[d]
        const canGive = result[idx] - getMin(panels[idx])
        const take = Math.min(canGive, perDonor)
        result[idx] -= take
        remaining -= take
        if (canGive <= perDonor + 0.001) {
          exhausted.push(d)
        }
      }
      for (let i = exhausted.length - 1; i >= 0; i -= 1) {
        donors.splice(exhausted[i], 1)
      }
      if (exhausted.length === 0) {
        break
      }
    }
    result[growIdx] += wantedGrow - remaining
  } else if (delta < 0) {
    const growIdx = handleIndex + 1
    const maxGrow = getMax(panels[growIdx]) - result[growIdx]
    const wantedGrow = Math.min(Math.abs(delta), maxGrow)
    const donors: number[] = []
    for (let i = handleIndex; i >= 0; i -= 1) {
      if (result[i] > getMin(panels[i])) {
        donors.push(i)
      }
    }
    let remaining = wantedGrow
    while (remaining > 0.001 && donors.length > 0) {
      const perDonor = remaining / donors.length
      const exhausted: number[] = []
      for (let d = 0; d < donors.length; d += 1) {
        const idx = donors[d]
        const canGive = result[idx] - getMin(panels[idx])
        const take = Math.min(canGive, perDonor)
        result[idx] -= take
        remaining -= take
        if (canGive <= perDonor + 0.001) {
          exhausted.push(d)
        }
      }
      for (let i = exhausted.length - 1; i >= 0; i -= 1) {
        donors.splice(exhausted[i], 1)
      }
      if (exhausted.length === 0) {
        break
      }
    }
    result[growIdx] += wantedGrow - remaining
  }
  return result
}

function applyConstraints(
  sizes: number[],
  panels: UseSplitterResolvedPanel[],
  handleIndex: number,
  delta: number,
  redistribute?: 'nearest' | 'equal' | UseSplitterRedistributeFn
): number[] {
  if (typeof redistribute === 'function') {
    return redistribute({ sizes: [...sizes], panels, handleIndex, delta })
  }

  if (redistribute === 'nearest' || redistribute === 'equal') {
    const strategy = redistribute === 'nearest' ? redistributeNearest : redistributeEqual
    const result = strategy(sizes, panels, handleIndex, delta)

    const beforeIdx = handleIndex
    const afterIdx = handleIndex + 1
    const beforePanel = panels[beforeIdx]
    const afterPanel = panels[afterIdx]

    if (
      beforePanel.collapsible &&
      result[beforeIdx] < getCollapseThreshold(beforePanel) &&
      result[beforeIdx] < sizes[beforeIdx]
    ) {
      const freed = result[beforeIdx]
      result[afterIdx] += freed
      result[beforeIdx] = 0
    } else if (
      afterPanel.collapsible &&
      result[afterIdx] < getCollapseThreshold(afterPanel) &&
      result[afterIdx] < sizes[afterIdx]
    ) {
      const freed = result[afterIdx]
      result[beforeIdx] += freed
      result[afterIdx] = 0
    }

    return result
  }

  const collapsed = checkCollapse(sizes, panels, handleIndex, delta)
  if (collapsed) {
    return collapsed
  }

  return applyAdjacentOnly(sizes, panels, handleIndex, delta)
}

export function useSplitter(options: UseSplitterOptions): UseSplitterReturnValue {
  const {
    panels,
    orientation = 'horizontal',
    sizes: controlledSizes,
    onSizeChange,
    onCollapseChange,
    redistribute,
    step = 1,
    shiftStep = 10,
    dir = 'ltr',
    resetOnDoubleClick = true,
    enabled = true,
  } = options

  const pixelMode = detectPixelMode(options)

  const currentSizes = ref<SplitterPaneSize[]>([])
  const activeHandle = ref(-1)
  const containerSize = ref(0)
  const containerEl = shallowRef<HTMLElement | null>(null)
  const rootFontSizeRef = ref(16)
  const preCollapseSizes = ref<SplitterPaneSize[]>([])
  const handleElementControllers = new Map<number, AbortController>()
  const documentController = shallowRef<AbortController | null>(null)
  const frameId = ref(0)
  const isDragging = ref(false)
  const startData = ref<{
    handleIndex: number
    startPointer: number
    containerSize: number
    rootFontSize: number
    pixelMode: boolean
    startSizes: number[]
    startRaw: SplitterPaneSize[]
  } | null>(null)

  const optionsRef = shallowRef(options)
  optionsRef.value = options

  const defaultSizes = panels.map((p) => p.defaultSize)

  const initSizes = () => {
    if (controlledSizes) {
      currentSizes.value = [...controlledSizes]
    } else {
      currentSizes.value = [...defaultSizes]
    }
  }
  initSizes()

  const collapsed = computed(() => currentSizes.value.map((s) => sizeMagnitude(s) === 0))

  const updateSizes = (newSizes: SplitterPaneSize[]) => {
    currentSizes.value = newSizes
    onSizeChange?.(newSizes)
  }

  const measureContainer = (): number => {
    const node = containerEl.value
    if (!node) {
      return 0
    }
    const rect = node.getBoundingClientRect()
    return orientation === 'horizontal' ? rect.width : rect.height
  }

  const collapsePanel = (panelIndex: number) => {
    if (!panels[panelIndex]?.collapsible) {
      return
    }
    if (sizeMagnitude(currentSizes.value[panelIndex]) === 0) {
      return
    }

    const container = pixelMode ? containerSize.value || measureContainer() : 0
    const rootFontSize = rootFontSizeRef.value
    const working = resolveWorkingSizes(currentSizes.value, pixelMode, container, rootFontSize)

    preCollapseSizes.value = [...currentSizes.value]
    const freedSize = working[panelIndex]
    working[panelIndex] = 0

    const neighbor = panelIndex === 0 ? 1 : panelIndex - 1
    working[neighbor] += freedSize

    updateSizes(
      working.map((value, i) =>
        encodeSize(value, currentSizes.value[i], pixelMode, container, rootFontSize)
      )
    )
    onCollapseChange?.(panelIndex, true)
  }

  const expandPanel = (panelIndex: number) => {
    if (!panels[panelIndex]?.collapsible) {
      return
    }
    if (sizeMagnitude(currentSizes.value[panelIndex]) !== 0) {
      return
    }

    const container = pixelMode ? containerSize.value || measureContainer() : 0
    const rootFontSize = rootFontSizeRef.value
    const working = resolveWorkingSizes(currentSizes.value, pixelMode, container, rootFontSize)

    const preCollapse = preCollapseSizes.value
    const restoreSource =
      preCollapse[panelIndex] != null && sizeMagnitude(preCollapse[panelIndex]) !== 0
        ? preCollapse[panelIndex]
        : panels[panelIndex].defaultSize
    const restoreSize = resolveSize(restoreSource, pixelMode, container, rootFontSize)

    const neighbor = panelIndex === 0 ? 1 : panelIndex - 1
    const neighborMin =
      panels[neighbor].min != null
        ? resolveSize(panels[neighbor].min!, pixelMode, container, rootFontSize)
        : 0
    const available = Math.max(0, working[neighbor] - neighborMin)
    const actualRestore = Math.min(restoreSize, available)

    if (actualRestore <= 0) {
      return
    }

    working[panelIndex] = actualRestore
    working[neighbor] -= actualRestore

    updateSizes(
      working.map((value, i) =>
        encodeSize(value, currentSizes.value[i], pixelMode, container, rootFontSize)
      )
    )
    onCollapseChange?.(panelIndex, false)
  }

  const toggleCollapsePanel = (panelIndex: number) => {
    if (sizeMagnitude(currentSizes.value[panelIndex]) === 0) {
      expandPanel(panelIndex)
    } else {
      collapsePanel(panelIndex)
    }
  }

  const reset = (handleIndex: number) => {
    const raw = currentSizes.value
    const beforeIdx = handleIndex
    const afterIdx = handleIndex + 1
    if (beforeIdx < 0 || afterIdx >= raw.length) {
      return
    }

    const container = pixelMode ? containerSize.value || measureContainer() : 0
    const rootFontSize = rootFontSizeRef.value
    const working = resolveWorkingSizes(raw, pixelMode, container, rootFontSize)
    const resolvedPanels = panels.map((p) => resolvePanel(p, pixelMode, container, rootFontSize))

    const total = working[beforeIdx] + working[afterIdx]
    const defBefore = resolvedPanels[beforeIdx].defaultSize
    const defAfter = resolvedPanels[afterIdx].defaultSize
    const defTotal = defBefore + defAfter
    const targetBefore = defTotal === 0 ? total / 2 : total * (defBefore / defTotal)

    const next = applyAdjacentOnly(
      working,
      resolvedPanels,
      beforeIdx,
      targetBefore - working[beforeIdx]
    )
    updateSizes(encodeWorkingSizes(next, working, raw, pixelMode, container, rootFontSize))
  }

  const containerRef = (el: HTMLElement | null) => {
    containerEl.value = el
  }

  onMounted(() => {
    const node = containerEl.value
    if (!node) {
      return
    }

    const update = () => {
      const rect = node.getBoundingClientRect()
      const size = orientation === 'horizontal' ? rect.width : rect.height
      rootFontSizeRef.value = getRootFontSize()
      containerSize.value = size
    }

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frameId.value)
        frameId.value = requestAnimationFrame(update)
      })
      observer.observe(node)
      update()

      onUnmounted(() => {
        cancelAnimationFrame(frameId.value)
        observer.disconnect()
      })
    } else {
      update()
    }
  })

  onUnmounted(() => {
    documentController.value?.abort()
    handleElementControllers.forEach((c) => c.abort())
    handleElementControllers.clear()
    cancelAnimationFrame(frameId.value)
  })

  const getHandleRefCallback = (handleIndex: number): ((el: HTMLElement | null) => void) => {
    let controller = handleElementControllers.get(handleIndex)

    const callback = (node: HTMLElement | null) => {
      if (controller) {
        controller.abort()
        handleElementControllers.delete(handleIndex)
        controller = undefined
      }

      if (!node) {
        return
      }

      controller = new AbortController()
      handleElementControllers.set(handleIndex, controller)

      const onPointerDown = (event: PointerEvent) => {
        if (optionsRef.value.enabled === false) {
          return
        }
        if (event.button !== 0) {
          return
        }

        const container = containerEl.value
        if (!container) {
          return
        }

        const opts = optionsRef.value
        const isHorizontal = (opts.orientation ?? 'horizontal') === 'horizontal'
        const rect = container.getBoundingClientRect()
        const containerSizePx = isHorizontal ? rect.width : rect.height
        const pointerPos = isHorizontal ? event.clientX : event.clientY
        const isPixelMode = detectPixelMode(opts)
        const rootFontSize = getRootFontSize()

        const raw = currentSizes.value
        const startSizes = resolveWorkingSizes(raw, isPixelMode, containerSizePx, rootFontSize)
        preCollapseSizes.value = [...raw]

        isDragging.value = true
        activeHandle.value = handleIndex
        startData.value = {
          handleIndex,
          startPointer: pointerPos,
          containerSize: containerSizePx,
          rootFontSize,
          pixelMode: isPixelMode,
          startSizes,
          startRaw: [...raw],
        }

        document.body.style.userSelect = 'none'
        document.body.style.webkitUserSelect = 'none'
        document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize'

        opts.onResizeStart?.(handleIndex)

        documentController.value?.abort()
        documentController.value = new AbortController()
        const sig = documentController.value.signal

        document.addEventListener('pointermove', onPointerMove, { signal: sig })
        document.addEventListener('pointerup', onPointerUp, { signal: sig })
        document.addEventListener('pointercancel', onPointerUp, { signal: sig })
      }

      const flushResize = (pointerEvent: PointerEvent) => {
        const data = startData.value
        if (!data) {
          return
        }
        const opts = optionsRef.value
        const isHorizontal = (opts.orientation ?? 'horizontal') === 'horizontal'
        const isRtl = isHorizontal && opts.dir === 'rtl'
        const pointerPos = isHorizontal ? pointerEvent.clientX : pointerEvent.clientY
        const pixelDelta = (isRtl ? -1 : 1) * (pointerPos - data.startPointer)
        const delta = data.pixelMode ? pixelDelta : (pixelDelta / data.containerSize) * 100

        const resolvedPanels = panels.map((p) =>
          resolvePanel(p, data.pixelMode, data.containerSize, data.rootFontSize)
        )

        const newSizes = applyConstraints(
          data.startSizes,
          resolvedPanels,
          data.handleIndex,
          delta,
          opts.redistribute
        )

        const encoded = encodeWorkingSizes(
          newSizes,
          data.startSizes,
          data.startRaw,
          data.pixelMode,
          data.containerSize,
          data.rootFontSize
        )
        updateSizes(encoded)
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!isDragging.value) {
          return
        }
        cancelAnimationFrame(frameId.value)
        frameId.value = requestAnimationFrame(() => flushResize(event))
      }

      const onPointerUp = (event: PointerEvent) => {
        if (!isDragging.value) {
          return
        }
        cancelAnimationFrame(frameId.value)
        flushResize(event)

        isDragging.value = false
        const finishHandle = activeHandle.value
        activeHandle.value = -1

        document.body.style.userSelect = ''
        document.body.style.webkitUserSelect = ''
        document.body.style.cursor = ''

        documentController.value?.abort()
        documentController.value = null

        optionsRef.value.onResizeEnd?.(finishHandle, [...currentSizes.value])
        startData.value = null
      }

      node.addEventListener('pointerdown', onPointerDown, { signal: controller.signal })
    }

    return callback
  }

  const getHandleProps = (input: { index: number }) => {
    const { index } = input
    const orient = orientation
    const rootFontSize = rootFontSizeRef.value
    const working = resolveWorkingSizes(
      currentSizes.value,
      pixelMode,
      containerSize.value,
      rootFontSize
    )
    const resolvedPanels = panels.map((p) =>
      resolvePanel(p, pixelMode, containerSize.value, rootFontSize)
    )
    const beforeSize = working[index] ?? 0
    const beforePanel = resolvedPanels[index]

    const onKeyDown = (event: KeyboardEvent) => {
      if (!enabled) {
        return
      }

      const isHorizontal = orient === 'horizontal'
      const isRtl = dir === 'rtl'
      const container = pixelMode ? containerSize.value || measureContainer() : 0
      const liveRootFontSize = rootFontSizeRef.value
      const liveWorking = resolveWorkingSizes(
        currentSizes.value,
        pixelMode,
        container,
        liveRootFontSize
      )
      const livePanels = panels.map((p) => resolvePanel(p, pixelMode, container, liveRootFontSize))
      const liveBeforePanel = livePanels[index]
      const liveAfterPanel = livePanels[index + 1]

      let delta = 0
      const currentStep = resolveStep(
        event.shiftKey ? shiftStep : step,
        pixelMode,
        container,
        liveRootFontSize
      )

      switch (event.key) {
        case 'ArrowLeft':
          if (!isHorizontal) {
            return
          }
          delta = isRtl ? currentStep : -currentStep
          break
        case 'ArrowRight':
          if (!isHorizontal) {
            return
          }
          delta = isRtl ? -currentStep : currentStep
          break
        case 'ArrowUp':
          if (isHorizontal) {
            return
          }
          delta = -currentStep
          break
        case 'ArrowDown':
          if (isHorizontal) {
            return
          }
          delta = currentStep
          break
        case 'Home':
          delta = -(liveWorking[index] - getMin(liveBeforePanel))
          break
        case 'End':
          delta = getMax(liveBeforePanel) - liveWorking[index]
          break
        case 'Enter':
          const beforeCollapsible = liveBeforePanel?.collapsible
          const afterCollapsible = liveAfterPanel?.collapsible

          if (beforeCollapsible && liveWorking[index] <= liveWorking[index + 1]) {
            toggleCollapsePanel(index)
            event.preventDefault()
            return
          }
          if (afterCollapsible) {
            toggleCollapsePanel(index + 1)
            event.preventDefault()
            return
          }
          if (beforeCollapsible) {
            toggleCollapsePanel(index)
            event.preventDefault()
            return
          }
          return
        default:
          return
      }

      event.preventDefault()
      if (delta !== 0) {
        const newSizes = applyConstraints(liveWorking, livePanels, index, delta, redistribute)
        updateSizes(
          encodeWorkingSizes(
            newSizes,
            liveWorking,
            currentSizes.value,
            pixelMode,
            container,
            liveRootFontSize
          )
        )
      }
    }

    const onDoubleClick = () => {
      if (!enabled || !resetOnDoubleClick) {
        return
      }
      reset(index)
    }

    return {
      ref: getHandleRefCallback(index),
      role: 'separator' as const,
      'aria-orientation': orient,
      'aria-valuenow': Math.round(beforeSize),
      'aria-valuemin': Math.round(getMin(beforePanel)),
      'aria-valuemax': Math.round(getMax(beforePanel)),
      tabIndex: 0,
      onKeyDown,
      onDoubleClick,
      'data-active': activeHandle.value === index || undefined,
      'data-orientation': orient,
    }
  }

  const sizes = computed(() => currentSizes.value)

  return {
    sizes,
    pixelMode,
    collapsed: collapsed.value,
    activeHandle: activeHandle.value,
    containerRef,
    getHandleProps,
    setSizes: updateSizes,
    collapse: collapsePanel,
    expand: expandPanel,
    toggleCollapse: toggleCollapsePanel,
    reset,
  }
}
