import { Properties } from 'csstype'
import {
  BoxProps,
  CSpacing,
  ElementProps,
  PolymorphicFactory,
  StyleProp,
  StylesApiProps,
} from '../../core'

export type FlexStylesNames = 'root'

export interface FlexProps
  extends BoxProps, StylesApiProps<FlexFactory>, /* @vue-ignore */ ElementProps<'div'> {
  /**
   * @description Gap between columns and rows, key of `theme.spacing` or any valid CSS
   */
  gap?: StyleProp<CSpacing>

  /**
   * @description Row gap, overrides `gap` for vertical spacing
   */
  rowGap?: StyleProp<CSpacing>

  /**
   * @description Column gap, overrides `gap` for horizontal spacing
   */
  columnGap?: StyleProp<CSpacing>

  /**
   * @description Sets `align-items`
   */
  align?: StyleProp<Properties['alignItems']>

  /**
   * @description Sets `justify-content`
   */
  justify?: StyleProp<Properties['justifyContent']>

  /**
   * @description Sets `flex-wrap`
   */
  wrap?: StyleProp<Properties['flexWrap']>

  /**
   * @description Sets `flex-direction`
   */
  direction?: StyleProp<Properties['flexDirection']>
}

export type FlexFactory = PolymorphicFactory<{
  props: FlexProps
  defaultRef: HTMLDivElement
  defaultComponent: 'div'
  stylesNames: FlexStylesNames
}>
