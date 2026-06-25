import { BoxProps, CSpacing, ElementProps, Factory } from '@cck-ui/core'
import { StylesApiProps } from '@cck-ui/core/core/styles-api/styles-api.types'
import { Properties } from 'csstype'

export type GroupStylesNames = 'root'
export type GroupCssVariables = {
  root:
    | '--group-gap'
    | '--group-align'
    | '--group-justify'
    | '--group-wrap'
    | '--group-child-width'
}

export interface GroupStylesCtx {
  childWidth: string
}

export interface GroupProps
  extends
    BoxProps,
    StylesApiProps<GroupFactory>,
    /* @vue-ignore */ ElementProps<'div'> {
  __size?: any

  /**
   * @description Controls `justify-content` CSS property
   * @default 'flex-start'
   */
  justify?: Properties['justifyContent']

  /**
   * @description Controls `align-items` CSS property
   * @default 'center'
   */
  align?: Properties['alignItems']

  /**
   * @description Controls `flex-wrap` CSS property
   * @default 'wrap'
   */
  wrap?: Properties['flexWrap']

  /**
   * @description Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem
   * @default 'md'
   */
  gap?: CSpacing

  /**
   * @description Determines whether each child element should have `flex-grow: 1` style
   * @default 'md'
   */
  grow?: boolean

  /**
   * @description Determines whether children should take only dedicated amount of space (`max-width` style is set based on the number of children)
   * @default true
   */
  preventGrowOverflow?: boolean
}

export type GroupFactory = Factory<{
  props: GroupProps
  ref: HTMLDivElement
  stylesNames: GroupStylesNames
  vars: GroupCssVariables
  ctx: GroupStylesCtx
}>
