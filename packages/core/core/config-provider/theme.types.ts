import { Properties } from 'csstype'
import { PartialDeep } from 'type-fest'

export interface CTheme {
  /**
   * @description Controls focus ring styles. Supports the following options:
   * @default 'auto'
   * - `auto` - focus ring is displayed only when the user navigates with keyboard
   * - `always` - focus ring is displayed when the user navigates with keyboard and mouse
   * - `never` - focus ring is always hidden(not recommended)
   */
  focusRing: 'auto' | 'always' | 'never'

  /**
   * Rem units scale, change if you customize font-size of `html` element
   * default value is `1` (for `100%`/`16px` font-size on `html`)
   */
  scale: number

  /** White color */
  white: string

  /** Black color */
  black: string

  /** Object of colors, key is color name, value is an array of at least 10 strings (colors) */
  colors: CThemeColors

  /**
   * Object of values that are used to control breakpoints in all components,
   * values are expected to be defined in em
   */
  breakpoints: CBreakpointsValues
}

export type CColorScheme = 'light' | 'dark' | 'auto'

export type CThemeOverride = PartialDeep<CTheme>

export type CStylesRecord = Record<string, Properties>

export interface CThemeComponent {
  classNames?: any
  styles?: any
  vars?: any
  defaultProps?: any
}

export type CThemeComponents = Record<string, CThemeComponent>

export interface HeadingStyle {
  fontSize: string
  fontWeight?: string
  lineHeight: string
}

export type CSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DefaultCSize = CSize
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CThemeSizesOverride {}

export type CBreakpoint =
  | (CThemeSizesOverride extends {
      breakpoints: Record<infer CustomBreakpoints, string>
    }
      ? CustomBreakpoints
      : CSize)
  | (string & {})
export type CBreakpointsValues = Record<CBreakpoint, string>

export type CFontSize =
  | (CThemeSizesOverride extends {
      fontSize: Record<infer CustomFontSizes, string>
    }
      ? CustomFontSizes
      : CSize)
  | (string & {})
export type CFontSizesValues = Record<CFontSize, string>

type _CRadius =
  | (CThemeSizesOverride extends {
      radius: Record<infer CustomRadius, string>
    }
      ? CustomRadius
      : CSize)
  | (string & {})
export type CRadius = _CRadius | number
export type CRadiusValues = Record<_CRadius, string>

type _CSpacing =
  | (CThemeSizesOverride extends {
      spacing: Record<infer CustomSpacing, string>
    }
      ? CustomSpacing
      : CSize)
  | (string & {})
export type CSpacing = _CSpacing | number
export type CSpacingValues = Record<CSpacing, string>

export type CShadow =
  | (CThemeSizesOverride extends {
      shadows: Record<infer CustomShadow, string>
    }
      ? CustomShadow
      : CSize)
  | (string & {})
export type CShadowsValues = Record<CShadow, string>

export type CLineHeight =
  | (CThemeSizesOverride extends {
      lineHeights: Record<infer CustomLineHeight, string>
    }
      ? CustomLineHeight
      : CSize)
  | (string & {})
export type CLineHeightValues = Record<CLineHeight, string>

export type CFontWeight =
  | (CThemeSizesOverride extends {
      fontWeights: Record<infer CustomFontWeight, string>
    }
      ? CustomFontWeight
      : 'regular' | 'medium' | 'bold')
  | (string & {})
export type CFontWeightsValues = Record<CFontWeight, string>

export interface CThemeOther {
  [key: string]: any
}

export interface CGradient {
  from: string
  to: string
  deg?: number
}

export type CColorsTuple = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[]
]

export type CColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface CPrimaryShade {
  light: CColorShade
  dark: CColorShade
}

export type DefaultCColor =
  | 'dark'
  | 'gray'
  | 'red'
  | 'pink'
  | 'grape'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange'
  | 'teal'
  | (string & {})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CThemeColorsOverride {}

export type CThemeColors = CThemeColorsOverride extends {
  colors: Record<infer CustomColors, CColorsTuple>
}
  ? Record<CustomColors, CColorsTuple>
  : Record<DefaultCColor, CColorsTuple>

export type CColor = keyof CThemeColors
