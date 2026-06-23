import { Properties } from 'csstype'
import { PartialDeep } from 'type-fest'
import { VariantColorsResolver } from './color-functions'

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
   * @description Rem units scale, change if you customize font-size of `html` element
   * default value is `1` (for `100%`/`16px` font-size on `html`)
   */
  scale: number

  /** @description White color */
  white: string

  /** @description Black color */
  black: string

  /** @description Object of colors, key is color name, value is an array of at least 10 strings (colors) */
  colors: CThemeColors

  /**
   * @description Index of theme.colors[color].
   * Primary shade is used in all components to determine which color from theme.colors[color] should be used.
   * Can be either a number (0-9) or an object to specify different color shades for light and dark color schemes.
   * Default value `{ light: 6, dark: 8 }`
   *
   * @example
   * { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
   * { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
   */
  primaryShade: CColorShade | CPrimaryShade

  /**
   * @description Key of `theme.colors`, hex/rgb/hsl values are not supported.
   * Determines which color will be used in all components by default.
   * @default `blue`
   */
  primaryColor: string

  /**
   * @description Function to resolve colors based on variant.
   * Can be used to deeply customize how colors are applied to `Button`, `ActionIcon`, `ThemeIcon` and other components that use colors from theme.
   */
  variantColorResolver: VariantColorsResolver

  /**
   * @description Determines whether text color must be changed based on the given `color` prop in filled variant
   * For example, if you pass `color="blue.1"` to Button component, text color will be changed to `var(--c-color-black)`
   * @default false
   */
  autoContrast: boolean

  /**
   * @description Determines which luminance value is used to determine if text color should be light or dark.
   * Used only if `theme.autoContrast` is set to `true`.
   * @default 0.3
   */
  luminanceThreshold: number

  /**
   * @description Font-family used in all components, system fonts by default
   */
  fontFamily: string

  /**
   * @description Monospace font-family, used in code and other similar components, system fonts by default
   */
  fontFamilyMonospace: string

  /**
   * @description Controls various styles of h1-h6 elements, used in Typography and Title components
   */
  headings: {
    fontFamily: string
    fontWeight: string
    textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
    sizes: {
      h1: HeadingStyle
      h2: HeadingStyle
      h3: HeadingStyle
      h4: HeadingStyle
      h5: HeadingStyle
      h6: HeadingStyle
    }
  }

  /**
   * @description Object of values that are used to set `border-radius` in all components that support it
   */
  radius: CRadiusValues

  /**
   * @description Key of `theme.radius` or any valid CSS value.
   * @default `border-radius` used by most components
   */
  defaultRadius: CRadius

  /**
   * @description Object of values that are used to set various CSS properties that control spacing between elements
   */
  spacing: CSpacingValues

  /**
   * @description Object of values that are used to control `font-size` property in all components
   */
  fontSizes: CFontSizesValues

  /**
   * @description Object of values that are used to control `line-height` property in all components
   */
  lineHeights: CLineHeightValues

  /**
   * @description Object of values that are used to control `font-weight` property in all components
   */
  fontWeights: CFontWeightsValues

  /**
   * @description Object of values that are used to control breakpoints in all components,
   * values are expected to be defined in em
   */
  breakpoints: CBreakpointsValues

  /**
   * @description Object of values that are used to add `box-shadow` styles to components that support `shadow` prop
   */
  shadows: CShadowsValues

  /**
   * @description Determines whether user OS settings to reduce motion should be respected.
   * @default false
   */
  respectReducedMotion: boolean

  /**
   * @description Determines which cursor type will be used for interactive elements
   * - `default` - cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
   * - `pointer` - sets `cursor: pointer` on interactive elements that do not have these styles by default
   */
  cursorType: 'default' | 'pointer'

  /**
   * @description Default gradient configuration for components that support `variant="gradient"`
   */
  defaultGradient: CGradient

  /**
   * @description Class added to the elements that have active styles, for example, `Button` and `ActionIcon`
   */
  activeClassName: string

  /**
   * @description Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`. Overrides `theme.focusRing` property.
   */
  focusClassName: string

  /**
   * @description allows adding `classNames`, `styles` and `defaultProps` to any component
   */
  components: CThemeComponents

  /**
   * @description Any other properties that you want to access with the theme objects
   */
  other: CThemeOther
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
