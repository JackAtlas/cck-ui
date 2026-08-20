import {
  Attributes,
  ClassNames,
  ClassNamesArray,
  GetStylesApiOptions,
  Styles,
} from '../styles-api.types'
import { PartialVarsResolver, VarsResolver } from '../create-vars-resolver/create-vars-resolver'
import { useStylesTransform } from './use-transformed-styles'
import { resolveClassNames } from './get-class-name/resolve-class-names/resolve-class-names'
import { resolveStyles } from './get-style/resolve-styles/resolve-styles'
import { mergeVars } from './get-style/resolve-vars/merge-vars'
import { resolveStyle } from './get-style/resolve-style/resolve-style'
import { getClassName } from './get-class-name/get-class-name'
import { Properties } from 'csstype'
import { getStyle } from './get-style/get-style'
import { FactoryPayload } from '../../factory'
import { CStyleProp } from '../../box'
import {
  useCckClassNamesPrefix,
  useCckIsHeadless,
  useCckTheme,
  useCckWithStaticClasses,
} from '../../config-provider'
import { MaybeRefOrGetter, toValue } from 'vue'

export interface UseStylesInput<Payload extends FactoryPayload> {
  name: string | (string | undefined)[]
  classes: Payload['stylesNames'] extends string ? Record<string, string> : never
  props: MaybeRefOrGetter<Payload['props']>
  stylesCtx?: MaybeRefOrGetter<Payload['ctx'] | undefined>
  className?: string | undefined
  style?: CStyleProp
  rootSelector?: Payload['stylesNames']
  unstyled?: boolean
  classNames?: ClassNames<Payload> | ClassNamesArray<Payload>
  styles?: Styles<Payload>
  vars?: PartialVarsResolver<Payload>
  varsResolver?: VarsResolver<Payload>
  attributes?: Attributes<Payload>
}

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload['stylesNames']>,
  options?: GetStylesApiOptions
) => {
  className: string
  style: Properties
}

export function useStyles<Payload extends FactoryPayload>({
  name,
  classes,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = 'root' as NonNullable<Payload['stylesNames']>,
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver,
  attributes,
}: UseStylesInput<Payload>): GetStylesApi<Payload> {
  const _theme = useCckTheme()
  const theme = _theme.value
  const classNamesPrefix = useCckClassNamesPrefix()
  const withStaticClasses = useCckWithStaticClasses()
  const headless = useCckIsHeadless()

  const themeNames = Array.isArray(name) ? name : [name]
  const themeName = themeNames.filter((n) => n) as string[]

  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props,
    stylesCtx,
    themeName,
    theme,
  })

  return (selector, options) => {
    const currentProps = toValue(props) as Payload['props']
    const currentCtx = toValue(stylesCtx) as Payload['ctx'] | undefined

    const resolvedClassNames = resolveClassNames({
      theme,
      classNames,
      props: currentProps,
      stylesCtx: currentCtx,
    })

    const resolvedThemeClassNames = themeName.map((n) =>
      resolveClassNames({
        theme,
        classNames: theme.components?.[n]?.classNames,
        props: currentProps,
        stylesCtx: currentCtx,
      })
    )

    const resolvedComponentStyles = withStylesTransform
      ? {}
      : resolveStyles({ theme, styles, props: currentProps, stylesCtx: currentCtx })

    const resolvedThemeStyles: Record<string, any> = {}
    if (!withStylesTransform) {
      for (const n of themeName) {
        const resolved = resolveStyles({
          theme,
          styles: theme.components?.[n]?.styles,
          props: currentProps,
          stylesCtx: currentCtx,
        })
        for (const key of Object.keys(resolved)) {
          resolvedThemeStyles[key] = {
            ...resolvedThemeStyles[key],
            ...resolved[key],
          }
        }
      }
    }

    const resolvedVars = mergeVars([
      headless ? {} : varsResolver?.(theme, currentProps, currentCtx),
      ...themeName.map((n) => theme.components?.[n]?.vars?.(theme, currentProps, currentCtx)),
      vars?.(theme, currentProps, currentCtx),
    ])

    const resolvedRootStyle = resolveStyle({ style, theme })

    return {
      ...attributes?.[selector],

      className: getClassName({
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
        props: currentProps,
        stylesCtx: currentCtx,
        withStaticClasses,
        headless,
        transformedStyles: getTransformedStyles([options?.styles, styles]),
      }),

      style: getStyle({
        theme,
        selector,
        options,
        props: currentProps,
        stylesCtx: currentCtx,
        rootSelector,
        withStylesTransform,
        resolvedStyles: resolvedComponentStyles,
        resolvedThemeStyles,
        resolvedVars,
        resolvedRootStyle,
      }),
    }
  }
}
