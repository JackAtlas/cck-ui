import { Properties } from 'csstype'
import { CColor, CTheme, Factory } from '../../core'
import { TextProps, TextStylesNames, TextVariant } from '../text'

export interface HighlightTerm {
  /** Text to highlight */
  text: string

  /** Background color for this specific term. Key of `theme.colors` or any valid CSS color */
  color?: CColor | string
}

export interface HighlightProps extends Omit<TextProps, 'color'> {
  /**
   * Substring(s) to highlight in `children`. Can be:
   * - string: single term
   * - string[]: multiple terms with same color
   * - HighlightTerm[]: multiple terms with custom colors per term
   *
   * - Matching is case-insensitive and accent-insensitive by default, use `caseInsensitive` and `accentInsensitive` props to control this behavior
   * - Regex special characters are automatically escaped
   * - When multiple substrings are provided, longer matches take precedence
   * - Empty strings and whitespace-only strings are ignored
   */
  highlight: string | string[] | HighlightTerm[]

  /**
   * Default background color for all highlighted text.
   * Key of `theme.colors` or any valid CSS color, passed to `Mark` component.
   * Can be overridden per term when using HighlightTerm objects
   * @default 'yellow'
   */
  color?: CColor | string

  /** Styles applied to `mark` elements */
  highlightStyles?: Properties | ((theme: CTheme) => Properties)

  /** String in which to highlight substrings */
  children: string

  /**
   * Only match whole words (adds word boundaries to regex).
   * When enabled, 'the' will not match 'there'
   */
  wholeWorld?: boolean

  /**
   * Perform case-insensitive matching.
   * @default true
   */
  caseInsensitive?: boolean

  /**
   * Perform accent-insensitive matching
   * When enabled cafe will match cafe, café, cafè, etc.
   * @default true
   */
  accentInsensitive?: boolean
}

export type HighlightFactory = Factory<{
  props: HighlightProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: TextStylesNames
  variant: TextVariant
}>
