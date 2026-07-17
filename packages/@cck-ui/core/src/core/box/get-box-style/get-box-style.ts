import { Properties } from 'csstype'
import { CStyleProp, CssVarsProp } from '../box.types'
import { CTheme } from '../../config-provider'

interface GetBoxStyleOptions {
  theme: CTheme
  styleProps: Properties
  style?: CStyleProp
  vars?: CssVarsProp
}

function mergeStyles(styles: CStyleProp | CssVarsProp | undefined, theme: CTheme): Properties {
  if (Array.isArray(styles)) {
    return [...styles].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme) }),
      {}
    )
  }

  if (typeof styles === 'function') {
    return styles(theme)
  }

  if (styles == null) {
    return {}
  }

  return styles
}

export function getBoxStyle({ style, styleProps, theme, vars }: GetBoxStyleOptions): Properties {
  const _style = mergeStyles(style, theme)
  const _vars = mergeStyles(vars, theme)
  return { ..._style, ..._vars, ...styleProps }
}
