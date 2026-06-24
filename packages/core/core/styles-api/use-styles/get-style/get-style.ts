import { CTheme } from '@cck-ui/core'
import { Properties } from 'csstype'
import { GetStylesApiOptions } from '../../styles-api.types'
import { resolveStyle } from './resolve-style/resolve-style'
import { resolveStyles } from './resolve-styles/resolve-styles'

type __Styles =
  | undefined
  | Partial<Record<string, Properties>>
  | ((
      theme: CTheme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined
    ) => Partial<Record<string, Properties>>)

export type _Styles = __Styles | __Styles[]

export interface GetStyleInput {
  theme: CTheme
  selector: string
  rootSelector: string
  options: GetStylesApiOptions | undefined
  props: Record<string, any>
  stylesCtx: Record<string, any> | undefined
  withStylesTransform?: boolean
  resolvedStyles: Record<string, any>
  resolvedThemeStyles: Record<string, any>
  resolvedVars: Record<string, any>
  resolvedRootStyle: Properties
}

export function getStyle({
  theme,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  withStylesTransform,
  resolvedStyles,
  resolvedThemeStyles,
  resolvedVars,
  resolvedRootStyle
}: GetStyleInput) {
  return {
    ...resolvedThemeStyles[selector],
    ...resolvedStyles[selector],
    ...(!withStylesTransform &&
      resolveStyles({
        theme,
        styles: options?.styles,
        props: options?.props || props,
        stylesCtx
      })[selector]),
    ...resolvedVars[selector],
    ...(rootSelector === selector ? resolvedRootStyle : null),
    ...resolveStyle({ style: options?.style, theme })
  }
}
