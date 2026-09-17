import { BoxProps, ElementProps, Factory, GetStylesApi } from '../../../core'
import { ScrollAreaFactory } from '../scroll-area.types'

export type ScrollAreaRootStylesNames =
  | 'root'
  | 'viewport'
  | 'viewportInner'
  | 'scrollbar'
  | 'thumb'
  | 'corner'

export type ScrollAreaRootCssVariables = {
  root: '--sa-corner-width' | '--sa-corner-height'
}

export interface ScrollAreaRootStylesCtx {
  cornerWidth: number
  cornerHeight: number
}

export interface ScrollAreaRootProps extends BoxProps, /* @vue-ignore */ ElementProps<'div'> {
  getStyles: GetStylesApi<ScrollAreaFactory>
  type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never'
  scrollbars?: 'x' | 'y' | 'xy' | false
  scrollHideDelay?: number
}

export type ScrollAreaRootFactory = Factory<{
  props: ScrollAreaRootProps
  ref: HTMLDivElement
  stylesNames: ScrollAreaRootStylesNames
}>
