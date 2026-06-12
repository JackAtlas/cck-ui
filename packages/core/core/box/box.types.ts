import { Properties } from 'csstype'
import { CStyleProps } from './style-props/style-props.types'
import { CBreakpoint, CTheme } from '../config-provider/theme.types'
import { JSX } from 'vue/jsx-runtime'

export interface CSSProperties extends Properties {
  [key: string]: any
}

type CStyle = CSSProperties | ((theme: CTheme) => CSSProperties)
export type CStyleProp = CStyle | CStyle[] | CStyleProp[] | undefined

export type CssVariable = `--${string}`

export type CssVariables<Variable extends string = CssVariable> = Partial<
  Record<Variable, string>
>

export type CssVars<Variable extends string = CssVariable> =
  | CssVariables<Variable>
  | ((theme: CTheme) => CssVariables<Variable>)
  | CssVars<Variable>[]

export type CssVarsProp<Variable extends string = CssVariable> =
  | CssVars<Variable>
  | CssVars<Variable>[]

export type Mod = Record<string, any> | string
export type BoxMod = Mod | Mod[] | BoxMod[]

export interface BoxProps extends CStyleProps {
  /**
   * @description Class added to component root element, if applicable
   */
  className?: string

  /**
   * @description Inline style added to component root element, can subscribe to theme defined on provider
   */
  style?: CStyleProp

  /**
   * @description CSS variables defined on component root element
   */
  __vars?: CssVarsProp

  /**
   * @description `size` property passed down the HTML element
   */
  __size?: string

  /**
   * @description Breakpoint above which the component is hidden with `display: none`
   */
  hiddenFrom?: CBreakpoint

  /**
   * @description Breakpoint below which the component is hidden with `display: none`
   */
  visibleFrom?: CBreakpoint

  /**
   * @description Determines whether component should be hidden in light color scheme with `display: none`
   */
  lightHidden?: boolean

  /**
   * @description Determines whether component should be hidden in dark color scheme with `display: none`
   */
  darkHidden?: boolean

  /**
   * @description Element modifiers transformed into `data-` attributes, for example, `{ 'data-size': 'xl' }`, falsy values are removed
   */
  mod?: BoxMod
}

/**
 * @description Extracts props from a Vue component or HTML element, omitting specified keys.
 *
 * @example
 * type SvgProps = ElementProps<'svg', 'style' | 'display'>
 */
export type ElementProps<
  Tag extends keyof JSX.IntrinsicElements,
  PropsToOmit extends string = never
> = Omit<JSX.IntrinsicElements[Tag], 'style' | PropsToOmit>

export interface BoxComponentProps extends BoxProps {
  /**
   * @description Size passed from parent component, sets `data-size` if value is not number like
   */
  size?: string | number

  /**
   * @description Variant passed from parent component, sets `data-variant`
   */
  variant?: string
}
