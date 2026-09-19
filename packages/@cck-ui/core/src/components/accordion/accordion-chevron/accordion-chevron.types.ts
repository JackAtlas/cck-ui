import { ElementProps } from '../../../core'

type SvgProps = ElementProps<'svg'>

export interface AccordionChevronProps extends /* @vue-ignore */ SvgProps {
  /**
   * Controls `width` and `height` of the icon
   * @default 16
   */
  size?: number | string
}
