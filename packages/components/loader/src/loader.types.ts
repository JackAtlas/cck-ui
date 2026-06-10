import { CColor, CSize } from '@cck-ui/constants'
import { Component } from 'vue'
import { JSX } from 'vue/jsx-runtime'

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

export type CLoaderComponent = Component<
  // Props: HTML attributes + ref support
  Record<string, any> & {
    ref?: any
  }
>

/**
 * Registry of loader components keyed by name.
 * Supports built-in 'bars' | 'dots' | 'oval' and any custom string.
 */
export type CLoadersRecord = Partial<
  Record<'bars' | 'dots' | 'oval' | (string & {}), CLoaderComponent>
>
export type CLoaderType = keyof CLoadersRecord

export interface LoaderProps extends /* @vue-ignore */ ElementProps<
  'svg',
  'display' | 'opacity'
> {
  /**
   * @description Key of `theme.colors` or any valid CSS color
   * @default theme.primaryColor
   */
  color?: CColor

  /**
   * @description Object of loaders components, can be customized via default props or inline.
   */
  loaders?: CLoadersRecord

  /**
   * @description Controls `width` and `height` of the loader. `Loader` has predefined `xs`-`xl` values. Numbers are converted to rem.
   * @default 'md'
   */
  size?: CSize | (string & {}) | number

  /**
   * @description Loader type, key of `loaders` prop
   * @default 'oval'
   */
  type?: CLoaderType
}
