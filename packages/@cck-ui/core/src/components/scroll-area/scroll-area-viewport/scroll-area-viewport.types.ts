import { Ref } from 'vue'
import { BoxProps, CStyleProp, ElementProps } from '../../../core'

export interface ScrollAreaViewportProps extends BoxProps, /* @vue-ignore */ ElementProps<'div'> {
  viewportRef?: Ref<HTMLDivElement | null> | ((el: HTMLDivElement | null) => void)
  onWheel?: (event: WheelEvent) => void
  style?: CStyleProp
}
