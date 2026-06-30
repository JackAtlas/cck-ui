import cx from 'clsx'
import { CTheme } from '../../../config-provider'
import { GetStylesApiOptions } from '../../styles-api.types'
import { getGlobalClassNames } from './get-global-class-names/get-global-class-names'
import { getVariantClassName } from './get-variant-class-name/get-variant-class-name'
import { getResolvedClassNames } from './get-resolved-class-names/get-resolved-class-names'
import { getOptionsClassNames } from './get-options-class-names/get-options-class-names'
import { getRootClassName } from './get-root-class-name/get-root-class-name'
import { getSelectorClassName } from './get-selector-class-name/get-selector-class-name'
import { getStaticClassNames } from './get-static-class-names/get-static-class-names'

type __ClassNames =
  | undefined
  | Partial<Record<string, string>>
  | ((
      theme: CTheme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined
    ) => Partial<Record<string, string>>)

export type _ClassNames = __ClassNames | __ClassNames[]

export interface GetClassNameOptions {
  theme: CTheme

  options: GetStylesApiOptions | undefined

  themeName: string[]

  selector: string

  classNamesPrefix: string

  resolvedClassNames: Partial<Record<string, string>>

  resolvedThemeClassNames: Partial<Record<string, string>>[]

  classes: Record<string, string>

  unstyled: boolean | undefined

  className: string | undefined

  rootSelector: string

  props: Record<string, any>

  stylesCtx?: Record<string, any> | undefined

  withStaticClasses?: boolean

  headless?: boolean

  transformedStyles?: Record<string, string>[]
}

export function getClassName({
  theme,
  options,
  themeName,
  selector,
  classNamesPrefix,
  resolvedClassNames,
  resolvedThemeClassNames,
  classes,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx,
  withStaticClasses,
  headless,
  transformedStyles,
}: GetClassNameOptions) {
  return cx(
    getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
    resolvedThemeClassNames.map((m) => m[selector]),
    getVariantClassName({
      options,
      classes,
      selector,
      unstyled: unstyled || headless,
    }),
    resolvedClassNames[selector],
    getResolvedClassNames({
      selector,
      stylesCtx,
      theme,
      classNames: transformedStyles,
      props,
    }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes, unstyled: unstyled || headless }),
    withStaticClasses &&
      !headless &&
      getStaticClassNames({
        themeName,
        classNamesPrefix,
        selector,
        withStaticClass: options?.withStaticClass,
      }),
    options?.className
  )
}
