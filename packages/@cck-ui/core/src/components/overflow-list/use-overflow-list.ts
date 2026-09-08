import { computed, nextTick, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue'
import { OverflowListProps } from './overflow-list.types'
import { getRowPositionsData } from './overflow-list.utils'

export function useOverflowList(
  props: Ref<OverflowListProps>,
  containerRef: Ref<HTMLElement | null>,
  overflowRef: Ref<HTMLElement | null>
) {
  const visibleCount = ref(props.value.data.length)
  const subtractCount = ref(0)
  const phase = ref<'normal' | 'measuring' | 'measuring-overflow-indicator'>('normal')
  const isMeasuring = computed(() => phase.value !== 'normal')

  const finalVisibleCount = computed(() => visibleCount.value - subtractCount.value)
  const isCollapseStart = computed(() => props.value.collapseFrom === 'start')

  const fitsInRows = (
    itemWidths: number[],
    containerWidth: number,
    columnGap: number,
    startIndex = 0
  ) => {
    let rows = 1
    let rowWidth = 0
    const maxRows = props.value.maxRows || 1

    for (let i = startIndex; i < itemWidths.length; i++) {
      const width = itemWidths[i]
      const needed = rowWidth > 0 ? width + columnGap : width

      if (rowWidth + needed > containerWidth && rowWidth > 0) {
        rows++
        if (rows > maxRows) {
          return false
        }
        rowWidth = width
      } else {
        rowWidth += needed
      }
    }

    return true
  }

  const countVisibleItems = () => {
    const container = containerRef.value
    const overflow = overflowRef.value
    if (!container || !overflow) {
      return
    }
    const rowData = getRowPositionsData(container, overflow)
    if (!rowData) {
      return
    }

    const isStart = isCollapseStart.value
    if (isStart) {
      const containerWidth = container.getBoundingClientRect().width
      const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
      const children = rowData.children
      const widths = children.map((child) => child.getBoundingClientRect().width)

      let count = 0
      for (let i = widths.length - 1; i >= 0; i--) {
        if (!fitsInRows(widths, containerWidth, columnGap, i)) {
          break
        }
        count = widths.length - i
      }

      count = Math.min(count, props.value.maxVisibleItems || Infinity)
      visibleCount.value = count
      return
    }

    if (props.value.data.length === 1) {
      const itemRef = rowData.itemsSizesMap[rowData.rowPositions[0]].elements.values().next().value
      const containerWidth = container.getBoundingClientRect().width
      const itemWidth = itemRef?.getBoundingClientRect().width ?? 0
      visibleCount.value = itemWidth > containerWidth ? 0 : 1
      return
    }

    const visibleRowPositions = rowData.rowPositions.slice(0, props.value.maxRows || 1)

    let fittingCount = visibleRowPositions.reduce((acc, position) => {
      return acc + rowData.itemsSizesMap[position]?.elements.size || 0
    }, 0)

    fittingCount = Math.min(fittingCount, props.value.maxVisibleItems || Infinity)
    visibleCount.value = fittingCount
  }

  const updateOverflowIndicator = () => {
    const container = containerRef.value
    const overflow = overflowRef.value
    if (!overflow || !container) {
      return false
    }
    const rowData = getRowPositionsData(container, overflow)
    if (!rowData) {
      return false
    }

    const { rowPositions, itemsSizesMap } = rowData

    const isStart = isCollapseStart.value
    if (isStart) {
      const containerWidth = container.getBoundingClientRect().width
      const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
      const overflowWidth = overflow.getBoundingClientRect().width
      const children = rowData.children
      const itemWidths = [
        overflowWidth,
        ...children.map((child) => child.getBoundingClientRect().width),
      ]

      if (!fitsInRows(itemWidths, containerWidth, columnGap)) {
        subtractCount.value += 1
        return true
      }

      return false
    }

    const overflowRect = overflow.getBoundingClientRect()
    const overflowMiddleY = overflowRect.top + overflowRect.height / 2
    const lastRowTop = rowPositions[rowPositions.length - 1]
    const lastRow = itemsSizesMap[lastRowTop]

    if (overflowMiddleY > lastRow.bottom) {
      subtractCount.value += 1
      return true
    }

    return false
  }

  function startMeasuring() {
    phase.value = 'measuring'
    visibleCount.value = props.value.data.length
    subtractCount.value = 0
  }

  function afterMeasure() {
    if (phase.value !== 'measuring') {
      return
    }
    countVisibleItems()
    phase.value = 'measuring-overflow-indicator'
  }

  function afterOverflowMeasure() {
    if (phase.value !== 'measuring-overflow-indicator') {
      return
    }
    const updated = updateOverflowIndicator()
    if (!updated) {
      phase.value = 'normal'
    } else {
      let retries = 0
      const loop = () => {
        if (phase.value !== 'measuring-overflow-indicator' || retries > 10) {
          return
        }
        retries++
        nextTick(() => {
          const stillUpdated = updateOverflowIndicator()
          if (stillUpdated) {
            loop()
          } else {
            phase.value = 'normal'
          }
        })
      }
      loop()
    }
  }

  function resetAndMeasure() {
    startMeasuring()
    nextTick(() => {
      afterMeasure()
      nextTick(afterOverflowMeasure)
    })
  }

  watch(
    () => [
      props.value.data,
      props.value.maxRows,
      props.value.collapseFrom,
      props.value.maxVisibleItems,
    ],
    resetAndMeasure,
    { deep: true, flush: 'post' }
  )

  let resizeObserver: ResizeObserver | null = null
  onMounted(() => {
    const container = containerRef.value
    if (container) {
      resizeObserver = new ResizeObserver(() => {
        resetAndMeasure()
      })
      resizeObserver.observe(container)
      resetAndMeasure()
    }
  })
  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  const overflowItems = computed(() => {
    const data = props.value.data
    const count = finalVisibleCount.value
    if (isCollapseStart.value) {
      return data.slice(0, data.length - count)
    }
    return data.slice(count)
  })

  const finalItems = computed(() => {
    const data = props.value.data
    const maxVisible = props.value.maxVisibleItems || Infinity
    if (isCollapseStart.value) {
      return data.slice(-maxVisible)
    }
    return data.slice(0, maxVisible)
  })

  const indexOffset = computed(() => {
    const data = props.value.data
    const maxVisible = props.value.maxVisibleItems || Infinity
    const final = isCollapseStart.value ? data.slice(-maxVisible) : data.slice(0, maxVisible)
    return isCollapseStart.value ? data.length - final.length : 0
  })

  return {
    visibleCount,
    subtractCount,
    phase,
    finalVisibleCount,
    isCollapseStart,
    overflowItems,
    finalItems,
    indexOffset,
    isMeasuring,
    resetAndMeasure,
  }
}
