import { Properties } from 'csstype'
import { camelToKebabCase, keys } from '../../utils'

export function cssObjectToString(css: Properties) {
  return keys(css)
    .reduce(
      (acc, rule) =>
        css[rule] !== undefined ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
      ''
    )
    .trim()
}
