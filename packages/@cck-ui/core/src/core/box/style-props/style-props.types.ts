import { Property } from 'csstype'
import {
  CBreakpoint,
  CColor,
  CFontSize,
  CLineHeight,
  CSpacing
} from '../../config-provider'

export type StyleProp<Value> =
  | Value
  | Partial<Record<CBreakpoint | (string & {}), Value>>

export interface CStyleProps {
  /** Margin */
  m?: StyleProp<CSpacing>
  /** MarginBlock */
  my?: StyleProp<CSpacing>
  /** MarginInline */
  mx?: StyleProp<CSpacing>
  /** MarginTop */
  mt?: StyleProp<CSpacing>
  /** MarginBottom */
  mb?: StyleProp<CSpacing>
  /** MarginInlineStart */
  ms?: StyleProp<CSpacing>
  /** MarginInlineEnd */
  me?: StyleProp<CSpacing>
  /** MarginInlineStart */
  mis?: StyleProp<CSpacing>
  /** MarginInlineEnd */
  mie?: StyleProp<CSpacing>
  /** MarginLeft */
  ml?: StyleProp<CSpacing>
  /** MarginRight */
  mr?: StyleProp<CSpacing>

  /** Padding */
  p?: StyleProp<CSpacing>
  /** PaddingBlock */
  py?: StyleProp<CSpacing>
  /** PaddingInline */
  px?: StyleProp<CSpacing>
  /** PaddingTop */
  pt?: StyleProp<CSpacing>
  /** PaddingBottom */
  pb?: StyleProp<CSpacing>
  /** PaddingInlineStart */
  ps?: StyleProp<CSpacing>
  /** PaddingInlineEnd */
  pe?: StyleProp<CSpacing>
  /** PaddingInlineStart */
  pis?: StyleProp<CSpacing>
  /** PaddingInlineEnd */
  pie?: StyleProp<CSpacing>
  /** PaddingLeft */
  pl?: StyleProp<CSpacing>
  /** PaddingRight */
  pr?: StyleProp<CSpacing>

  /** Border */
  bd?: StyleProp<Property.Border>
  /** BorderRadius */
  bdrs?: StyleProp<CSpacing>
  /** Background */
  bg?: StyleProp<CColor>
  /** Color */
  c?: StyleProp<CColor>
  /** Opacity */
  opacity?: StyleProp<Property.Opacity>

  /** FontFamily */
  ff?: StyleProp<'monospace' | 'text' | 'heading' | (string & {})>
  /** FontSize */
  fz?: StyleProp<
    CFontSize | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})
  >
  /** FontWeight */
  fw?: StyleProp<Property.FontWeight>
  /** LetterSpacing */
  lts?: StyleProp<Property.LetterSpacing>
  /** TextAlign */
  ta?: StyleProp<Property.TextAlign>
  /** LineHeight */
  lh?: StyleProp<
    CLineHeight | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})
  >
  /** FontStyle */
  fs?: StyleProp<Property.FontSize>
  /** TextTransform */
  tt?: StyleProp<Property.TextTransform>
  /** TextDecoration */
  td?: StyleProp<Property.TextDecoration>

  /** Width */
  w?: StyleProp<Property.Width>
  /** MinWidth */
  miw?: StyleProp<Property.MinWidth>
  /** MaxWidth */
  maw?: StyleProp<Property.MaxWidth>
  /** Height */
  h?: StyleProp<Property.Height>
  /** MinHeight */
  mih?: StyleProp<Property.MinHeight>
  /** MaxHeight */
  mah?: StyleProp<Property.MaxHeight>

  /** BackgroundSize */
  bgsz?: StyleProp<Property.BackgroundSize>
  /** BackgroundPosition */
  bgp?: StyleProp<Property.BackgroundPosition>
  /** BackgroundRepeat */
  bgr?: StyleProp<Property.BackgroundRepeat>
  /** BackgroundAttachment */
  bga?: StyleProp<Property.BackgroundAttachment>

  /** Position */
  pos?: StyleProp<Property.Position>
  top?: StyleProp<Property.Top>
  left?: StyleProp<Property.Left>
  bottom?: StyleProp<Property.Bottom>
  right?: StyleProp<Property.Right>
  inset?: StyleProp<Property.Inset>

  display?: StyleProp<Property.Display>
  flex?: StyleProp<Property.Flex>
}
