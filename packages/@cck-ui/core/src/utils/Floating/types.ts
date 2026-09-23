export type FloatingPlacement = 'end' | 'start'
export type FloatingSide = 'top' | 'right' | 'bottom' | 'left'
export type FloatingPosition = FloatingSide | `${FloatingSide}-${FloatingPlacement}`
export type ArrowPosition = 'center' | 'side' | 'merge'
export type FloatingStrategy = 'absolute' | 'fixed'

export interface FloatingAxisOffsets {
  mainAxis?: number
  crossAxis?: number
  alignmentAxis?: number | null
}
