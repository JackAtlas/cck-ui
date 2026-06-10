export type CSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DefaultCSize = CSize

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CThemeSizesOverride {}

type _CRadius =
  | (CThemeSizesOverride extends {
      radius: Record<infer CustomRadius, string>
    }
      ? CustomRadius
      : CSize)
  | (string & {})
export type CRadius = _CRadius | number
export type CRadiusValues = Record<_CRadius, string>

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
