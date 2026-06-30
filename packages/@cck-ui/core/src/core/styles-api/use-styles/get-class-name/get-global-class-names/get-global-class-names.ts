import cx from 'clsx'

import { CTheme } from '../../../../config-provider'
import { GetStylesApiOptions } from '../../../styles-api.types'

interface GetGlobalClassNamesOptions {
  theme: CTheme
  unstyled: boolean | undefined
  options: GetStylesApiOptions | undefined
}

export const FOCUS_CLASS_NAMES = {
  always: 'c-focus-always',
  auto: 'c-focus-auto',
  never: 'c-focus-never',
} as const

/**
 * @returns classes that are defined globally (focus and active styles) based on options
 */
export function getGlobalClassNames({
  theme,
  options,
  unstyled,
}: GetGlobalClassNamesOptions): string {
  return cx(
    options?.focusable && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
    options?.active && !unstyled && theme.activeClassName
  )
}
