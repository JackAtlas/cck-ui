import { Properties } from 'csstype'
import { BoxComponentProps, CSize, ElementProps, Factory, StylesApiProps } from '../../core'
import { PortalProps } from '../portal'

export type AffixStylesNames = 'root'
export type AffixCssVariables = {
  root: '--affix-z-index' | '--affix-top' | '--affix-left' | '--affix-bottom' | '--affix-right'
}

export interface AffixPosition {
  top?: CSize | (string & {}) | number
  left?: CSize | (string & {}) | number
  bottom?: CSize | (string & {}) | number
  right?: CSize | (string & {}) | number
}

export interface AffixBaseProps {
  /**
   * Root element `z-index` property
   * @default 200
   */
  zIndex?: Properties['zIndex']

  /**
   * Determines whether the component is rendered within `Portal`
   * @default true
   */
  withinPortal?: boolean

  /** Props passed down to the `Portal` component. Ignored when `withinPortal` is `false` */
  portalProps?: PortalProps

  /**
   * Affix position on screen
   * @default { bottom: 0, right: 0 }
   */
  position?: AffixPosition
}

export interface AffixProps
  extends
    BoxComponentProps,
    AffixBaseProps,
    StylesApiProps<AffixFactory>,
    /* @vue-ignore */ ElementProps<'div'> {}

export type AffixFactory = Factory<{
  props: AffixProps
  ref: HTMLDivElement
  stylesNames: AffixStylesNames
  vars: AffixCssVariables
}>
