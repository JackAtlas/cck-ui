import { VNode } from 'vue'
import { BoxProps, CSpacing, ElementProps, Factory, StylesApiProps } from '../../core'

export type BreadcrumbsStylesNames = 'root' | 'separator' | 'breadcrumb'
export type BreadcrumbsCssVariables = {
  root: '--bc-separator-margin'
}

export type SeparatorRenderer = (child: VNode, index: number, length: number) => string | VNode

export interface BreadcrumbsProps
  extends BoxProps, StylesApiProps<BreadcrumbsFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Separator between children
   * @default '/'
   */
  separator?: string | VNode | SeparatorRenderer

  /**
   * Controls spacing between separator and breadcrumb
   * @default 'xs'
   */
  separatorMargin?: CSpacing
}

export type BreadcrumbsFactory = Factory<{
  props: BreadcrumbsProps
  ref: HTMLDivElement
  stylesNames: BreadcrumbsStylesNames
  vars: BreadcrumbsCssVariables
}>
