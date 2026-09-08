import { createVarsResolver, getSpacing } from '../../core'
import { OverflowListFactory } from './overflow-list.types'

export const varsResolver = createVarsResolver<OverflowListFactory>((_, { gap }) => ({
  root: {
    '--ol-gap': getSpacing(gap),
  },
}))

interface NodePosition {
  elements: Set<HTMLElement>
  bottom: number
  top: number
}

function groupNodesByTopPosition(nodes: HTMLElement[]): Record<number, NodePosition> {
  if (nodes.length === 0) {
    return {}
  }

  const result: Record<number, NodePosition> = {}

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect()
    const top = Math.round(rect.top)
    const bottom = Math.round(rect.bottom)

    if (!result[top]) {
      result[top] = {
        elements: new Set<HTMLElement>(),
        bottom,
        top,
      }
    } else {
      result[top].bottom = Math.max(result[top].bottom, bottom)
    }

    result[top].elements.add(node)
  })

  return result
}

export function getRowPositionsData(
  container: HTMLElement | null,
  overflow: HTMLElement | null
): {
  itemsSizesMap: Record<number, NodePosition>
  rowPositions: number[]
  children: HTMLElement[]
} | null {
  if (!container) {
    return null
  }

  const children = Array.from(container.children).filter(
    (child) => overflow !== child
  ) as HTMLElement[]

  if (children.length === 0) {
    return null
  }

  const itemsSizesMap = groupNodesByTopPosition(children)
  const rowPositions = Object.keys(itemsSizesMap).map(Number)

  return { itemsSizesMap, rowPositions, children }
}
