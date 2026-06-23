import { CColor, CGradient, CTheme } from '../../theme.types'

export interface VariantColorsResolverInput {
  color: CColor | undefined
  theme: CTheme
  variant: string
  gradient?: CGradient
  autoContrast?: boolean
}

export interface VariantColorsResolverResult {
  background: string
  hover: string
  color: string
  border: string
  hoverColor?: string
}

export type VariantColorsResolver = (
  input: VariantColorsResolverInput
) => VariantColorsResolverResult
