import { CStyleProp } from '../../../core'
import { ArrowPosition, FloatingPosition } from '../types'

export interface FloatingArrowProps {
  position: FloatingPosition
  arrowSize: number
  arrowOffset: number
  arrowRadius: number
  arrowPosition: ArrowPosition
  arrowX: number | undefined
  arrowY: number | undefined
  visible: boolean | undefined
  style?: CStyleProp
}
