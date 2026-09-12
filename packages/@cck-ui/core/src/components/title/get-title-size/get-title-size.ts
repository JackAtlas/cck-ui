import { rem } from '../../../core'
import { TitleOrder, TitleSize } from '../title.types'

const headings: unknown[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const sizes: unknown[] = ['xs', 'sm', 'md', 'lg', 'xl']

export interface GetTitleSizeResult {
  fontSize: string
  fontWeight: string
  lineHeight: string
}

export function getTitleSize(order: TitleOrder, size?: TitleSize): GetTitleSizeResult {
  const titleSize = size !== undefined ? size : `h${order}`

  if (headings.includes(titleSize)) {
    return {
      fontSize: `var(--c-${titleSize}-font-size)`,
      fontWeight: `var(--c-${titleSize}-font-weight)`,
      lineHeight: `var(--c-${titleSize}-line-height)`,
    }
  } else if (sizes.includes(titleSize)) {
    return {
      fontSize: `var(--c-font-size-${titleSize})`,
      fontWeight: `var(--c-h${order}-font-weight)`,
      lineHeight: `var(--c-h${order}-line-height)`,
    }
  }

  return {
    fontSize: rem(titleSize),
    fontWeight: `var(--c-h${order}-font-weight)`,
    lineHeight: `var(--c-h${order}-line-height)`,
  }
}
