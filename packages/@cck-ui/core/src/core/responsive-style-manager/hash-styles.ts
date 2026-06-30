import { Properties } from 'csstype'
import { StylesMediaQuery } from './styles-to-string/styles-to-string'
import { cssObjectToString } from './css-object-to-string/css-object-to-string'

function djb2Hash(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff
  }
  return (hash >>> 0).toString(36)
}

export function hashStyleProps(
  styles: Properties | undefined,
  media: StylesMediaQuery[] | undefined
): string {
  const styleStr = styles ? cssObjectToString(styles) : ''
  const mediaStr = Array.isArray(media)
    ? media.map((m) => `${m.query}:${cssObjectToString(m.styles)}`).join('|')
    : ''
  return `__cdi__-${djb2Hash(`${styleStr}|${mediaStr}`)}`
}
