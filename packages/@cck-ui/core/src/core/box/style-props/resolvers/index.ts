import { borderResolver } from './border-resolver/border-resolver'
import {
  colorResolver,
  textColorResolver
} from './color-resolver/color-resolver'
import { fontFamilyResolver } from './font-family-resolver/font-family-resolver'
import { fontSizeResolver } from './font-size-resolver/font-size-resolver'
import { identityResolver } from './identity-resolver/identity-resolver'
import { lineHeightResolver } from './line-height-resolver/line-height-resolver'
import { radiusResolver } from './radius-resolver/radius-resolver'
import { sizeResolver } from './size-resolver/size-resolver'
import { spacingResolver } from './spacing-resolver/spacing-resolver'

export const resolvers = {
  border: borderResolver,
  color: colorResolver,
  fontFamily: fontFamilyResolver,
  fontSize: fontSizeResolver,
  identity: identityResolver,
  lineHeight: lineHeightResolver,
  radius: radiusResolver,
  size: sizeResolver,
  spacing: spacingResolver,
  textColor: textColorResolver
}

export type StylePropType = keyof typeof resolvers
