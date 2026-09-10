import { BoxProps, ElementProps, Factory, StylesApiProps } from '../../core'

export type SpoilerStylesNames = 'root' | 'control' | 'content'
export type SpoilerCssVariables = {
  root: '--spoiler-transition-duration'
}

export interface SpoilerProps
  extends BoxProps, StylesApiProps<SpoilerFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * Maximum height of visible content in px. When content exceeds this height, the toggle control appears
   * @default 100
   */
  maxHeight?: number

  /**
   * Initial expanded state in uncontrolled mode. If `true`, content starts expanded. If `false`, content starts collapsed
   * @default false
   */
  defaultExpanded?: boolean

  /** Controlled expanded state value */
  expanded?: boolean

  /** Called when expanded state changes (when spoiler visibility is toggled by the user) */
  onExpandedChange?: (expanded: boolean) => void

  /**
   * Spoiler reveal transition duration in ms. Set to 0 to disable animation
   * @default 200
   */
  transitionDuration?: number

  /** Accessible label for the toggle button when collapsed. If not set, `showLabel` is used */
  showAriaLabel?: string

  /** Accessible label for the toggle button when expanded. If not set, `hideLabel` is used */
  hideAriaLabel?: string
}

export type SpoilerFactory = Factory<{
  props: SpoilerProps
  ref: HTMLDivElement
  stylesNames: SpoilerStylesNames
  vars: SpoilerCssVariables
}>
