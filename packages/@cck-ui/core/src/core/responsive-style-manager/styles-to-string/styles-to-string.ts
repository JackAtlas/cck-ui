import { Properties } from 'csstype'
import { cssObjectToString } from '../css-object-to-string/css-object-to-string'

export interface StylesMediaQuery {
  query: string
  styles: Properties
}

export interface StylesInput {
  selector: string
  styles?: Properties
  media?: StylesMediaQuery[]
  container?: StylesMediaQuery[]
}

export function stylesToString({
  container,
  media,
  selector,
  styles
}: StylesInput) {
  const baseStyles = styles ? cssObjectToString(styles) : ''

  const mediaQueryStyles = !Array.isArray(media)
    ? []
    : media.map(
        (item) =>
          `@media${item.query}{.${selector}{${cssObjectToString(item.styles)}}}`
      )
  const containerStyles = !Array.isArray(container)
    ? []
    : container.map(
        (item) =>
          `@container ${item.query}{.${selector}{${cssObjectToString(item.styles)}}}`
      )

  return `${baseStyles ? `.${selector}{${baseStyles}}` : ''}${mediaQueryStyles.join('')}${containerStyles.join('')}`.trim()
}
